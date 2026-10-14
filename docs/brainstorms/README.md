# Brainstorms

Exploratory documents produced before a plan exists. A brainstorm asks *what
should we build*; a [plan](../plans/README.md) says *in what order*.

Written by `/skill:brainstorm`. Not a system of record — once the thinking lands
in a spec or a plan, the brainstorm is history.

## Naming

```
YYYY-MM-DD-<slug>-brainstorm.md
```

## Frontmatter

```yaml
---
status: captured        # captured | superseded by <link>
date: YYYY-MM-DD
---
```

## Freshness

`architect` and `plan` search this directory for a **recent** matching
brainstorm — by default within the **last 14 days**, matched on filename and
frontmatter. An older brainstorm is still worth reading, but it must not be
treated as current intent without being re-read.

## Boundary

A brainstorm does not decide. If it starts collecting decisions, those belong in
a [plan](../plans/README.md) or an [ADR](../adr/README.md), and the brainstorm
should link out to them.
