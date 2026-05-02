# PrimeAuPif (PIF) — Satirical Bonus Generator

**Date:** 2026-05-02 **Status:** Spec — ready for implementation **Type:** Web application

> Consolidated 2026-05-02 from the design-pass brainstorm. The visual language lives in
> [`design.md`](./design.md); the deeper specs live in
> [`design/vest-roles.md`](./design/vest-roles.md),
> [`design/content-banks.md`](./design/content-banks.md), and
> [`design/disclaimer.md`](./design/disclaimer.md).

---

## Branding

- **Brand name:** PrimeAuPif
- **Short sigle:** PIF
- **Subdomain:** `pif.tuxlab.fr`
- **French backronym (rotating in footer):** _PIF — Prime [Illusoire / Imaginaire / Insensée /
  Injuste] Fictive_
- **Geek backronym (recursive, GNU-style):** _PIF Is Fake_

The footer carries a single monospace line, identical on every page:

```text
PIF v0.0.1 — Prime [Illusoire|Imaginaire|Insensée|Injuste] Fictive — PIF Is Fake — /avertissement
```

The bracketed word cycles through the four adjectives in rotation. The transition uses a snap-cut
typewriter effect (delete character-by-character, retype character-by-character, no smooth fade),
in monospace, with the rotating word in the theme's accent color (hi-vis yellow `#facc15` or
orange `#fb923c`). Rotation interval ≈ 4–5 seconds per word.

The rotation appears _only_ in the footer. Not in `<title>`, not in headers, not in result cards.

The HTML `<title>` is fixed: `PrimeAuPif (PIF)`.

---

## Vision

A satirical web application that randomly generates a "monthly bonus", mimicking the structure of
a real corporate compensation scheme. Through pure parody, it exposes the absurdity of arbitrary
attribution systems where some employees stack bonuses for cutting corners while others get
nothing for working diligently.

The application intentionally avoids targeting individuals: every name receives the same random
treatment, with no job titles displayed. The criticism aims at the system, not at people.

Two interfaces:

- **Salarié view** (public) — visitors generate their own bonus and share the result. Viral,
  screenshot-friendly, light.
- **Dispatch view** (hidden) — displays a complete monthly distribution across the team,
  presented as a leaked internal report. Accessible only via a secret keyboard sequence or a
  rare 3-letter collision with a real logistics company sigle.

---

## User Experience

### Salarié view (public)

**Routes:**

- `/` — landing page
- `/<prenom>` — pre-filled first name, random everything else
- `/<prenom>/<boite>` — pre-filled first name and sigle, random montants and motif
- `/<prenom>/<boite>#<hash>` — full deterministic permalink
- `/avertissement` — disclaimer page (see [`design/disclaimer.md`](./design/disclaimer.md))

**Flow:**

1. The visitor lands on `/`. Dark, sober layout. An optional input field ("Ton prénom"), a vest
   selector (Aléatoire / Intérim / Embauché / Responsable), and a single large button:
   **"Tirer ma prime"**.
2. Clicking the button triggers a 2-step loading animation drawn at random from the
   loading-steps bank. Total duration ≈ 4 seconds.
3. The result appears with a snap-cut: company sigle (3 random letters, displayed as
   `<SIGLE> Logistics`), decomposition Production / Qualité / Sécurité, optional bonus line,
   total, sarcastic motif, and a vest accent matching the rolled (or selected) class.
4. The address bar updates to the full permalink without page reload, via
   `history.replaceState()`.
5. Below the result: a **"Tirer une autre prime"** button (re-roll, same prénom kept) followed
   by the three sharing buttons (copy link, native share, download image).

If the visitor leaves the input empty, the application picks a random first name from the
generic-names bank (≈ 50 common French first names). If the vest selector stays on _Aléatoire_,
the vest is drawn at random per the weights defined in the Random Generation Rules section.

The visitor can also enter a colleague first name directly — either typed in the field or set via
the URL. The colleagues bank is not exclusive to the dispatch view; it simply isn't used as a
fallback in the salarié view.

