---
name: theme-parity-review
description: Check manifeste/terminal theme parity in pif-is-fake. Use before committing any change under src/features/*/components/, when a themed surface gained one variant without the other, or when a dispatcher stopped routing both themes. Reports a PASS/FAIL/UNVERIFIED verdict; never edits files.
allowed-tools: read, grep, find, ls
---

This checklist is applied by a read-only reviewer. If you are dispatched as that
reviewer, you run with only read/grep/find/ls and you report findings rather than
fixing them. If you are the main agent reading this inline, apply the checklist to
the change in front of you, report findings, and do not edit files while applying
it. All paths are relative to the repository root.

The app ships two visual themes, `manifeste` and `terminal`, and every themed
surface must exist in both. A one-theme change is this repository's most common
defect.

## Boundaries

**This skill MAY:** read any file in the repository, report a verdict, and name
the missing counterpart for each break it finds.

**This skill MAY NOT:** edit any file, create the missing variant, run the build,
or upgrade a verdict without evidence. A reviewer that fixes what it finds is no
longer a reviewer.

## Common Rationalizations

| Shortcut | Why It Fails | The Cost |
|---|---|---|
| "The sibling file exists, so parity holds" | Existence is not equivalence — props and content drift independently | A variant renders half the data and the PASS is wrong |
| "It's only a styling tweak, no parity impact" | Styling lives in the variant, and one theme's token may have no counterpart | One theme renders an undefined token — a silent visual break |
| "The exception list covers it" | The exceptions name specific files, not a general licence | Intentional asymmetries get used to excuse accidental ones |
| "Nothing under components/ changed, so PASS" | A dispatcher can stop routing correctly with no variant changing | A surface silently renders in one theme only |
| "I can't be sure, but it probably routes fine" | Plausibility is not evidence | An unchecked branch ships as PASS |

Phases with Entry/Exit gates do not apply to a verdict-producing reviewer; they
are omitted deliberately rather than forgotten.

## The rule this repo enforces

1. A **themed surface** has two files: `Manifeste<Name>.tsx` and
   `Terminal<Name>.tsx`.
2. A **dispatcher** with the bare name (`<Name>.tsx`) reads `useTheme()` from
   `~/lib/theme` and returns one of the two. Real examples:
   - `src/features/dispatch/components/DispatchHeader.tsx` →
     `ManifesteDispatchHeader` / `TerminalDispatchHeader`
   - `src/features/dispatch/components/DispatchCard.tsx`
   - `src/features/home/components/ResultDisplay.tsx`
   - `src/features/sharing/components/ShareActions.tsx`
   - `src/features/disclaimer/components/Disclaimer.tsx`
3. A shared, theme-agnostic component carries no prefix, for example
   `src/features/dispatch/components/DispatchGrid.tsx`,
   `src/features/home/components/Loading.tsx`,
   `src/features/shell/components/Footer.tsx`,
   `src/features/sharing/components/Toast.tsx`,
   `src/features/shell/components/AppShell.tsx`,
   `src/features/shell/components/ThemeSwitcher.tsx`.

## Known intentional asymmetries — do not report these

- `src/features/home/components/TerminalBootBlock.tsx` has no Manifeste
  counterpart by design.
- `src/features/shell/components/Caret.tsx` and
  `src/features/shell/components/CommandEcho.tsx` are terminal-only presentation
  primitives and are deliberately unprefixed.
- `src/lib/**` is theme-agnostic; `src/features/dispatch/lib/cardStyling.ts`
  returns theme-neutral class names.

If you believe one of these is no longer intentional, say so explicitly and
explain the evidence — do not silently reclassify it.

## What to check

1. **Every changed `.tsx` under `src/features/*/components/`** — for each
   `Manifeste<Name>.tsx` or `Terminal<Name>.tsx` touched, confirm the sibling and
   the dispatcher were touched too.
2. **Dispatcher correctness** — the bare-named component branches on
   `theme === 'manifeste'` and returns both variants; no `else` chain (repo
   convention is early return); the fallback is the terminal variant.
3. **Branch drift** — the two variants must expose the same props and represent
   the same content. A prop added to one variant only is a parity break even when
   the file exists.
4. **Theme leaks** — a `manifeste` component must not import a `Terminal*`
   component or use terminal-only copy, and vice versa. Theme-specific styling
   belongs in the variant, not in shared lib code.
5. **CSS tokens** — both themes define the same custom properties. A class used
   by one variant with no counterpart token in the other theme's palette is a
   visual break (see `docs/design.md`, "Two themes at a glance").

## Output

Return a markdown report only.

```
## Verdict
PASS | FAIL | UNVERIFIED

## Findings
- <file:line> — <what breaks parity> — <the missing counterpart>

## Exceptions applied
- <which known asymmetry was hit and why it applies>
```

Rules for the verdict:

- `PASS` — every changed themed surface has both variants and a correct
  dispatcher.
- `FAIL` — at least one concrete parity break, each named with a file and line.
- `UNVERIFIED` — the change reads as parity-neutral but you could not confirm it
  (e.g. the branch depends on runtime state you cannot see). Say what is missing.

Never upgrade `UNVERIFIED` to `PASS` on plausibility. An empty findings list with
a `FAIL` verdict is a defect in your own report.

## Validate

- [ ] Every changed `Manifeste*` / `Terminal*` file had its sibling checked.
- [ ] Every dispatcher was confirmed to read `useTheme()` and return both variants.
- [ ] Every finding names a file, a line, and the counterpart that is missing.
- [ ] The verdict is one of `PASS`, `FAIL`, `UNVERIFIED` — never a grade or percentage.
- [ ] No finding belongs on the intentional-asymmetry list.
