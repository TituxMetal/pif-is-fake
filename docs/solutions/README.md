# Solutions

A searchable problem → fix log. One file per solved problem, named
`<slug>.md`, written after the fix is verified — not instead of it.

## What belongs here

A problem whose reasoning would be lost otherwise: the fix is non-obvious, the
root cause was counterintuitive, or the same symptom will return in a different
guise. The final code and the diff already explain routine fixes; if they do,
write nothing.

Do not log: a typo, a dependency bump, a change the commit message fully
explains.

## Shape

```markdown
# <Symptom, as a reader would search for it>

- **Date:** YYYY-MM-DD
- **Files:** the code that changed
- **Verified by:** the command whose green output proved the fix

## Symptom

What was observed, including the exact error or the wrong visual result.

## Root cause

Why it happened. Not the line that changed — the reason that line was wrong.

## Fix

What changed, and why this shape rather than a narrower patch.

## Lesson

The generalisable rule, and where else in this repo it applies.
```

## Naming

Name the file after the symptom a future reader would type, not after the fix.
`dispatch-motif-duplicates-across-cards.md` is findable;
`fix-pickNIndexes.md` is not.

## Lifecycle

A solution is `captured` by definition — it exists only once the problem is
closed. If a later change makes it wrong, edit it and note the date rather than
deleting it: the record of having believed the old thing is useful.
