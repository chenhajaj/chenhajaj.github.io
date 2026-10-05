#!/usr/bin/env python3
"""Find papers on Semantic Scholar that are not yet in _bibliography/papers.bib.

Writes new entries to new_papers.bib and sets `new_count` in $GITHUB_OUTPUT.

Why this replaced the inline workflow script (Oct 2026):
  * It deduplicated on an exact lower-cased title only. Semantic Scholar titles
    drift ("WIP:" prefixes, Unicode hyphens, trailing periods, retitled arXiv
    versions), so existing papers were re-added. Now: DOI, arXiv id and a
    normalised title must all miss before a paper counts as new.
  * It parsed papers.bib with bibtexparser. v1 silently dropped every entry
    after an inline "% TODO" comment (which the script itself wrote), so the
    2026-08-23 run re-added the whole 08-16 batch; v2 (now installed by default)
    has no `load()` at all. Now the file is scanned for identifiers directly,
    with no parser dependency.
  * Every error was swallowed and reported as "0 new papers", so a broken sync
    looked green for weeks. Now errors fail the run; HTTP 429 is retried.
  * Semantic Scholar tags arXiv/SSRN preprints as "JournalArticle", so they
    were written as @article and counted as journal papers. Now preprints are
    @misc, and records without a usable venue are listed for manual review
    instead of being committed venue-less.
  * Papers deliberately removed come back next week. Now
    _bibliography/scholar_sync_ignore.txt records them, with a reason each.
"""
import json
import os
import re
import sys
import time
import unicodedata
import urllib.error
import urllib.request

S2_AUTHOR_ID = "3313085"
BIB_PATH = "_bibliography/papers.bib"
IGNORE_PATH = "_bibliography/scholar_sync_ignore.txt"
OUT_PATH = "new_papers.bib"
S2_API = "https://api.semanticscholar.org/graph/v1"
FIELDS = "title,year,authors,venue,journal,externalIds,publicationTypes"

NOT_A_PAPER = re.compile(r"\b(cover and front matter|front matter|back matter|editorial board|table of contents)\b", re.I)
PREPRINT_VENUE = re.compile(r"^(arxiv(\.org)?|corr|ssrn|social science research network|ssrn electronic journal|biorxiv|medrxiv|research square|techrxiv|preprints?)$", re.I)


def norm_title(t):
    t = unicodedata.normalize("NFKD", t or "")
    t = re.sub(r"[{}\\]", "", t).lower()
    t = re.sub(r"^\s*wip\s*:\s*", "", t)
    return re.sub(r"[^a-z0-9]+", "", t)


def norm_doi(d):
    d = (d or "").strip().lower()
    return re.sub(r"^https?://(dx\.)?doi\.org/", "", d)


def known_identifiers(bib_text, ignore_text):
    """Collect DOIs, arXiv ids and normalised titles without a BibTeX parser."""
    dois, arxivs, titles = set(), set(), set()
    for m in re.finditer(r"(?im)^\s*doi\s*=\s*[{\"]\s*([^}\"]+)", bib_text):
        dois.add(norm_doi(m.group(1)))
    for m in re.finditer(r"(?i)arxiv[:.\s/]*(?:abs/)?(\d{4}\.\d{4,5})", bib_text):
        arxivs.add(m.group(1))
    for m in re.finditer(r"(?im)^\s*title\s*=\s*\{(.+?)\}\s*,?\s*$", bib_text):
        titles.add(norm_title(m.group(1)))

    for line in ignore_text.splitlines():
        line = line.split("  #", 1)[0].strip()
        if not line or line.startswith("#"):
            continue
        kind, _, value = line.partition(":")
        kind, value = kind.strip().lower(), value.strip()
        if kind == "doi":
            dois.add(norm_doi(value))
        elif kind == "arxiv":
            arxivs.add(value)
        elif kind == "title":
            titles.add(norm_title(value))
    dois.discard("")
    titles.discard("")
    return dois, arxivs, titles


def s2_get(url, attempts=6):
    delay = 5
    for i in range(attempts):
        req = urllib.request.Request(url, headers={"User-Agent": "scholar-sync-bot/1.1"})
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503, 504) and i < attempts - 1:
                print(f"  Semantic Scholar HTTP {e.code}; retrying in {delay}s")
                time.sleep(delay)
                delay *= 2
                continue
            raise


def fetch_papers():
    papers, offset, limit = [], 0, 100
    while True:
        data = s2_get(f"{S2_API}/author/{S2_AUTHOR_ID}/papers?fields={FIELDS}&limit={limit}&offset={offset}")
        batch = data.get("data", [])
        papers.extend(batch)
        if len(batch) < limit:
            return papers
        offset += limit
        time.sleep(1)


