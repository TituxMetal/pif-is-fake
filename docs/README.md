# Docs

Index of this repository's documentation. `AGENTS.md` at the repo root is the
entry point for agents; this file is the entry point for humans and for anyone
who needs to find _which_ document owns a fact.

Column **Authority** says what the document is the last word on.

## Specification — the system of record

| Document | Authority on | Status |
|---|---|---|
| [`MVP.md`](./MVP.md) | Routes, generation rules, permalink hash, edge cases, microcopy, tech stack | spec, in force |
| [`design.md`](./design.md) | Visual language: palettes, typography, wireframes for both themes | consolidated |
| [`design/vest-roles.md`](./design/vest-roles.md) | Vest → role mapping and the dispatch model | canonical |
| [`design/content-banks.md`](./design/content-banks.md) | Motif, loading-step and name banks | draft, v1 |
| [`design/disclaimer.md`](./design/disclaimer.md) | `/avertissement` page copy and structure | locked |
| [`PROGRESS.md`](./PROGRESS.md) | Slice history and the per-slice workflow | historical record |

`MVP.md` is the specification authority. When code and spec disagree, either the
code changes or the spec is amended in the same change.

## Working documents

| Document | Use |
|---|---|
| [`plans/`](./plans/README.md) | Plans for non-trivial work, and their research notes |
| [`adr/`](./adr/README.md) | Architecture decisions that outlive a plan |
| [`solutions/`](./solutions/README.md) | Searchable problem → fix log — see [`heart-of-gold-undeclared-pi-skills.md`](./solutions/heart-of-gold-undeclared-pi-skills.md) for a worked example |
| [`brainstorms/`](./brainstorms/README.md) | Exploratory documents written before a plan exists |
| [`stories/`](./stories/README.md) | User stories and their context docs, the input to tests |
| [`ground/`](./ground/README.md) | Cached external grounding briefings, 7-day freshness |

## Doctrine

| Document | Use |
|---|---|
| [`../AGENTS.md`](../AGENTS.md) | The agent operating map: mission, routing, verification, done |
| [`agents-md-standard.md`](./agents-md-standard.md) | The checks `AGENTS.md` is graded on, and this repo's verdict |

The law behind that standard is shipped, not local:
`plugins/marvin/knowledge/harness-doctrine.md` in the installed
`@heart-of-gold/toolkit` package.

## Conventions

### Status vocabulary

Every document above opens with a `**Status:**` line. Canonical values, in the
sense used by the table above:

| Value | Means |
|---|---|
| `spec — in force` | Normative. Code must match it, or it is amended in the same change. |
| `canonical` | Normative for its narrow subject; other docs defer to it. |
| `consolidated (<date>)` | Gathered from earlier thinking on that date; no longer changing. |
| `draft (v<n>)` | Written, expected to change. |
| `locked` | Copy or structure frozen; changing it is a deliberate act. |
| `historical record` | Describes the past. Never updated to match the present. |
| `superseded by <link>` | Replaced. Kept for history. |

`completed` is not a value; use `consolidated` or `historical record`.

### Other rules

- Markdown links are repo-relative, so they resolve on the forge and in a local
  clone.
- User-facing content is French. Code, comments, and docs are English.
- A document that stops being the true source of truth is updated or deleted —
  not left to drift. See "Maintenance Triggers" in [`../AGENTS.md`](../AGENTS.md).