When opening a permalink (hash present), the application replays a short single-step mouline
(≈ 1 second) before revealing the result. This preserves the ritual without making the visitor
wait the full duration. The vest selector reflects the encoded vest.

### Dispatch view (hidden)

**Route:** `/dispatch`

Discovered via two paths only:

- **Keyboard sequence** — to be defined later. Works on any page.
- **Rare collision** — when a salarié-side roll lands on one of the special sigles
  `{GXO, DHL, UPS, FDX, GLS, XPO}`, a temporary link appears below the result: _"Tiens donc.
  Dispatch des primes disponible →"_.

No navigation entry, no sitemap mention, no link in the salarié view header. The route is
excluded from indexing via `robots.txt` and a `noindex` meta tag.

**Flow:**

1. The page header displays a single sigle (3 random letters) — all employees belong to the same
   establishment, mirroring the real-world manager who arbitrarily distributes bonuses across
   their site. Sigle is rendered as `<SIGLE> Logistics`.
2. A button **"Générer la distribution"** triggers a 3-step loading animation (≈ 6 seconds),
   drawn at random from the loading-steps bank.
3. Cards appear, animated line-by-line. Each card shows:
   - First name (drawn from the colleagues bank for real names; from generic-names for fictional
     intérim slots)
   - Decomposition: Production, Qualité, Sécurité
   - Optional bonus line
   - Total
   - Sarcastic motif
4. Each click on "Générer" re-rolls everything. No persistence, no permalinks, no sharing
   buttons.

**Card count:** by default the grid renders one card per real-name entry of the colleagues bank,
each with the worker's fixed vest (embauché or responsable). An undocumented easter-egg query
parameter `?n=<base62>` (range 0–20, opaque to the visitor) appends N additional fictional intérim
cards drawn from the generic-names bank, all carrying the yellow vest. Card order is shuffled per
generation; real and fictional cards interleave. See
[`design/vest-roles.md`](./design/vest-roles.md) for the full dispatch model.

---

## Random Generation Rules

### Company sigle (3 letters)

- Uniform draw on `[A-Z]³`
- Two exclusions:
  - No identical triples (`AAA`, `BBB`, …)
  - No consecutive identical letters (`AAB`, `ABB`)
- Valid pool: **16 250 combinations**
- Special trigger sigles: `{GXO, DHL, UPS, FDX, GLS, XPO}` — when drawn, reveal the temporary
  dispatch-view link
- Display format everywhere: `<SIGLE> Logistics`. The suffix is display-only — never present in
  URLs.

### Amounts

| Component  | Range                     | Notes                                                                                               |
| ---------- | ------------------------- | --------------------------------------------------------------------------------------------------- |
| Base prime | 0 – 200 €                 | Uniform, integer. Matches the real-world official cap.                                              |
| Bonus      | 0€, +50€, +100€, or +150€ | Stackable bonus reflecting the real-world combination of "surproduction" and negotiated favoritism. |

**Bonus probability distribution:**

| Value | Probability |
| ----- | ----------- |
| 0€    | 65 %        |
| +50€  | 25 %        |
| +100€ | 8 %         |
| +150€ | 2 %         |

Total possible: **0 – 350 €**, with 300 €+ reachable only by combining a high base prime with a
rare +100 / +150 € bonus.

**Bonus line labels** (sarcastic, by value):

- `+50€` → _"Bonus surproduction"_
- `+100€` → _"Bonus négocié au bureau"_
- `+150€` → _"Bonus — t'as bien fait de râler"_

### Decomposition (Production / Qualité / Sécurité)

Three random weights, normalized so the sum equals the **base prime** (excluding the bonus). Any
single component can be zero or capture the majority — this desynchronization with the official
50 % / 25 % / 25 % pondération is the core satirical signal.

The bonus, when present, is displayed on its own line below the decomposition, not folded into
any of the three components.

### Vest (salarié roll)

Each salarié roll carries a vest. By default the vest is drawn at random per the weights
below; the visitor can also force a specific vest via the selector on the Home page (see
[`design/vest-roles.md`](./design/vest-roles.md)).

