# Architecture Decision Records

One file per decision that was hard to reverse or surprising to a newcomer.
Numbered sequentially: `0001-<slug>.md`. Copy `0000-template.md` to start.

## When a decision earns an ADR

Write one when a future reader would otherwise ask "why is it done this way?" and
the answer is not in the code:

- A choice between viable options where the rejected one stays tempting.
- A constraint imposed from outside (hosting, browser support, a deadline).
- A boundary that holds the system together and is easy to cross by accident.

Do **not** write an ADR for a decision the code makes obvious, or for a
reversible detail a commit message can carry.

## Status

`proposed` → `accepted`, or `deprecated` (kept for history), or `superseded by
NNNN` (link the replacement). Never edit an accepted record's decision text — add
a new one that supersedes it. The record's value is that it is frozen.

## Relationship to the plan log

A plan describes ordering. An ADR describes a decision that outlives the plan.
If a plan contains a durable decision, the plan links to the ADR; it does not
restate it.
