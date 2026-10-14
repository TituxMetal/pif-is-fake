# PrimeAuPif (PIF) — Agent Operating Map

All paths in this file are relative to the repository root. This file is a map:
it routes to the real system of record instead of reproducing it.

## Mission

`pif-is-fake` is a French-language satirical web app that randomly generates a
"monthly bonus", parodying a corporate compensation scheme. Generate an absurd
but structurally plausible bonus, and let the absurdity argue for itself. The
criticism targets the system, never people. Live at <https://pif.tuxlab.fr>.

Three invariants outrank any feature:

1. **Same random treatment for everyone.** A name gets no score, no rank, no
   bias. No job title is displayed or inferred.
2. **The target is the mechanic, not a person.** Copy that blames an individual,
   a site, or a real company is a bug, not a tone choice.
3. **The parody stays verifiable.** Open source, no targeting, no stored data.
   `/avertissement` states this, and the code must keep it true.

## Read First

Read in this order before touching code:

| Need | Read |
|---|---|
| What to build, exactly | [`docs/MVP.md`](docs/MVP.md) — routes, generation rules, hash, edge cases |
| Visual language | [`docs/design.md`](docs/design.md) (both themes), then [`docs/design/`](docs/design) |
| Slice status, plan workflow | [`docs/PROGRESS.md`](docs/PROGRESS.md) |
| Entry point, dev commands | [`README.md`](README.md) |
| Index of every doc | [`docs/README.md`](docs/README.md) |

`docs/MVP.md` is the specification authority. When code and spec disagree, either
the code changes or the spec is amended in the same change — never silently
diverge.

## Task Routing

| Task | Route |
|---|---|
| Feature or behaviour change | Implement in dependency order; update the matching `docs/` section in the same change |
| Change touching a themed surface | [`theme-parity-review`](.pi/skills/theme-parity-review/SKILL.md) before commit (`/skill:theme-parity-review`, or `delegate({ agent: "theme-parity-review" })`) |
| Change touching French user-facing copy | [`editorial-invariant-review`](.pi/skills/editorial-invariant-review/SKILL.md) before commit (same two routes) |
| Review a change | Judge the diff against [`docs/MVP.md`](docs/MVP.md), then both reviewers above |
| Unknown failure | Diagnose from the failing command's output before editing |
| Git/GitHub | Conventional commits, atomic, one slice branch (`feature/*` off `main`) |
| Plan non-trivial work | [`docs/plans/`](docs/plans/README.md) — status contract in its README |
| Architecture decision | [`docs/adr/`](docs/adr/README.md) — record shape in its README |
| A bug worth remembering | [`docs/solutions/`](docs/solutions/README.md) — shape in its README |
| Doctrine drift or a second machine | `/skill:harness-sync` |

## Repo Map

```
src/features/<feature>/   one folder per feature: components/, hooks/, content/, lib/, index.ts
src/lib/<concern>/        cross-cutting: banks/, generation/, hash/, routing/, theme/
src/types/                shared TypeScript types
src/server.ts             Hono static server for dist/ in production
src/styles/               Tailwind v4 tokens, both theme palettes
docs/                     system of record: MVP.md, design.md, design/, plans/, adr/, solutions/
.pi/                      committed doctrine: settings.json, skills/ (.pi/pi-daddy/ is local, ignored)
docker/                   Dockerfile + compose for the production stack
scripts/                  docker-build.sh
public/                   favicon.svg, robots.txt
```

Stack: Bun + Vite + React 19 (selective hydration) + Hono, Tailwind v4,
TypeScript strict (`tsgo`), Biome.

## The two themes — the sharpest failure mode here

Every screen exists twice: `manifeste` (editorial, French) and `terminal`
(retro-computer). The rule the code enforces:

- A **themed surface** has `src/features/<f>/components/Manifeste<Name>.tsx` and
  `Terminal<Name>.tsx`.
