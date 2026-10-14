# Plans

Plan documents for non-trivial work. One plan per file, plus its research notes
when a plan needed investigation first.

This replaces the `~/.claude/plans/` location referenced in
[`../PROGRESS.md`](../PROGRESS.md): plans belong to the repository, not to one
machine.

## When to write a plan

Write one when the work has dependencies, ordering, or a decision a reviewer will
want to check later. For a single-file fix, skip it — the commit is the record.

## Frontmatter contract

Every plan and note carries YAML frontmatter:

```yaml
---
status: approved        # approved | in_progress | complete | superseded | captured
type: plan              # plan | research
---
```

- `status` — canonical values only. `completed` is a typo for `complete`.
- `type: research` — investigation output. A research note that fed a specific
  plan also carries `for-plan: <slug>`.
- `type` may be `plan` or `research`. Nothing else lives in this directory.

## Lifecycle

```
approved → in_progress → complete | superseded
```

`captured` is for a plan that outlived its own execution and whose reasoning moved
into [`../solutions/`](../solutions/README.md) — use it sparingly.

To restart a completed plan, open a new plan and mark the old one `superseded`,
linking the replacement. Plans move forward only.

```
docs/plans/
├── archive/                # complete + superseded, append-only, flat
├── <slug>-plan.md          # live only (approved | in_progress)
└── <slug>-notes.md         # type: research, with for-plan:
```

## Archive rules

- **Same commit.** Flip the status and move the file together. A half-moved state
  makes the whole directory untrustworthy — worse than not moving at all.
- **`git mv`**, to preserve blame.
- **Update inbound links** in that same commit, or the move creates a dead link.
- **Append-only.** A wrong plan is superseded, never deleted.
- **Flat**, until it grows unreadable. Restructuring the directory is its own
  plan.

## Shape

- Objective in one sentence.
- Tasks as checkboxes, in dependency order.
- The decisions taken and why, next to the task they affect.
- Acceptance criteria: the observable condition that closes each task.
- Risks, only when one actually changed the order.

## Where the shape comes from

The plan lifecycle, the canonical status values and these archive rules are the
shipped doctrine's, not local invention. See
`plugins/marvin/knowledge/harness-doctrine.md` in the installed
`@heart-of-gold/toolkit` package, §"Plan lifecycle".
