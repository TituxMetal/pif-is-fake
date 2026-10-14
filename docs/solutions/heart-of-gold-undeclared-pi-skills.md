# Heart of Gold ships 42 Pi skills but declares only 33

- **Date:** 2026-10-14
- **Files:** none in this repo — upstream package `@heart-of-gold/toolkit@0.2.3`
- **Verified by:** comparing `package.json` → `pi.skills` against every `SKILL.md`
  present under `plugins/` in the installed package

## Symptom

After `pi install npm:@heart-of-gold/toolkit`, some toolkit skills were simply
absent from a session, while other skills from the same package loaded fine.
Nothing errored. There was no warning to grep for.

## Root cause

The package's Pi manifest is narrower than the package's own tree.

```
SKILL.md files present under plugins/ : 42
entries in package.json → pi.skills   : 33
```

The nine undeclared skills are:

```
contract, copy-editor, expert-panel, ground,
harness-sync, improbable-futures, linkedin-carousel, teach, verify
```

Pi loads a package's skills from its `pi.skills` manifest. An undeclared
`SKILL.md` is shipped but never registered — it is invisible, and the absence
produces no diagnostic. `teach`, `verify` and `contract` have no other install
route on this machine, so they were unreachable entirely.

A second, related trap: `pi install` registers the manifest's skills, so a
partial *directory*-copied install (`bunx @heart-of-gold/toolkit install --to pi`)
can leave user-scope copies in `~/.pi/agent/skills/`. Package-provided skills rank
**below** user and project skills, so those stale copies shadow the freshly
installed package skills instead of being replaced by them.

## Fix

1. Declare every shipped skill in `pi.skills` (upstream fix), **or** keep local
   copies for the ones you need. On this machine the six that matter
   (`copy-editor`, `expert-panel`, `ground`, `harness-sync`,
   `improbable-futures`, `linkedin-carousel`) are kept in `~/.pi/agent/skills/`
   deliberately, and must **not** be swept up in a "remove the duplicates"
   cleanup — they are the only way those skills load.
2. Before installing the package, remove only the stale copies whose names the
   manifest declares. Those are the ones that would shadow the package.
3. Never delete a local skill directory without first checking whether
   `pi.skills` declares it.

## Lesson

A package's declared resource list is an allowlist, not a description of its
contents. "The file is in the package" and "the tool will load it" are different
claims, and only the manifest decides the second.

The generalisable form: **when removing a duplicate, first determine whether the
source will actually supply the original.** Deleting a redundant-looking file is
only safe once the alternative is declared, not merely present.