| Vest | Weight (random) | Role |
| --- | --- | --- |
| Orange — embauché | 60 % | Majority of the workforce |
| Jaune — intérim | 30 % | Substantial minority |
| Mixte (jaune + orange) — responsable | 10 % | Rare — chef d'équipe + responsable merged |

The vest selects the accent palette on the result card (see [`design.md`](./design.md)) and is
encoded in the permalink hash so a shared URL reproduces the same vest. Full mapping and
rationale: [`design/vest-roles.md`](./design/vest-roles.md).

The dispatch view does **not** roll random vests — see the dispatch model in
[`design/vest-roles.md`](./design/vest-roles.md).

### Banks

- **Motif bank** — sarcastic justification phrases. Target ≈ 50–100 entries. Tonal mix:
  - ≈ 70 % direct/warehouse, anchored in real logistics work (palettes, filmage, ripage, quais,
    préparation de commandes)
  - ≈ 30 % absurd/everyday
  - **No corporate-cadres jargon** — the application does not speak the language of office
    workers
- **Loading-steps bank** — short sentences shown one at a time during the mouline. Target
  ≈ 20–30 entries. Same tonal range as the motif bank. Salarié view picks 2 entries; dispatch
  view picks 3.
- **Colleagues bank** — ≈ 20 real-colleague first names. Each entry is an object
  `{ name: string, vest: "embauche" | "responsable" }`. Each real name carries a fixed vest (no
  random assignment, no intérim assignment to real names). Used as the real-name source for the
  dispatch view. Also accepted as input in the salarié view (URL or field).
- **Generic-names bank** — ≈ 50 common French first names, plain `string[]`. Two roles:
  fallback for the salarié view when the visitor provides no name, AND pool of fictional intérim
  names in the dispatch view when the easter-egg query param `?n=<base62>` is present.

These banks are versioned content. Curation guidance and the full content draft live in
[`design/content-banks.md`](./design/content-banks.md).

---

## URL System

### Permalink hash encoding

The fragment after `#` packs all random parameters of a single salarié roll into 35 bits,
encoded as 6 base62 characters.

| Field       | Bits        | Range                                                            |
| ----------- | ----------- | ---------------------------------------------------------------- |
| Production  | 8           | 0 – 200                                                          |
| Qualité     | 8           | 0 – 200                                                          |
| Sécurité    | 8           | 0 – 200                                                          |
| Bonus       | 2           | one of {0, 50, 100, 150}                                         |
| Vest        | 2           | one of {00=intérim, 01=embauché, 10=responsable, 11=reserved}    |
| Motif index | 7           | up to 128 motifs                                                 |
| **Total**   | **35 bits** | encoded in base62 → **6 characters** (62⁶ ≈ 5.7 × 10¹⁰)          |

Field order in the pack: `[ Production | Qualité | Sécurité | Bonus | Vest | Motif ]`.

The hash is decoded entirely client-side. The server never sees it. Codepoint `11` for Vest is
reserved and unused in v1; if encountered, treat it like any other invalid hash field per the
silent-fallback rule below.

### Permalink replay

When a request arrives with a hash present:

- The server (Hono) renders the salarié shell with `<prenom>` and `<boite>` pre-filled in the
  HTML.
- The client reads the hash, decodes the parameters, replays a short single-step loading
  animation (≈ 1 second), then reveals the result.

This preserves the surprise and ritual without the full 4-second wait.

---

## Sharing (salarié view only)

Below the result, three buttons appear in a row:

1. **"Copier le lien"** — copies the permalink to the clipboard. Short toast confirms.
2. **"Partager"** — calls the Web Share API. On platforms without native support, falls back to
   clipboard copy.
3. **"Télécharger l'image"** — generates a stylized PNG/SVG of the result (first name, sigle,
   decomposition, total, motif, all on the dark brutalist layout) using `html-to-image` or
   `satori`. Immediate download. The image is self-contained and ready to paste into WhatsApp,
   Discord, Twitter, etc.