def classify(pub):
    """Return (entry_type, venue_field, venue_value) or None if no usable venue."""
    ext = pub.get("externalIds") or {}
    journal = ((pub.get("journal") or {}).get("name") or "").strip()
    venue = (pub.get("venue") or "").strip()
    types = pub.get("publicationTypes") or []

    if ext.get("ArXiv") and (not venue or PREPRINT_VENUE.match(venue)) and (not journal or PREPRINT_VENUE.match(journal)):
        return "misc", "howpublished", f"arXiv preprint arXiv:{ext['ArXiv']}"
    for v in (venue, journal):
        if v and PREPRINT_VENUE.match(v):
            return "misc", "howpublished", f"{v} preprint"
    if "Conference" in types or "ConferencePaper" in types:
        name = journal if len(journal) > len(venue) else venue
        return ("inproceedings", "booktitle", name) if name else None
    if "JournalArticle" in types and (journal or venue):
        return "article", "journal", journal or venue
    return None


def bib_escape(s):
    return s.replace("&amp;", "&").replace("&", r"\&")


def make_entry(pub, entry_type, vfield, vvalue, used_keys):
    title = pub["title"].strip()
    year = str(pub["year"])
    authors = [a["name"] for a in (pub.get("authors") or [])]
    last = re.sub(r"[^a-z]", "", authors[0].split()[-1].lower()) if authors else "unknown"
    word = re.sub(r"[^a-z]", "", title.split()[0].lower()) or "paper"
    key, n = f"{last}{year}{word}", 2
    while key in used_keys:
        key, n = f"{last}{year}{word}{n}", n + 1
    used_keys.add(key)

    doi = (pub.get("externalIds") or {}).get("DOI", "")
    lines = [
        f"@{entry_type}{{{key},",
        f"  author    = {{{' and '.join(authors)}}},",
        f"  title     = {{{title}}},",
        f"  {vfield:<9} = {{{bib_escape(vvalue)}}},",
        f"  year      = {{{year}}},",
    ]
    if doi:
        lines += [f"  doi       = {{{doi}}},", f"  url       = {{https://doi.org/{doi}}},"]
    lines += ["  selected  = {false},", "  projects  = {},", "}"]
    return "\n".join(lines)


def main():
    bib_text = open(BIB_PATH, encoding="utf-8").read()
    ignore_text = open(IGNORE_PATH, encoding="utf-8").read() if os.path.exists(IGNORE_PATH) else ""
    dois, arxivs, titles = known_identifiers(bib_text, ignore_text)
    used_keys = set(re.findall(r"@\w+\s*\{\s*([^,\s]+)\s*,", bib_text))
    print(f"Known: {len(dois)} DOIs, {len(arxivs)} arXiv ids, {len(titles)} titles")

    papers = fetch_papers()
    print(f"Fetched {len(papers)} papers from Semantic Scholar")
    if not papers:
        raise RuntimeError("Semantic Scholar returned no papers; refusing to report 'nothing new'.")

    new_entries, review = [], []
    for pub in papers:
        title = (pub.get("title") or "").strip()
        ext = pub.get("externalIds") or {}
        doi, arx, nt = norm_doi(ext.get("DOI")), ext.get("ArXiv", ""), norm_title(title)
        if not title or NOT_A_PAPER.search(title):
            continue
        if (doi and doi in dois) or (arx and arx in arxivs) or nt in titles:
            continue
        if not pub.get("year"):
            review.append(f"{title} — no year")
            continue
        cls = classify(pub)
        if cls is None:
            review.append(f"{title} — no venue on Semantic Scholar")
            continue
        new_entries.append(make_entry(pub, *cls, used_keys))
        # guard against Semantic Scholar returning the same paper twice
        dois.add(doi) if doi else None
        arxivs.add(arx) if arx else None
        titles.add(nt)
        print(f"  NEW ({cls[0]}): {title}")

    for r in review:
        print(f"  REVIEW: {r}")

    summary = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary:
        with open(summary, "a", encoding="utf-8") as fh:
            fh.write(f"### Scholar Sync\n\n{len(new_entries)} new paper(s).\n\n")
            if review:
                fh.write("Needs manual review (not added):\n\n" + "".join(f"- {r}\n" for r in review))

    if new_entries:
        with open(OUT_PATH, "w", encoding="utf-8") as f:
            f.write("\n\n".join(new_entries) + "\n")
    gh_out = os.environ.get("GITHUB_OUTPUT")
    if gh_out:
        with open(gh_out, "a") as fh:
            fh.write(f"new_count={len(new_entries)}\n")
    print(f"Found {len(new_entries)} new paper(s), {len(review)} for manual review.")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:  # fail the run loudly instead of reporting "0 new"
        print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(1)
