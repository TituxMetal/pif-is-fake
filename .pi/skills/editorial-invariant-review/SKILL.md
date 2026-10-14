---
name: editorial-invariant-review
description: Check French user-facing copy and generated content in pif-is-fake against the project invariants — anonymity, identical random treatment, no job titles, criticism aimed at the mechanic and never at a person. Use before committing any change to copy, banks, or result rendering. Reports a PASS/FAIL/UNVERIFIED verdict; never edits files.
allowed-tools: read, grep, find, ls
---

This checklist is applied by a read-only reviewer. If you are dispatched as that
reviewer, you run with only read/grep/find/ls and you report findings rather than
fixing them. If you are the main agent reading this inline, apply the checklist to
the change in front of you, report findings, and do not edit files while applying
it. All paths are relative to the repository root.

The app is a parody of an arbitrary bonus system. Its argument collapses the
moment it reads as an attack on a person, or as a system that scores people
differently.

## Boundaries

**This skill MAY:** read copy, banks, rendering paths, storage calls and network
calls; quote offending strings; report which invariant is at risk.

**This skill MAY NOT:** rewrite copy, edit a bank, or rule on a phrasing question
that touches no invariant. A wording preference is not an invariant violation,
and treating one as a finding buries the real ones.

## Common Rationalizations

| Shortcut | Why It Fails | The Cost |
|---|---|---|
| "It's a joke, so it's fine" | The parody targets the mechanic; a joke at the named person's expense is the defect itself | The app argues for the system it set out to mock |
| "Only the banks carry the copy" | Job titles and blame can reach the DOM from any component render path | A role name ships untouched because nobody read the components |
| "The vest is basically a role" | Vest → role is design documentation; rendering it breaks anonymity | People get sorted by costume — the exact thing being criticised |
| "localStorage is harmless here" | Any key beyond `pif:theme` contradicts `/avertissement` | The disclaimer becomes false, and invariant 3 with it |
| "Nobody will check the French" | The copy is the product | A register break reads as carelessness, not satire |

Phases with Entry/Exit gates do not apply to a verdict-producing reviewer; they
are omitted deliberately rather than forgotten.

## The invariants

1. **Same random treatment for everyone.** No name, site, or vest receives a bias,
   weighting, or rank. Every draw goes through the same picker.
2. **No job titles.** Nothing displays or infers a role. `vest` is a costume
   ("gilet"), mapped to a role only in design documentation — never rendered.
3. **The target is the mechanic, not a person.** Copy that blames a named
   individual, a real company, or a specific site is a defect.
4. **No stored data, no targeting.** Nothing about the visitor is persisted or
   sent. `docs/MVP.md` §"Permalink hash encoding" defines the only URL state.
5. **French where the user reads it.** User-facing strings — motifs, loading
   steps, banks, tooltips, microcopy, `/avertissement` — are French. Code,
   comments, and documentation are English.

## Where the copy lives

- `src/features/disclaimer/content/disclaimerCopy.ts` — the invariant stated in
  the app's own words. This is the reference text; other copy must not contradict
  it.
- `src/lib/banks/` — `colleagues.ts`, `genericNames.ts`, `motifs.ts`,
  `loadingSteps.ts`.
- `src/features/home/content/vestOptions.ts`,
  `src/features/shell/content/backronyms.ts`.
- Inline French strings in `src/features/*/components/*.tsx`.
- Microcopy tables in `docs/MVP.md` §"Microcopy".

## What to check

1. **New or edited French strings** — does any imply blame, mockery of the named
   person, or a judgment about their work? The joke is aimed at the mechanic.
2. **Job titles** — any rendered string that names a role, grade, or function
   ("chef de projet", "manager", "N+1") reaching the DOM. Check component
   render paths, not just bank files.
3. **Asymmetric treatment** — a conditional that changes an outcome based on the
   name, its length, its hash, or the vest. The vest may change presentation
   only.
4. **Real-company leakage** — a company name, logo, or sigle that resolves to a
   real organisation rather than a random sigle. `docs/MVP.md` §"Company sigle"
   defines the generator; sigles are drawn, not chosen.
5. **Persistence** — `localStorage`, `sessionStorage`, cookies, `fetch` to an
   external host, or analytics added around user input. `pif:theme` is the only
   sanctioned stored key.
6. **Language** — a French string leaking into code/comments/docs, or an English
   string reaching the user.
7. **Consistency with the disclaimer** — copy that contradicts
   `disclaimerCopy.ts` (for example, anything implying a result reflects real
   work).

## Output

Return a markdown report only.

```
## Verdict
PASS | FAIL | UNVERIFIED

## Findings
- <file:line> — <the invariant at risk> — <the offending string or expression>

## Invariants checked
- 1 anonymity: ok | <finding>
- 2 no job titles: ok | <finding>
- 3 mechanic-not-person: ok | <finding>
- 4 no stored data: ok | <finding>
- 5 French surface: ok | <finding>
```

Rules for the verdict:

- `PASS` — every invariant checked against the changed surface with no finding.
- `FAIL` — at least one concrete violation, quoted with file and line.
- `UNVERIFIED` — the change affects copy you could not reach (e.g. a bank loaded
  from outside the repository). Name what is missing.

A stylistic preference is not a finding. If the only issue is wording you would
have phrased differently, and no invariant is at risk, the verdict is `PASS` —
say nothing, or say it explicitly as a non-blocking note.

## Validate

- [ ] All five invariants were checked against the changed surface, not only the ones that looked relevant.
- [ ] Every finding quotes the offending string and names the file and its line.
- [ ] Storage and network calls on the changed path were inspected, not assumed.
- [ ] Stylistic preferences appear as non-blocking notes, never as findings.
- [ ] The verdict is one of `PASS`, `FAIL`, `UNVERIFIED`.
