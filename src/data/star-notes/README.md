# Star note print run data

`runs.ts` holds real Bureau of Engraving and Printing star note production figures.
Nothing in it is estimated, interpolated, or invented.

## Where it came from

Source index: https://www.bep.gov/currency/production-figures/monthly-production-reports

287 monthly production reports were downloaded and parsed. Each report contains a
**"Star Notes Printed"** table. Every row in `runs.ts` came from one of those tables and
carries the exact report URL it was read from in `sourcePdfUrl`, so any figure shown on
the site can be verified by the reader in one click.

## What is in it

| | |
|---|---|
| Rows | 438 |
| Denominations | $1, $2, $5, $10, $20, $50, $100 |
| Series | 15, spanning 1999 to 2025 |
| Extracted | 2026-09-12 |

`STAR_NOTE_COVERAGE` lists which series exist for each denomination. The UI must build
its denomination and series selects from it so a user cannot pick a combination the
dataset cannot answer.

## Field meanings

| Field | Meaning |
|---|---|
| `denomination` | Face value in dollars |
| `series` | Collector-facing series, e.g. `2017`, `2017A` |
| `frbLetter` / `frbName` | Federal Reserve district letter and name |
| `rangeStart` / `rangeEnd` | First and last serial in the run |
| `runSize` | `rangeEnd - rangeStart + 1`. Note count, never sheet count |
| `isFullRun` | `runSize >= 3,200,000`, the standard full star run. Short runs below that are the scarce ones |
| `sourcePdfUrl` | The BEP report this row was read from |

## Two parsing traps, already handled

**Sheets versus notes.** The star table carries both a "Quantity of Sheets" and a
"Quantity of Notes" column. Reading the last number on a line picks up the sheet count
on some layouts, which understates a run by a factor of 32 or 50. The parser reads
columns by header position and cross-checks against the serial span.

**Two report layouts.** Reports from roughly 2015 onward use a ruled table headed
"Star Notes Printed". Earlier reports use the plain-text "BUREAU ORDER SYSTEM" layout,
headed "STAR NOTES", with no ruling lines. A table-only parser silently drops every
older report. Both layouts are handled.

Where BEP re-reported the same run incrementally across months, the largest reported
end serial is kept.

## Refreshing the data

BEP publishes a new report each month. Re-run roughly every 6 months:

```bash
cd scripts/bep
pip install requests pdfplumber
python bep_star_runs.py          # downloads reports, de-duplicates by content hash
python reparse3.py               # parses both layouts, writes star-runs-final.csv
```

Then regenerate `runs.ts` from `star-runs-final.csv` and re-run `npm run check:data`
and `npm run preflight`.

Sanity checks before committing a refresh:

- Row count should grow, never shrink
- `runSize` must equal `rangeEnd - rangeStart + 1` on every row
- No overlapping ranges within the same denomination, series and district
- Spot-check three rows against their `sourcePdfUrl`

## Notable

$2 series 2003 star notes were printed in runs of only **8,000 notes per district** —
by a wide margin the scarcest runs in the dataset. Verified against
`https://www.bep.gov/media/1241/download?inline`.
