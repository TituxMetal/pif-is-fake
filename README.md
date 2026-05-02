# PrimeAuPif (PIF)

**PIF Is Fake.** A satirical French-language web application that randomly generates a "monthly
bonus", parodying the structure of a real corporate compensation scheme. Through pure parody,
it exposes the absurdity of arbitrary attribution systems where some employees stack bonuses
for cutting corners while others get nothing for working diligently.

The criticism aims at the system, not at people. Every name receives the same random treatment,
no job titles are displayed, and a [disclaimer page](./docs/design/disclaimer.md) makes the
intent explicit.

Live at [pif.tuxlab.fr](https://pif.tuxlab.fr).

## Documentation

- [`docs/MVP.md`](./docs/MVP.md) — the spec (routes, generation rules, hash, edge cases)
- [`docs/design.md`](./docs/design.md) — visual language (palettes, typography, wireframes)
- [`docs/design/vest-roles.md`](./docs/design/vest-roles.md) — vest → role mapping, dispatch model
- [`docs/design/content-banks.md`](./docs/design/content-banks.md) — motifs, loading steps, names
- [`docs/design/disclaimer.md`](./docs/design/disclaimer.md) — `/avertissement` page copy

## Stack

Hono SSR + React (selective hydration), Vite, Tailwind v4 + DaisyUI, TypeScript, Biome, Bun.

## Dev

```bash
bun install
bun run dev
```

Other commands:

```bash
bun run test         # Unit tests (Bun test)
bun run typecheck    # TypeScript check
bun run lint:check   # Biome lint (check only)
bun run lint         # Biome lint (auto-fix)
bun run format:check # Biome format (check only)
bun run format       # Biome format (auto-fix)
bun run build        # Production build
```

## License

[MIT](./LICENSE.md) — © 2026 Titux Metal
