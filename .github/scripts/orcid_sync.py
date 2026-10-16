"""Refresh _data/orcid.yml from the public ORCID record.

Pulls verified peer reviews, education and employment, and the works list
(with DOIs) from the public ORCID API. No token needed.

  python3 .github/scripts/orcid_sync.py            # write _data/orcid.yml
  python3 .github/scripts/orcid_sync.py --report   # also list ORCID works
                                                   # missing from papers.bib
                                                   # and DOIs papers.bib lacks

Only Python's standard library is used, plus PyYAML for writing.
"""

import json
import re
import sys
import unicodedata
import urllib.request
from collections import defaultdict
from datetime import date
from difflib import SequenceMatcher

ORCID_ID = "0000-0001-9940-5654"
API = f"https://pub.orcid.org/v3.0/{ORCID_ID}"
OUT = "_data/orcid.yml"
BIB = "_bibliography/papers.bib"


def get(path):
    req = urllib.request.Request(f"{API}/{path}", headers={"Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def journal_name(issn, cache={}):
    """Journal title for an ISSN via Crossref (falls back to the ISSN)."""
    if issn in cache:
        return cache[issn]
    name = issn
    try:
        with urllib.request.urlopen(f"https://api.crossref.org/journals/{issn}", timeout=30) as r:
            name = json.load(r)["message"]["title"]
    except Exception:
        pass
    cache[issn] = name
    return name


def year_of(d):
    return ((d or {}).get("year") or {}).get("value")


def reviews():
    data = get("peer-reviews")
    by_venue = defaultdict(list)
    for group in data.get("group", []):
        for pg in group.get("peer-review-group", []):
            for s in pg.get("peer-review-summary", []):
                gid = s.get("review-group-id", "")
                venue = journal_name(gid.split(":", 1)[1]) if gid.startswith("issn:") else gid
                by_venue[venue].append(year_of(s.get("completion-date")))
    out = []
    for venue, years in by_venue.items():
        ys = sorted(int(y) for y in years if y)
        out.append({"venue": venue, "count": len(years), "first": ys[0] if ys else None, "last": ys[-1] if ys else None})
    out.sort(key=lambda r: (-r["count"], r["venue"]))
    return out


def affiliations(section):
    data = get(section)
    rows = []
    for g in data.get("affiliation-group", []):
        for summ in g.get("summaries", []):
            v = list(summ.values())[0]
            rows.append({
                "role": v.get("role-title"),
                "organization": (v.get("organization") or {}).get("name"),
                "department": v.get("department-name"),
                "start": year_of(v.get("start-date")),
                "end": year_of(v.get("end-date")),
            })
    return rows


def works():
    data = get("works")
    rows = []
    for g in data.get("group", []):
        ids = {e["external-id-type"]: e["external-id-value"] for e in (g.get("external-ids") or {}).get("external-id", [])}
        s = g["work-summary"][0]
        rows.append({
            "title": s["title"]["title"]["value"],
            "year": year_of(s.get("publication-date")),
            "type": s.get("type"),
            "doi": ids.get("doi"),
        })
    return rows


def norm(t):
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", " ", t).strip()


def bib_entries():
    s = open(BIB, encoding="utf-8").read()
    out = []
    for m in re.finditer(r"@(\w+)\s*\{\s*([^,\s]+),", s):
        depth, i = 0, s.index("{", m.start())
        for j in range(i, len(s)):
            depth += {"{": 1, "}": -1}.get(s[j], 0)
            if depth == 0:
                break
        body = s[m.start(): j + 1]
        t = re.search(r"\btitle\s*=\s*[{\"](.+?)[}\"]\s*,?\s*\n", body, re.S)
        d = re.search(r"\bdoi\s*=\s*\{([^}]*)\}", body)
        out.append({"key": m.group(2), "title": re.sub(r"[{}]", "", t.group(1)) if t else "", "doi": d.group(1) if d else None})
    return out


def report(ws):
    entries = bib_entries()
    used = set()
    print("\nDOIs in ORCID that papers.bib lacks:")
    for e in entries:
        best, score = None, 0
        for i, w in enumerate(ws):
            r = SequenceMatcher(None, norm(e["title"]), norm(w["title"])).ratio()
            if r > score:
                best, score = i, r
        if score > 0.9:
            used.add(best)
            if not e["doi"] and ws[best]["doi"]:
                print(f"  {e['key']}: {ws[best]['doi']}")
    print("\nORCID works with no close title match in papers.bib (check by hand; preprints of published papers are expected):")
    for i, w in enumerate(ws):
        if i not in used:
            print(f"  {w['year']} {w['type']} {w['doi'] or '-'} | {w['title'][:90]}")


def main():
    import yaml

    data = {
        "orcid": ORCID_ID,
        "last_updated": str(date.today()),
        "reviews": reviews(),
        "education": affiliations("educations"),
        "employment": affiliations("employments"),
    }
    data["reviews_total"] = sum(r["count"] for r in data["reviews"])
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("# Auto-updated by .github/scripts/orcid_sync.py from the public ORCID record.\n")
        f.write("# Do not edit by hand; change the record on orcid.org instead.\n")
        yaml.safe_dump(data, f, sort_keys=False, allow_unicode=True)
    print(f"Wrote {OUT}: {data['reviews_total']} reviews across {len(data['reviews'])} venues")
    if "--report" in sys.argv:
        report(works())


if __name__ == "__main__":
    main()
