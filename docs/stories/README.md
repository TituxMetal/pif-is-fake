# Stories

User stories and the context documents derived from them, used as the input to
test writing and to planning.

| Producer | Writes |
|---|---|
| `architect` | `{stories_path}/{slug}.context.md` (default `stories_path` is this directory) |
| `scaffold` | `{stories_path}/{slug}.context.md` |
| `test-writer` | Reads this directory to find the story behind the tests it writes |

## Naming

```
<slug>.context.md        # story + surrounding context for one slice of work
```

## Boundary

A story states what a participant or operator wants and why. It is not a spec and
not a plan: acceptance criteria live here, the rules live in
[`../MVP.md`](../MVP.md), and the order of work lives in
[`../plans/`](../plans/README.md).

Tests derive from stories. If a test cannot point at the acceptance criterion it
verifies, one of the two is wrong.
