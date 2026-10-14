# Ground

Cached external grounding briefings, written by `/skill:ground`. One file per
fingerprint of the repo's stack and manifest.

```
docs/ground/<fingerprint>.md
```

## Freshness

Each briefing carries a `last_grounded` timestamp in its frontmatter and has a
**7-day freshness window**. `ground` reads that timestamp before doing any work:
a briefing younger than 7 days is reused instead of refetched. Stale briefings are
overwritten, not versioned.

## Why the fingerprint

The fingerprint is derived from the local manifest, `AGENTS.md`, and recent git
activity. A change that shifts the stack produces a different fingerprint, so the
old briefing is simply not found rather than being silently trusted.

## Boundary

A briefing records what the outside world said, with sources and dates. It is not
this repo's own doctrine, and nothing here overrides
[`../../AGENTS.md`](../../AGENTS.md) or [`../MVP.md`](../MVP.md).