The dispatch view exposes no sharing buttons. The viewer remains free to screenshot manually, but
no affordance encourages it. Distribution outputs are designed for internal reading, not for
virality.

---

## Edge Cases & Error States

### Input validation

**First name (URL segment or input field):**

- Maximum length: **24 characters**. Longer inputs are silently truncated.
- Allowed characters: letters (A–Z, a–z), accented French letters (é, è, à, ç, etc.), hyphen
  (`-`), apostrophe (`'`). Other characters are stripped.
- Empty input → fallback to a random pick from the generic-names bank.
- The trimmed and sanitized first name is what gets encoded in the URL and displayed.

**Sigle (URL segment):**

- Must match `[A-Z]{3}` after uppercasing.
- Invalid input (wrong length, non-letter, triple, or consecutive doubles) → silently ignored,
  replaced by a fresh random valid sigle.

**Hash fragment:**

- Must decode to valid integer ranges for all encoded fields (Production / Qualité / Sécurité
  ≤ 200, bonus ∈ {0, 50, 100, 150}, vest ∈ {00, 01, 10}, motif index < bank size).
- Invalid or corrupted hash → silently ignored. The application falls back to fresh random
  generation as if no hash were present.
- No error message displayed — failure is silent and graceful.

**Easter-egg query param `?n=<base62>` (dispatch only):**

- `n` is clamped to `[0, 20]`. Values above 20 are silently capped.
- A non-decodable value (`?n=` empty, `?n=zzz`, etc.) is silently treated as 0.

### Web Share API unavailable

- On platforms without `navigator.share` (most desktop browsers), the "Partager" button degrades
  to the same behavior as "Copier le lien" — clipboard copy + toast.
- The button label remains "Partager"; the icon may differ (clipboard icon instead of share
  arrow).

### Image generation failure

- If `html-to-image` / `satori` fails (browser quirk, missing font, security policy, blocked
  worker), display a brief inline error: _"Téléchargement indisponible. Capture d'écran à la
  main, courage."_
- The two other sharing buttons remain functional.

### Network failure

- The application is fully client-side after initial load. Once the SPA assets are cached, the
  entire experience works offline.
- If the initial HTML/JS fetch fails (server down, network drop), the browser shows its native
  error — nothing custom in v1.

### Dispatch view triggered without colleagues bank loaded

- Should not occur since the bank ships in the bundle. If it does (catastrophic build failure),
  cards render `—` for missing names with the rest of the UI intact, and motifs render
  `(motif indisponible)`.

---

## Visual Direction

The brand exposes **two themes** — `Terminal` (booted shell `Pif.sh`) and `Manifeste`
(brutalist printed poster) — each carrying the three vest palettes (yellow / orange / mixed).
Both themes are dark and **print-flat** by intent: no glow, no halo, no vignette, no soft
shadows, no transitions, no border-radius. Hover is hard color inversion only.

Full per-theme tokens, typography sizes, signature components, and screen wireframes live in
[`design.md`](./design.md). The vest model is in
[`design/vest-roles.md`](./design/vest-roles.md).

### Theme switcher

A discreet toggle in the header top-right lets the visitor switch between the two themes. The
selected theme is persisted to `localStorage` under the key `pif:theme` and re-applied on every
page load. Default on first visit: **Terminal**.

The toggle label shows the _alternative_ theme (the one a click would activate):

- In Terminal mode: `[Manifeste ▶]`
- In Manifeste mode: `[Terminal ▶]`

Theme is decoupled from vest — switching theme keeps the rolled vest and result; only the
visual chrome changes.

### Responsive behavior

**Mobile-first.** Most sharing happens on mobile (WhatsApp, screenshots), so layouts must work
cleanly at 360 px wide and scale up.

**Salarié view:**

- Single-column layout at all viewport widths
- Result table: full viewport width on mobile, capped at ≈ 480 px on desktop, centered
- Sharing buttons stack vertically below 600 px, horizontal row above
- Web Share API takes precedence on mobile via the "Partager" button (native share sheet)

**Dispatch view (variable card count):**

