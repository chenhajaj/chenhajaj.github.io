# Publication list cleanup — October 2026

Cleanup of `_bibliography/papers.bib` plus a fix to the Scholar Sync workflow that caused most of the problems.

**Result:** 110 entries → 84. Journal articles (`@article`) → 32. Every entry now has a venue; no duplicate BibTeX keys.

## Why the list got messy (root causes, now fixed)

1. **Exact-title dedupe only.** Semantic Scholar titles drift: `WIP:` prefixes, Unicode hyphens (Ti‐6Al‐4V), trailing periods, retitled arXiv versions. The sync never compared DOIs, so known papers were re-added. *Fix:* match on DOI, arXiv id **and** normalised title.
2. **The sync broke its own parser.** It wrote `projects = {},  % TODO` inside each entry. bibtexparser v1 silently drops everything after such a comment, so the 2026-08-16 batch was invisible to the 2026-08-23 run, which re-added all 7 papers (a third copy sat in open draft PR #6). *Fix:* no inline comments; the file is scanned for identifiers without a parser.
3. **Errors reported as "0 new papers".** A blanket `except` hid every failure. `pip install bibtexparser` now installs v2, which has no `load()`, and Semantic Scholar rate-limits (HTTP 429). Either way the run was green but did nothing. *Fix:* errors fail the run, and 429 is retried with backoff.
4. **Preprints counted as journals.** Semantic Scholar tags arXiv/SSRN items as `JournalArticle`, and the sync defaulted to `@article`. Meeting abstracts in journal supplements were also typed `@article`. *Fix:* preprints become `@misc`, and records without a usable venue go to the run summary for manual review instead of being committed venue-less.
5. **Removed papers came back.** Deleting an entry only lasted until the next Sunday. *Fix:* `_bibliography/scholar_sync_ignore.txt` lists deliberately excluded items, each with a reason. Add to it whenever you delete an auto-added entry.
6. **Stalled sync was silent.** An open sync PR blocks all later runs. *Fix:* the run now raises a warning naming the PR.

7. **The page's type filter guessed from venue text.** `_pages/publications.md` never saw the BibTeX type. It matched keywords like "arxiv", "ssrn", "clinical nutrition", "research" and "springer" as *journal*, so preprints and abstracts landed under "Journal Articles". *Fix:* `bib.liquid` emits `data-type` and the filter uses it. Journal Articles now shows 32, Conference Papers 34, Patents & Others 18.

Display fix: `_layouts/bib.liquid` only showed a venue for `@article`/`@inproceedings`. It now shows the venue for preprints, abstracts, patents, theses and books too.

Items marked *Verify* or *Restore if…* are judgement calls worth a glance.

## Removed (26)

| Key | Title | Reason |
|---|---|---|
| `marbel2025cloudy` | Cloudy with a Chance of Anomalies: Dynamic Graph Neural Network for Early Detection of Clo | Duplicate of `marbel2026cloudy_ccnc`. Its DOI is the CCNC 2026 DOI and no ICCCN 2025 record of the paper exists; the paper appeared once, at CCNC 2026. *Restore if it was genuinely also presented at ICCCN 2025.* |
| `marbel2024cloudy` | Cloudy with a Chance of Anomalies: Dynamic Graph Neural Network for Early Detection of Clo | Duplicate of `marbel2026cloudy_ccnc` re-imported by Scholar Sync (title differs only in punctuation/wording; same DOI). Year 2024 was the arXiv year, not publication. |
| `lisker2025optimized` | Optimized File Type Detection and One-Shot Retrieval | Duplicate of `lisker2025optimized (manual entry)` re-imported by Scholar Sync (title differs only in punctuation/wording; same DOI). Also a duplicate BibTeX key. |
| `lisker2025optimized` | Optimized File Type Detection and One-Shot Retrieval | Duplicate of `lisker2025optimized (manual entry)` re-imported by Scholar Sync (title differs only in punctuation/wording; same DOI). Third copy, re-added by the 2026-08-23 run. |
| `lang2025measuring` | Measuring and Analyzing Defects of Additive Manufactured Ti‐6Al‐4V Specimens Through Image | Duplicate of `lang2025ffe` re-imported by Scholar Sync (title differs only in punctuation/wording; same DOI). Title used a Unicode hyphen (Ti‐6Al‐4V), so the exact-title check missed it. |
| `lang2025measuring` | Measuring and Analyzing Defects of Additive Manufactured Ti‐6Al‐4V Specimens Through Image | Duplicate of `lang2025ffe` re-imported by Scholar Sync (title differs only in punctuation/wording; same DOI). Third copy, re-added by the 2026-08-23 run. |
| `sopher2024wip` | WIP: Exploring the Role of Sentiment in Tutor-Student Interaction. The Case Study of CS an | Duplicate of `sopher2024wip (manual entry)` re-imported by Scholar Sync (title differs only in punctuation/wording; same DOI). Title had a `WIP:` prefix, so the exact-title check missed it. |
| `sopher2024wip` | WIP: Exploring the Role of Sentiment in Tutor-Student Interaction. The Case Study of CS an | Duplicate of `sopher2024wip (manual entry)` re-imported by Scholar Sync (title differs only in punctuation/wording; same DOI). Third copy; the entry was also truncated mid-field at end of file. |
| `lukach2024cbr` | CBR - Boosting Adaptive Classification By Retrieval of Encrypted Network Traffic with Out- | Duplicate of `lukach2024cbr (manual entry)` re-imported by Scholar Sync (title differs only in punctuation/wording; same DOI). Duplicate BibTeX key. |
| `zion2026quality` | Quality of Experience Prediction for First-Person Shooter Online Gaming: The Case Study of | Duplicate of `zion2026qoe_fps_ccnc` re-imported by Scholar Sync (title differs only in punctuation/wording; same DOI). (hyphen in 'First-Person'). DOI moved to the kept entry. |
| `hajaj2026machine` | Machine Learning Tools for Predicting Pediatric Urinary Tract Infections Caused by ESBL-pr | Duplicate of `shkalim2026esbl_uti_pidj` re-imported by Scholar Sync (title differs only in punctuation/wording; same DOI). (trailing period, lowercase 'producing'). |
| `benshalom2023online` | Online Temporary Learning Groups in Higher Education – Interactions, Compensation, and Max | Duplicate of `ben2023online` re-imported by Scholar Sync (title differs only in punctuation/wording; same DOI). (en dash vs double hyphen in title). |
| `lichy2022when` | When a RF Beats a CNN and GRU, Together - A Comparison of Deep Learning and Classical Mach | Duplicate of `lichy2023rf` re-imported by Scholar Sync (title differs only in punctuation/wording; same DOI). This copy pointed at the arXiv DOI and an abbreviated journal name. |
| `berger2022mamadroid` | MaMaDroid2.0 - The Holes of Control Flow Graphs | Duplicate of `berger2022mamadroid2` re-imported by Scholar Sync (title differs only in punctuation/wording; same DOI). (' - ' vs '--'). |
| `aharon2024robertaaugmented` | RoBERTa-Augmented Synthesis for Detecting Malicious API Requests | Same arXiv preprint (2405.11258) as `aharon2024few`; arXiv later retitled it. Had no venue at all. |
| `hajaj2014strategic` | Strategic information platforms: selective disclosure and the price of "free" | Duplicate of the EC'14 `hajaj2014strategic` inproceedings entry, mistyped as a journal article. Duplicate BibTeX key. |
| `ceppi2017agentmediated` | Agent-Mediated Electronic Commerce. Designing Trading Strategies and Mechanisms for Electr | Duplicate of the edited volume `ceppi2017agent`; had no venue. |
| `bader2022opensource` | Open-Source Framework for Encrypted Internet and Malicious Traffic Classification | arXiv preprint of a paper already listed in its published form (`bader2024osf`, Computer Communications 2024). Same policy as the April cleanup (commit 23d262c). |
| `berger2020when` | When the Guard failed the Droid: A case study of Android malware | arXiv preprint of a paper already listed in its published form (`berger2020evasion`, CSCML 2020). Same policy as the April cleanup (commit 23d262c). |
| `anidjar2020a` | A Thousand Words are Worth More Than One Recording: NLP Based Speaker Change Point Detecti | arXiv preprint of a paper already listed in its published form (`anidjar2021thousand`, Interspeech 2021). Same policy as the April cleanup (commit 23d262c). |
| `hajaj2017adversarial` | Adversarial Task Allocation | arXiv preprint of a paper already listed in its published form (`hajaj2018adversarial`, IJCAI 2018). Same policy as the April cleanup (commit 23d262c). |
| `tong2017hardening` | Hardening Classifiers against Evasion: the Good, the Bad, and the Ugly | Earlier title of arXiv 1708.08327, published as `tong2019improving` (USENIX Security 2019). All three Tong et al. 2017 entries are versions of that one preprint. |
| `tong2017a` | A Framework for Validating Models of Evasion Attacks on Machine Learning, with Application | Earlier title of arXiv 1708.08327, published as `tong2019improving` (USENIX Security 2019). All three Tong et al. 2017 entries are versions of that one preprint. |
| `tong2017feature` | Feature Conservation in Adversarial Classifier Evasion: A Case Study | Earlier title of arXiv 1708.08327, published as `tong2019improving` (USENIX Security 2019). All three Tong et al. 2017 entries are versions of that one preprint. |
| `lou2017rotating` | Rotating Proposer Mechanisms for Team Formation | Earlier, venue-less version of the rotating-proposer working paper; kept the arXiv version `low2022a` (2204.04251). *Restore if this was a separate paper.* |
| `hajaj2021nws` | NWS volume 9 issue 3 Cover and Front matter | Journal issue 'Cover and Front matter', not a publication. Scholar indexes it under the guest editors. |

## Edited (23)

| Key | Title | Reason |
|---|---|---|
| `lisker2025optimized` | Optimized File Type Detection and One-Shot Reclassification Model | Title and second author corrected to the published record (Crossref: 'One-Shot Retrieval', Butman); pages added. |
| `zion2026qoe_fps_ccnc` | Quality of Experience Prediction for First Person Shooter Online Gaming: The Case Study of | Added DOI from the removed duplicate `zion2026quality`. |
| `klein2026graphmux` | GraphMux: A graph-based framework for encrypted traffic classification | Expanded abbreviated journal name 'Comput. Networks'. |
| `meiri2025outofdistribution` | Out-Of-Distribution Is Not Magic: The Clash Between Rejection Rate and Model Success | Venue was a generic 'Conference on Computer Science and Information Systems'; corrected to FedCSIS 2025 (Crossref). |
| `berger2020evasion` | Evasion Is Not Enough: A Case Study of Android Malware | Added DOI (Crossref) and normalised venue name. |
| `ye2018crowdsourcing` | A crowdsourcing framework for medical data sets | Conference proceedings, not a journal: retyped @article → @inproceedings. |
| `coco2018crowdsourcing` | Crowdsourcing Clinical Chart Reviews | Conference proceedings, not a journal: retyped @article → @inproceedings. |
| `ceppi2017agent` | Agent-Mediated Electronic Commerce. Designing Trading Strategies and Mechanisms for Electr | Edited Springer LNBIP volume (Crossref); retyped @misc → @book, added series and DOI. |
| `hajaj2012three` | Three Dimensional Group Registration of Mesh Objects | Single-author 2012 Bar-Ilan Engineering work: retyped @misc → @mastersthesis so it shows as a thesis. *Verify.* |
| `lukach2024cbr` | CBR--Boosting Adaptive Classification By Retrieval of Encrypted Network Traffic with Out-o | Preprint typed as @article with the repository as 'journal', so it was counted as a journal article. Retyped @misc; DOI added from the removed duplicate. |
| `aharon2024few` | Few-Shot API Attack Detection: Overcoming Data Scarcity with GAN-Inspired Learning | Preprint typed as @article with the repository as 'journal', so it was counted as a journal article. Retyped @misc. |
| `zion4654236revolutionizing` | Revolutionizing Our Way to Better Classifiers: Leveraging Synthetic Data with Generative M | Preprint typed as @article with the repository as 'journal', so it was counted as a journal article. Retyped @misc. |
| `berger2022mamadroid2` | MaMaDroid2.0--The Holes of Control Flow Graphs | Preprint typed as @article with the repository as 'journal', so it was counted as a journal article. Retyped @misc. |
| `berger2022problem` | Problem-Space Evasion Attacks in the Android OS: A Survey | Preprint typed as @article with the repository as 'journal', so it was counted as a journal article. Retyped @misc. |
| `berger2022you` | Do You Think You Can Hold Me? The Real Challenge of Problem-Space Evasion Attacks | Preprint typed as @article with the repository as 'journal', so it was counted as a journal article. Retyped @misc. |
| `muehlstein2020robust` | Robust Machine Learning for Encrypted Traffic Classification | Preprint typed as @article with the repository as 'journal', so it was counted as a journal article. Retyped @misc. |
| `chambers2017non` | Non-Cooperative Team Formation and a Team Formation Mechanism | Preprint typed as @article with the repository as 'journal', so it was counted as a journal article. Retyped @misc. |
| `low2022a` | A Rotating Proposer Mechanism for Team Formation | Preprint typed as @article with the repository as 'journal', so it was counted as a journal article. Retyped @misc. |
| `glik2025routine` | Routine Blood Count and Chemistry can predict AD dementia risk up to Ten years Ahead | Meeting abstract published in a journal supplement; typed as a journal article, which inflated the journal count. Retyped @misc. Crossref: vol. 21 suppl. S2. |
| `raphaeli2023protein` | Protein Intake and Clinical Outcomes of Enterally Fed Critically Ill Patients | Meeting abstract published in a journal supplement; typed as a journal article, which inflated the journal count. Retyped @misc. Crossref: single page 534. |
| `raphaeli2021feeding` | Feeding Intolerance as a Predictor of Clinical Outcomes in Critically Ill Patients: A Mach | Meeting abstract published in a journal supplement; typed as a journal article, which inflated the journal count. Retyped @misc. Crossref: supplement pages S546–S547. |
| `raphaeli2021using` | Using machine learning to support early prediction of feeding intolerance in critically il | Meeting abstract typed as @article. Retyped @misc. |
| `raphaeli2022using` | Using the Cardio-Vascular Index (CVRI) to Predict Mortality in Septic Shock | Meeting abstract typed as a conference paper. Retyped @misc for consistency with the other abstracts. |
