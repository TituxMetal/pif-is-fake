# PROGRESS — PrimeAuPif (PIF)

**Window:** 2026-05-02 → 2026-05-04 (extended weekend, May 1st challenge)
**Decision point:** Monday 2026-05-04 mid-morning — go/no-go on whether to finish

## Slices

- [ ] **Slice 1 — Generation engine + minimal home** — [#1](https://github.com/TituxMetal/pif-is-fake/issues/1) · `feature/generation-engine`
- [ ] **Slice 2 — Salarié routes + permalink + mouline** — [#2](https://github.com/TituxMetal/pif-is-fake/issues/2) · `feature/salarie-routing`
- [ ] **Slice 3 — Visual themes + footer + responsive** — [#3](https://github.com/TituxMetal/pif-is-fake/issues/3) · `feature/visual-themes`
- [ ] **Slice 4 — Sharing + dispatch + prod server + deploy** — [#4](https://github.com/TituxMetal/pif-is-fake/issues/4) · `feature/ship-prod`

## Workflow per slice

1. Cut `feature/*` from `main` (no `develop` on this project)
2. Short plan in `~/.claude/plans/` (single-tranche scope)
3. Implement
4. `/ship` (typecheck + lint:check + format:check + bun test → atomic commits → push → PR)
5. Copilot review (required on slices #1 #2, optional on #3 #4)
6. Fix review feedback if any
7. Rebase merge to `main` → sync → clean → next slice

## Conventions

- Issues and PRs in English; user-facing strings (motifs, microcopy, `/avertissement`) in French
- All issues assigned, all PRs assigned
- Atomic commits in conventional format (`type(scope): description` + body listing changed files)
- Full check suite green before any commit