- Desktop (≥ 1024 px): **3-column grid** (Terminal) / **4-column grid** (Manifeste)
- Tablet (640–1023 px): 2-column grid
- Mobile (< 640 px): 1-column stack
- Each card stays self-contained and remains readable at all widths (no internal text
  truncation)

**Touch targets:** all interactive elements ≥ 44 × 44 px on mobile.

**Generated share image:** fixed canvas size **1200 × 630 px** regardless of viewport, optimized
for social-share previews and screenshot quality (matches OpenGraph default ratio).

---

## Tech Stack

### Architecture: Vite SPA + Hono prod static server

- **Vite (React SPA)** owns the frontend in dev and at build time:
  - Single entry: `index.html` at the project root, mounting `src/main.tsx`.
  - All visitor-facing URLs (`/`, `/:prenom`, `/:prenom/:boite`, `/dispatch`,
    `/avertissement`) are handled **client-side** — the SPA reads `window.location` on mount
    to pre-fill prénom/sigle and decode the hash.
  - Vite handles dev server, HMR, and the production bundle (`vite build` → `dist/`).
- **Hono on Bun** is used **only in production** (`bun src/server.ts`) to:
  - Serve the built static files from `dist/` (HTML, JS, CSS, assets) via
    `@hono/node-server/serve-static`.
  - Catch all unknown URLs and serve `dist/index.html` so deep links work.
  - Expose `/api/health` (and any future `/api/*` endpoints).
  - Listen on `process.env.PORT ?? 3000`.
- **Styling**: **Tailwind CSS v4** with **DaisyUI v5** components, configured for the dark
  brutalist palette via `@theme` tokens. Custom Tailwind utilities supplement where DaisyUI's
  defaults conflict with the brutalist constraints (no border-radius, no soft shadows, no
  smooth transitions).
- **TypeScript**: `@typescript/native-preview` (TS 7 dev preview, `tsgo` binary). Strict mode.
- **Linting / formatting**: **Biome** (single tool for both). No ESLint, no Prettier.
- **Tests**: **`bun test`**, scope unit-only — pure logic (hash encoding, generation rules,
  validation). No UI tests.

### Behavior summary

- "Tirer ma prime" click on `/`:
  1. Client generates first name (if empty), sigle, amounts, bonus, vest, and motif.
  2. Encodes the hash, calls `history.replaceState()` to update the URL to
     `/<prenom>/<boite>#<hash>` without page reload.
  3. Plays the mouline locally and reveals the result.
- Permalink open (`/<prenom>/<boite>#<hash>`):
  1. The Hono catch-all (prod) or Vite dev server returns `index.html`. Browser starts loading
     React.
  2. On mount, the SPA reads `window.location` — extracts prénom + sigle from the path, hash
     from `window.location.hash` — pre-fills the form, plays a short replay mouline (~1 s),
     and reveals the result.
- Dispatch view (`/dispatch`): same SPA shell, the route component branches on the URL path.
  Optional `?n=<base62>` easter-egg query param is read client-side.
- All views render through the same SPA shell; there is no per-route server-side rendering.

### Backend (production)

- **Hono** running on **Bun** via `@hono/node-server` (Node-compat layer).
- Stateless in v1 — no DB, no sessions, no persistence.
- Multi-stage Docker image: Vite build stage → final stage running `bun src/server.ts`.

### Future (post-v1)

- **SQLite** when a real persistence need emerges (global roll counter, top drawn sigles, hall
  of fame for extreme amounts, etc.)
- Additional `/api/*` endpoints on Hono as needed

---

## Infrastructure

- Hosted on the existing Debian + Docker server (Portainer + Nginx Proxy Manager)
- Subdomain: `pif.tuxlab.fr`
- Deployed via the existing Ansible / Docker workflow
- `robots.txt` excludes the dispatch view; `/dispatch` carries a `noindex` meta tag

---

## Code Conventions

Defined globally in `~/.claude/CLAUDE.md`. Reminder of the rules that apply directly to this
project:

