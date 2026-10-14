# AGENTS.md Standard

The rule this repo is graded on lives in the toolkit that ships it, not here:

**`${CLAUDE_PLUGIN_ROOT}/knowledge/harness-doctrine.md`** — in this repo,
`plugins/marvin/knowledge/harness-doctrine.md` under the installed
`@heart-of-gold/toolkit` package.

That file is the single source of truth: the five jobs of a root `AGENTS.md`, the
anti-goals, the standard shape (`Mission → Read First → Task Routing → Repo Map →
Language & Trust Boundaries → Verification Boundary → Done Criteria`), the 12
PASS/FAIL checks, the plans-directory checks, and the plan lifecycle. **Do not
restate it here** — a second copy of a doctrine is a second authority, and the
one that drifts is the one nobody grades against.

This file exists only to record **this repo's standing against those checks**.

## Current verdict

Root file: `AGENTS.md`.

| Check | Verdict |
|---|---|
| `agents_md_exists` | PASS |
| `map_not_dump` | PASS — 166 lines, routes rather than restates |
| `read_first_present` | PASS — five ordered entries with paths |
| `task_routing_present` | PASS — ten routes across distinct areas |
| `verification_boundary_stated` | PASS — four exact commands, check-only |
| `done_criteria_explicit` | PASS — five observable conditions |
| `next_safe_move_obvious` | PASS |
| `repo_map_matches_reality` | PASS — every load-bearing top-level directory listed |
| `links_repo_relative` | PASS |
| `no_chat_only_rules` | PASS |
| `public_private_boundaries_current` | PASS — language, secrets, visitor data, anonymity |
| `maintenance_triggers_named` | PASS |

Plans directory, `docs/plans/`:

| Check | Verdict |
|---|---|
| `no_complete_plans_in_plans_root` | PASS — no plans yet |
| `no_non_plan_types_in_plans_root` | PASS |
| `plan_status_field_canonical` | PASS |

## Re-verify

Re-run the checks after any change to `AGENTS.md`, the repo map, the verification
commands, or `docs/plans/`. `/skill:harness-sync check` audits harness drift; when
a check fails, fix the document rather than relaxing the check.

A PASS here is a statement about the document, not about the code. It says nothing
about whether the suite is green — that is the verification boundary's job.