- A shared **dispatcher** with the bare name reads `useTheme()` from
  `~/lib/theme` and picks one — `DispatchHeader.tsx` → `ManifesteDispatchHeader`
  / `TerminalDispatchHeader`; same shape for `DispatchCard`, `ResultDisplay`,
  `ShareActions`, `Disclaimer`.
- Terminal-only primitives stay unprefixed:
  `src/features/shell/components/Caret.tsx`,
  `src/features/shell/components/CommandEcho.tsx`,
  `src/features/home/components/TerminalBootBlock.tsx`.

Adding a themed surface means all three files in one change. A commit touching
only one theme is the most common defect in this repo.

## Language & Trust Boundaries

- **User-facing = French.** Motifs, loading steps, banks, tooltips, microcopy,
  `/avertissement`. **Code, comments, and docs = English.**
- **Public repository.** Nothing secret may be committed. Never commit `dist/`
  (built), `.env*`, or `.pi/pi-daddy/` (local governance state — ignored, not
  tracked).
- **No data about the visitor.** `pif:theme` in `localStorage` is the only
  sanctioned stored key. The URL permalink hash is the only other state;
  `docs/MVP.md` §"Permalink hash encoding" defines it.
- **Anonymity is a boundary, not a preference.** `vest` changes presentation
  only and is never rendered as a role.

## Verification Boundary

Run all four before any commit. A red check makes the commit a defect:

```bash
bun run test          # bun test
bun run typecheck     # tsgo --noEmit
bun run lint:check    # biome lint (check only)
bun run format:check  # biome format (check only)
```

`bun run lint` and `bun run format` auto-fix: use them to repair, never to
verify. `bun run build` before shipping; `bun run dev` for local development.

Conventions Biome enforces: named exports and arrow functions only (no
`function`), no semicolons, no `.then()` (async/await), early returns instead of
`if/else` chains, no pure white `#fff` or pure black `#000`, 2-space indent,
named `*.spec.ts` tests beside the code they cover.

## Done Criteria

- [ ] The four verification commands pass.
- [ ] Both themes carry the surface, if the change is themed.
- [ ] The invariants above still hold.
- [ ] The relevant `docs/` section matches the shipped behaviour.
- [ ] Commits are atomic and in `type(scope): description` form.

## Maintenance Triggers

Update this file or a doc it links when: an entry point moves; a trust boundary
changes; the framework or build materially changes; contributors repeat the same
mistake; or a linked document stops being the true source of truth.

## First-time Setup

Each developer installs the Pi packages from their own user settings:

```
pi install npm:principal-pi-skills
pi install npm:pi-daddy
pi install npm:skill-harness
pi install npm:pi-ask-user
```

Project settings (`defaultTools`) and the two review skills in `.pi/skills/` are
committed, so cloning is enough to get them. Run `/reload` after pulling so the
skills register.

Why skills and not `.pi/agents/`: this project runs pi-daddy capability
governance, which refuses the ungoverned `Agent` spawn but resolves delegated
definitions from Pi's own skill registry. A project `SKILL.md` therefore works
both as `/skill:<name>` and as `delegate({ agent: "<name>" })`, where its
`allowed-tools` becomes an enforced read-only ceiling rather than a hint.

## Doctrine Surfaces

- [`docs/agents-md-standard.md`](docs/agents-md-standard.md) — the checks this
  file is graded on, and the current verdict.
- [`docs/README.md`](docs/README.md) — the doc index.
- [`docs/plans/README.md`](docs/plans/README.md) — plan lifecycle and archive rules.
- [`docs/adr/README.md`](docs/adr/README.md) — architecture decision records.
- [`docs/solutions/README.md`](docs/solutions/README.md) — searchable problem → fix log.
- [`.pi/skills/theme-parity-review/`](.pi/skills/theme-parity-review/SKILL.md) — theme parity verdict.
- [`.pi/skills/editorial-invariant-review/`](.pi/skills/editorial-invariant-review/SKILL.md) — anonymity, targeting, FR copy.