- TypeScript strict
- Named exports only
- No `;`
- Arrow functions only (no `function` keyword)
- No `.then()` (async/await only)
- No `if/else` chains (early returns)
- No pure white (`#fff`) or pure black (`#000`)
- 2-space indentation
- Code, comments, and documentation in English
- User-facing content in French (motifs, loading steps, banks, tooltips)
- All checks pass before any commit: `bun run test`, `bun run typecheck`, `bun run lint:check`,
  `bun run format:check`

Frontend organization follows the project-local `frontend-architecture` skill (feature folders) —
file naming and hierarchy under that skill's authority.

---

## Microcopy

Concrete user-facing strings, all in French. Final wording can be refined during implementation.

### Buttons

| Context                       | String                        |
| ----------------------------- | ----------------------------- |
| Salarié main action           | TIRER MA PRIME                |
| Salarié re-roll               | TIRER UNE AUTRE PRIME         |
| Dispatch first action         | GÉNÉRER LA DISTRIBUTION       |
| Dispatch re-roll              | GÉNÉRER NOUVELLE DISTRIBUTION |
| Share — copy link             | COPIER LE LIEN                |
| Share — native share          | PARTAGER                      |
| Share — image download        | TÉLÉCHARGER L'IMAGE           |
| Theme switcher (in Terminal)  | Manifeste ▶                   |
| Theme switcher (in Manifeste) | Terminal ▶                    |
| Vest selector — random        | Aléatoire                     |
| Vest selector — interim       | Intérim                       |
| Vest selector — embauché      | Embauché                      |
| Vest selector — responsable   | Responsable                   |

### Inputs and placeholders

| Context                  | String                 |
| ------------------------ | ---------------------- |
| Salarié name input label | Ton prénom (optionnel) |

### Toasts

| Context                  | String                                                           |
| ------------------------ | ---------------------------------------------------------------- |
| Link copied              | Copié.                                                           |
| Image generation failure | Téléchargement indisponible. Capture d'écran à la main, courage. |

### Special links

| Context                           | String                                       |
| --------------------------------- | -------------------------------------------- |
| Dispatch trigger (rare collision) | Tiens donc. Dispatch des primes disponible → |

### Section headers

| Context                | String                                              |
| ---------------------- | --------------------------------------------------- |
| Salarié result section | RELEVÉ DE PRIME — [MOIS EN COURS]                   |
| Dispatch section       | DISTRIBUTION MENSUELLE — SOCIÉTÉ [SIGLE] LOGISTICS  |

### Footer (rotating)

```text
PIF v0.0.1 — Prime [Illusoire|Imaginaire|Insensée|Injuste] Fictive — PIF Is Fake — /avertissement
```

The bracketed word rotates every 4–5 seconds with a snap-cut typewriter effect, monospace, hi-vis
yellow.

### Empty / fallback strings (dispatch view)

| Context                 | String               |
| ----------------------- | -------------------- |
| Card with missing name  | —                    |
| Card with missing motif | (motif indisponible) |

### HTML `<title>`

Fixed across all routes: `PrimeAuPif (PIF)`

---

## Out of Scope (v1)

The following are explicitly excluded from the first version:

- Database, persistence, and stored state of any kind
- User accounts, sessions, cookies
- Analytics (Plausible or any other)
- User-submitted content (no comments, no motif submissions, no contributions)
- Multilingual support (the application is French only)
- Light/dark mode toggle (it is dark, period)
- Server-side business logic beyond routing and health
- Runtime AI generation of motifs (banks are static and versioned)
- Rate limiting (the application is random and stateless — no abuse vector worth defending
  against in v1)
- Sitemap, SEO optimization (the dispatch view is intentionally non-indexed)

---

## Open Items (deferred to implementation)

- Exact keyboard sequence triggering the dispatch view
- Final wording of motif and loading-step banks (drafts in
  [`design/content-banks.md`](./design/content-banks.md))
- Final font choice within the proposed display family
- Image generation library: `html-to-image` vs `satori`
- Vest values for the colleagues bank — to be filled in by the project author at
  content-bank-write time, per [`design/content-banks.md`](./design/content-banks.md)
