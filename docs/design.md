# PIF — Design

**Status:** consolidated 2026-05-02 from the design-pass brainstorm. **Companion to:** `MVP.md`.

This file captures the visual language of PrimeAuPif. The spec — routes, generation rules, hash
encoding, edge cases, microcopy — lives in `MVP.md`. The deeper specifics that didn't fit on a
single page live alongside:

- [`design/vest-roles.md`](./design/vest-roles.md) — vest → role mapping, dispatch model
- [`design/content-banks.md`](./design/content-banks.md) — motifs, loading steps, colleagues, generic names
- [`design/disclaimer.md`](./design/disclaimer.md) — `/avertissement` page copy

## Two themes at a glance

The brand exposes **two** themes. Both are dark, both share the `#facc15` / `#fb923c` accent
vocabulary, both use the same vest palettes.

| Trait | Terminal | Manifeste |
| --- | --- | --- |
| Reading metaphor | Booted shell `Pif.sh` | Brutalist printed payroll poster |
| Background | `#06120a` (deep green-black) | `#0e0e0f` (warm dark) |
| Body text | `#7df9a3` phosphor green | `#bdb6a8` warm muted beige |
| Display family | Same mono as body | Archivo Black (massive, tight tracking) |
| Signature elements | TitleBar `● Pif.sh`, boot lines, `[ OK ]` tags, ASCII bars, blinking caret | Massive `PIF.` wordmark, yellow `MAI 2026` tag, golden TOTAL slab |
| Buttons | `[F1] COPIER LIEN`, `[F2] PARTAGER`, `[F3] IMAGE` | `COPIER LE LIEN ▶`, `PARTAGER`, `IMAGE` |
| CTA chevrons | `▶` | `▶▶` |
| Dispatch grid (desktop) | 3 columns | 4 columns |
| Dispatch grid (tablet 640–1023 px) | 2 columns | 2 columns |
| Dispatch grid (mobile < 640 px) | 1 column | 1 column |

Both themes are **print-flat** by intent: no glow, no halo, no vignette, no soft shadows, no
transitions, no border-radius. Hover is hard color inversion only.

## Vest mapping (summary)

| Palette key | Vest | Role |
| --- | --- | --- |
| `yellow` | Jaune | **Intérimaire** — temp worker |
| `orange` | Orange | **Embauché** — CDI |
| `mixed` | Jaune + Orange (bicolore) | **Responsable** — chef d'équipe + responsable merged |

Salarié roll: random per draw, weighted `30 % intérim · 60 % embauché · 10 % responsable`.
Dispatch grid: real colleagues carry their fixed vest from the bank; only fictional intérim cards
are added when the `?n=<base62>` easter-egg query is present. Full model in
[`design/vest-roles.md`](./design/vest-roles.md).

---

## Theme · Terminal

A booted shell running `Pif.sh`. Monospace everywhere, phosphor green ground, yellow / orange
accent for the prime payload. Phosphor is **color**, not effect.

### Palette

Three palettes share the same green-black ground; only `hi` and `hi2` shift per vest.

**Tokens common to all three:**

| Token | Value | Use |
| --- | --- | --- |
| `bg` | `#06120a` | Window background |
| `panel` | `#0a1c12` | TitleBar bar, input field, dispatch card surface |
| `fg` | `#7df9a3` | Body text — phosphor green |
| `fgDim` | `#7df9a380` | 50%-alpha — labels, prompts |
| `fgFaint` | `#7df9a322` | 13%-alpha — borders, separators |
| `red` | `#ff7373` | Negative signal: `Qualité = 0€` |
| `ok` | `#7df9a3` | `[ OK ]` confirmation tag (same as `fg`) |

**Per-vest accent:**

| Vest | `hi` | `hi2` |
| --- | --- | --- |
| `yellow` — intérim | `#facc15` | `#facc15` |
| `orange` — embauché | `#fb923c` | `#fb923c` |
| `mixed` — responsable | `#facc15` | `#fb923c` |

In the bicolor variant, `hi` carries headlines / TOTAL; `hi2` carries bonus lines and the motif
border accent.

### Typography

Single family — `JetBrains Mono` (preferred), `IBM Plex Mono` fallback. No display family, no body
family.

| Use | Size (desktop / mobile) | Weight | Notes |
| --- | --- | --- | --- |
| Wordmark `PRIME / AU / PIF` | 50 / 38 | 700 | Stacked, leading 0.95, tracking 1 |
| Section headline `┃ RELEVÉ…` | 14 | 700 | Tracking 1 |
| Body / decomposition row | 12–13 | 400 | Tabular nums |
| Total amount (large) | 32 | 700 | Tabular nums |
| Function-key tag `[F1]` | 11 | 700 | Tracking 1, `nowrap` |
| Boot lines | 12 | 400 | `fgDim`, monospace |
| Window chrome `● Pif.sh` | 11 | 700 | Tracking 1, `hi` color |

### Signature components

- **TitleBar** — three columns: left `● Pif.sh` in `hi`, center current path, right window
  controls `─ □ ✕` in `fgDim`. Padding `8px 14px`, bottom border `1px solid fgFaint`,
  background `panel`. Pinned to top.

- **Path display** — reflects the route in `fgDim`:

  | Route | Path (desktop) | Path (mobile < 480 px) |
  | --- | --- | --- |
  | `/` | `~/pif` | `~/pif` |
  | `/<prenom>/<sigle>#<hash>` | `~/pif/<Prenom>/<SIGLE>#<hash>` | `~/.../<SIGLE>#<hash>` |
  | `/dispatch` | `~/pif/dispatch [root@<SIGLE>]` | `~/.../dispatch [root@<SIGLE>]` |
  | `/avertissement` | `~/pif/avertissement` | `~/pif/avertissement` |

  Mobile truncation: `~/...<final segment>` — drop intermediate segments, keep the final
  segment + any suffix.

- **Boot block (Home only)** — five fixed lines, dot-leaders, `[ OK ]` aligned right:

  ```text
  Loading kernel ........................ [ OK ]
  Mounting motifs.bank .................. [ OK ]
  Init random seed ...................... [ OK ]
  Loading colleagues.dat ................ [ OK ]
  Calibrating arbitrariness coefficient . [ OK ]
  ```

  Snap-in top-down on page load, ~120 ms between lines. Static after reveal.

- **Inline command echo** — before each dynamic flow (salarié roll, dispatch generation), the
  screen prints the supposed command + a few status lines. Non-negotiable signature element.

  ```text
  $ pif draw --user=GÉRARD --site=GXO
  Connecting to /dev/arbitrary ............. [ OK ]
  Drawing prime ............................ [ OK ]
  ```

  Same pattern for dispatch (the `--n` argument reflects the actual card count, not a fixed 20).

- **ASCII bars** — 16-cell horizontal bar of `━` (filled) and `─` (empty), used in decomposition
  rows and dispatch cards. Filled portion in row color, empty portion at 20 % opacity. Kept
  across all viewports as the Terminal signature; if they collapse beyond rescue at < 360 px,
  dropping them on mobile only is the acceptable fallback.

  ```text
  Production  ━━━━━━━━━━━─────  87€
  Qualité     ──────────────────   0€
  Sécurité    ━━━────────────  23€
  ```

- **Caret** — 7×12 px solid block, 1 s `steps(2) infinite` blink. Used in the input field, after
  every `$` prompt, and after the `_` underscore in the wordmark. **No `box-shadow` halo.**

- **Function-key buttons (sharing)** — terminal-style key shortcuts, `white-space: nowrap`:

  | Label | Style |
  | --- | --- |
  | `[F1] COPIER LIEN` | Filled — bg `hi`, text on `bg` |
  | `[F2] PARTAGER` | Outlined — `1px solid hi2`, text in `hi2` |
  | `[F3] IMAGE` | Outlined — `1px solid fg`, text in `fg` |

  Stacked vertically below 600 px, row above. `flex: 1` distributes evenly on desktop.

- **Primary CTA** — `TIRER MA PRIME` and `GÉNÉRER NOUVELLE DISTRIBUTION`. Wide, full-bleed, filled
  `hi`, dark text. Layout `flex / space-between`: chevron `▶` + label on the left, `↵` (return
  symbol) on the right.

  ```text
  ┃▶ TIRER MA PRIME                                           ↵┃
  ```

### Wireframes

**Home · desktop**

```text
┌────────────────────────────────────────────┐
│ ● Pif.sh       ~/pif            ─ □ ✕      │
├────────────────────────────────────────────┤
│ Loading kernel ........................ [OK]│
│ Mounting motifs.bank .................. [OK]│
│ Init random seed ...................... [OK]│
│ Loading colleagues.dat ................ [OK]│
│ Calibrating arbitrariness coefficient . [OK]│
│                                            │
│ PRIME                                      │
│ AU                                         │
│ PIF_                                       │   ← _ blinks (no halo)
│                                            │
│ $ Tirage mensuel arbitraire. 0 à 350 €.    │
│ $ Distribution à l'humeur du chef.         │
│                                            │
│ ▸ TON PRÉNOM (OPTIONNEL)                   │
│ ┌────────────────────────────────────────┐ │
│ │ $ Gérard▮                              │ │
│ └────────────────────────────────────────┘ │
│ ▸ GILET (OPTIONNEL)                        │
│ [Aléatoire][Intérim][Embauché][Resp.]      │
│ ┌────────────────────────────────────────┐ │
│ │ ▶ TIRER MA PRIME                    ↵  │ │   ← yellow filled
│ └────────────────────────────────────────┘ │
├────────────────────────────────────────────┤
│ PIF v0.0.1 — Prime Illusoire Fictive — …   │
└────────────────────────────────────────────┘
```

**Salarié result · desktop** (`/Gérard/GXO#k7M2x9`)

```text
┌──────────────────────────────────────────────┐
│ ● Pif.sh   ~/pif/Gérard/GXO#k7M2x9    ─ □ ✕  │
├──────────────────────────────────────────────┤
│ $ pif draw --user=GÉRARD --site=GXO          │
│ Connecting to /dev/arbitrary ............. [OK]│
│ Drawing prime ............................ [OK]│
│                                              │
│ ┃ RELEVÉ DE PRIME — MAI 2026                 │
│                                              │
│ salarié    GÉRARD                            │
│ société    GXO Logistics                     │
│ tirage     #k7M2x9                           │
│                                              │
│ ── DÉCOMPOSITION ──────────────              │
│ Production  ━━━━━━━━━━━─────  87€            │
│ Qualité     ──────────────────   0€  ← red   │
│ Sécurité    ━━━────────────  23€             │
│                                              │
│ ── BONUS ──────────────────────              │
│ ┌──────────────────────────────────────────┐ │
│ │ + Bonus surproduction              +50€  │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ = TOTAL                          160 €   │ │  ← yellow slab
│ └──────────────────────────────────────────┘ │
│                                              │
│ ── MOTIF ──────────────────────              │
│ ┃ « Pour avoir filmé tes palettes proprement.│
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ ▶ TIRER UNE AUTRE PRIME              ↵   │ │   ← yellow filled
│ └──────────────────────────────────────────┘ │
│                                              │
│ [F1] COPIER LIEN  [F2] PARTAGER  [F3] IMAGE  │
│                                              │
│ $ ▮                                          │
├──────────────────────────────────────────────┤
│ PIF v0.0.1 — Prime Insensée Fictive — …      │
└──────────────────────────────────────────────┘
```

**Dispatch · desktop** (3-column grid)

```text
┌──────────────────────────────────────────────────┐
│ ● Pif.sh   ~/pif/dispatch [root@TXR]    ─ □ ✕    │
├──────────────────────────────────────────────────┤
│ $ pif dispatch --site=TXR --n=N                  │
│ Generating distribution ........... [OK]         │
│                                                  │
│ ┃ DISTRIBUTION MENSUELLE                         │
│ Société TXR Logistics · N salariés · MAI 2026    │
│                                                  │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐           │   ← 3 cols
│ │ GÉRARD #01│ │ ROGER #02│ │ CAROLINE  │           │
│ │ Prod ━━━87│ │ Prod ──  0│ │ Prod ━━150│           │
│ │ Qual ──  0│ │ Qual ━━80│ │ Qual ──25 │           │
│ │ Sécu ─23 │ │ Sécu ━70 │ │ Sécu ─25 │           │
│ │ +bonus 50│ │           │ │ +bonus150│           │
│ │ TOTAL 160│ │ TOTAL 150│ │TOTAL 350 ★│           │   ← star = winner
│ │ « motif » │ │ « motif » │ │ « motif » │           │
│ └──────────┘ └──────────┘ └──────────┘           │
│ … (rows of 3, total card count = N)              │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ ▶ GÉNÉRER NOUVELLE DISTRIBUTION           ↵  │ │
│ └──────────────────────────────────────────────┘ │
│ $ ▮                                              │
├──────────────────────────────────────────────────┤
│ PIF v0.0.1 — Prime Injuste Fictive — …           │
└──────────────────────────────────────────────────┘
```

`N` = number of cards = real colleagues + optional fictional intérim (see
[`design/vest-roles.md`](./design/vest-roles.md)).

### Empty states

- **No bonus:** `(aucun — fais profil bas)` in `fgDim` instead of the boxed bonus row.
- **Qualité = 0:** the row's value and bar both render in `red`.
- **End of result block:** a final `$ ▮` prompt with blinking caret reasserts the terminal frame.

---

## Theme · Manifeste

A brutalist printed payroll poster — massive Archivo Black headlines, warm dark ground, beige
body text. The hard rule: **no white anywhere**. The hi-vis accent (yellow or orange) is the only
bright element on screen.

### Palette

Three palettes share the same warm dark ground; only `hi` and `hi2` shift per vest.

**Tokens common to all three:**

| Token | Value | Use |
| --- | --- | --- |
| `bg` | `#0e0e0f` (yellow / mixed) · `#0e0d0c` (orange) | Page background |
| `panel` | `#17171a` · `#1a1614` | Input field, dispatch card surface |
| `fg` | `#bdb6a8` | Body text — warm muted beige (NOT white) |
| `fgStrong` | `#d8cfbc` | Headlines — slightly brighter beige (still NOT white) |
| `fgDim` | `#7a746a` | Labels, footer text |
| `fgFaint` | `#33312d` | Borders, separators, empty-bar tracks |
| `red` | `#e37c5b` | Negative signal: `Qualité = 0€`, loser TOTAL |
| `inkOnHi` | `#0e0e0f` | Text color when sitting on a `hi` background |

The discipline: any text on the dark ground uses `fg`, `fgStrong`, `fgDim`, or `fgFaint` — never
`#ffffff`, never `#fff`, never near-white.

**Per-vest accent:**

| Vest | `hi` | `hi2` |
| --- | --- | --- |
| `yellow` — intérim | `#facc15` | `#facc15` |
| `orange` — embauché | `#fb923c` | `#fb923c` |
| `mixed` — responsable | `#facc15` | `#fb923c` |

### Typography

Three families coexist:

| Class | Family | Use |
| --- | --- | --- |
| `pif-display` | Archivo Black, Space Grotesk fallback | Wordmark, name, section title, TOTAL number, button label |
| `pif-mono` | JetBrains Mono, IBM Plex Mono fallback | Tags, labels, decomposition labels, footer, hash |
| `pif-body` | Inter, system-ui fallback | Quoted motif text |

| Use | Size (desktop / mobile) | Class | Notes |
| --- | --- | --- | --- |
| Hero wordmark `PRIME / AU` | 92 / 64 | `pif-display` | Tracking −2, leading 0.85 |
| Hero accent `PIF.` | 140 / 96 | `pif-display` | Tracking −4, `hi` color, leading 0.85 |
| Salarié first name | 40 | `pif-display` | Tracking −1, `fgStrong` |
| Logo lockup `PRIMEAUPIF` | 16 | `pif-display` | `AU` colored `hi` |
| TOTAL number | 80 / 64 | `pif-display` | Tracking −3, tabular nums, `inkOnHi` |
| Decomposition value | 24 | `pif-display` | Tabular nums |
| Section tag (`SALARIÉ`, `MOTIF`) | 10 | `pif-mono` | Tracking 2, `hi2` color |
| Decomposition label | 11 | `pif-mono` | Tracking 1, `fgDim`, uppercased |
| Quoted motif | 16 | `pif-body` | Italic, leading 1.4 |
| Hash / metadata | 11 | `pif-mono` | `fgDim` |

### Signature components

- **Top bar (Home)** — left `PIF v0.0.1` in `pif-mono`, `fgDim`, tracking 2; right `MAI 2026`
  yellow-filled tag, dark text, tracking 2. Bottom border `1px solid fgFaint`.

- **Hero wordmark (Home)** — three stacked blocks, left-aligned, the `PIF.` line in `hi` at
  140 px desktop / 96 mobile. The period is part of the wordmark. The combination of size,
  weight, tracking and color makes this the loudest object on screen.

  ```text
  PRIME
  AU
  PIF.    ← in hi
  ```

- **Pitch line (Home)** — single mono block, two short lines, `350 €` highlighted in `hi`:

  ```text
  Tirage mensuel arbitraire.
  0 à 350 €. Personne sait pourquoi.
  ```

  Note: `350 €` is the satirical maximum (200 € base + 150 € max bonus); the real-world cap is
  200 €.

- **Input field (Home)** — panel-colored block with a 3 px left border in `hi`. Pre-filled name in
  `pif-display` 22 px, `fgStrong`. Trailing yellow caret. No round corners, no shadow.

- **`RELEVÉ · MAI 26` tag (Salarié header)** — small filled yellow tag, top-right, tracking 2,
  weight 700, dark text. Identity marker of the salarié screen.

- **Salarié top block** — left-aligned hierarchy:

  ```text
  SALARIÉ                              ← pif-mono, 10, hi2
  GÉRARD                               ← pif-display, 40, fgStrong
  SOCIÉTÉ GXO Logistics · #k7M2x9      ← pif-mono, 11, fgDim, single line
  ```

- **Decomposition rows** — each row identical:

  ```text
  PRODUCTION                                    87€
  ─────────────────────────────────────────
  [█████████████████░░░░░░░░░░░░░░░░░░░░]    ← bar at 87/200
  ```

  Top of row: `1px solid fgFaint` separator. Inline flex: label left in `pif-mono`, value right
  in `pif-display`. 4 px tall bar below, fills `value/200` of the track in row color
  (`fgStrong` normally, `red` when value is 0).

- **Bonus pill** — when `bonus > 0`, a 3-px-left-border `hi2`-tinted block; background `hi2 @ 8%`.
  When `bonus = 0`, the block is **omitted entirely** (Manifeste refuses to display zero here).

  ```text
  ┃ BONUS SURPRODUCTION                        +50€
  ```

- **TOTAL slab** — full-bleed yellow block, the visual punchline:

  ```text
  ┌──────────────────────────────────────────────┐
  │ TOTAL                                        │
  │ NET — MAI 2026                       160€    │ ← 64–80 px, dark on yellow
  └──────────────────────────────────────────────┘
  ```

  Left: stacked tags `TOTAL` (10 px, tracking 3) and `NET — MAI 2026` (9 px, tracking 1). Right:
  the number in `pif-display` 80 / 64, tracking −3, `inkOnHi`.

- **Motif block** — `MOTIF` tag in `hi2` mono caps; quoted line in Inter italic 16, `fgStrong`,
  with a `2px solid hi2` left border. The Inter italic is the only italic in the theme.

- **Sharing buttons** — three-button row, `white-space: nowrap`:

  | Order | Label | Style |
  | --- | --- | --- |
  | 1 | `COPIER LE LIEN ▶` | Filled — bg `hi`, text `inkOnHi`, weight 700 |
  | 2 | `PARTAGER` | Outlined — `1.5px solid fgDim`, text `fg` |
  | 3 | `IMAGE` | Outlined — `1.5px solid fgDim`, text `fg` |

  All in `pif-mono` 11, tracking 1.5. Stacked below 600 px, row above.

- **Primary CTA** — full-bleed, filled `hi`, `pif-display`, dark text, `▶▶` chevron pair on the
  right (Manifeste signature; Terminal uses single `▶`):

  ```text
  ┃ TIRER MA PRIME                                          ▶▶ ┃
  ```

  Sizes 28 desktop / 22 mobile, tracking 1.

- **Caret block** — 2 × 22 px solid yellow vertical bar, blinking via `pifBlink 1s steps(2)
  infinite`. Sits at the trailing edge of the input field's content.

### Wireframes

**Home · desktop**

```text
┌────────────────────────────────────────────┐
│ PIF v0.0.1                    [MAI 2026]   │
├────────────────────────────────────────────┤
│                                            │
│ PRIME                                      │
│ AU                                         │
│ PIF.                                       │   ← 140 px, yellow
│                                            │
│ Tirage mensuel arbitraire.                 │
│ 0 à 350 €. Personne sait pourquoi.         │
│                                            │
│ ▸ TON PRÉNOM (OPTIONNEL)                   │
│ ┃ GÉRARD▮                                  │   ← 3 px yellow left bar
│                                            │
│ ▸ GILET                                    │
│ [Aléatoire][Intérim][Embauché][Resp.]      │
│                                            │
│ ┌────────────────────────────────────────┐ │
│ │ TIRER MA PRIME                      ▶▶ │ │   ← yellow filled, 28 px
│ └────────────────────────────────────────┘ │
│                                            │
├────────────────────────────────────────────┤
│ PIF v0.0.1 — Prime Imaginaire Fictive — …  │
└────────────────────────────────────────────┘
```

**Salarié result · desktop**

```text
┌──────────────────────────────────────────────┐
│ PRIMEAUPIF                  [RELEVÉ · MAI 26]│
├──────────────────────────────────────────────┤
│ SALARIÉ                                      │   ← yellow tag, 10 px
│ GÉRARD                                       │   ← 40 px display
│ SOCIÉTÉ GXO Logistics · #k7M2x9              │
│                                              │
│ DÉCOMPOSITION                                │
│ ─────────────────────────────────            │
│ PRODUCTION                          87€      │
│ [█████████░░░░░░░░░░░░░░░░░░░░]              │
│ ─────────────────────────────────            │
│ QUALITÉ                              0€  red │
│ [░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]              │
│ ─────────────────────────────────            │
│ SÉCURITÉ                            23€      │
│ [██░░░░░░░░░░░░░░░░░░░░░░░░░░░░]              │
│                                              │
│ ┃ BONUS SURPRODUCTION              +50€      │   ← yellow pill
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ TOTAL                                    │ │
│ │ NET — MAI 2026                  160€     │ │   ← yellow slab, 80 px
│ └──────────────────────────────────────────┘ │
│                                              │
│ MOTIF                                        │
│ ┃ « Pour avoir filmé tes palettes proprement.│
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ TIRER UNE AUTRE PRIME                ▶▶  │ │   ← yellow filled
│ └──────────────────────────────────────────┘ │
│                                              │
│ [COPIER LE LIEN ▶] [PARTAGER]  [IMAGE]       │
├──────────────────────────────────────────────┤
│ PIF v0.0.1 — Prime Injuste Fictive — …       │
└──────────────────────────────────────────────┘
```

**Dispatch · desktop** (4-column grid)

```text
┌──────────────────────────────────────────────────┐
│ DISPATCH  TXR Logistics      N SALARIÉS · MAI    │
├──────────────────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │   ← 4 cols
│ │GÉRARD│ │ROGER │ │CAROLI│ │DJAMEL│              │
│ │  #01 │ │  #02 │ │  #03 │ │  #04 │              │
│ │      │ │      │ │      │ │      │              │
│ │Prod 87│ │Prod 0│ │Prod15│ │Prod 5│              │
│ │Qual 0│ │Qual80│ │Qual25│ │Qual40│              │
│ │Sécu23│ │Sécu70│ │Sécu25│ │Sécu30│              │
│ │+B  50│ │      │ │+B 150│ │      │              │
│ │      │ │      │ │      │ │      │              │
│ │TOTAL │ │TOTAL │ │TOTAL │ │TOTAL │              │
│ │  160€│ │  150€│ │  350€│ │   75€│              │
│ │      │ │      │ │      │ │      │              │
│ │« mot »│ │« mot »│ │« mot »│ │« mot »│              │
│ └──────┘ └──────┘ └──────┘ └──────┘              │
│ … (total card count = N)                         │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ GÉNÉRER NOUVELLE DISTRIBUTION             ▶▶ │ │   ← yellow filled
│ └──────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────┤
│ PIF v0.0.1 — Prime Injuste Fictive — …           │
└──────────────────────────────────────────────────┘
```

Card top-border accent (`cardAccent`) — driven by the card's vest, **not random**:

| Condition | Colour | Reading |
| --- | --- | --- |
| `total >= 250` | `hi` | Winner — yellow band |
| Bonus > 0 | `hi2` | Bonus signaled |
| Otherwise | `fgFaint` | Mute |

Total color: `hi` if `total >= 250`, `red` if `total === 0`, `fgStrong` otherwise. When winner,
the card background tints `hi @ 6%` — subtle wash, not a full slab.

### Empty states

- **No bonus:** Bonus pill is omitted entirely.
- **Qualité = 0:** Row value renders in `red`. Row label and bar track unaffected.
- **Loser TOTAL (= 0):** Card-level total renders in `red` only — no other styling change.

---

## Mobile (both themes)

Single-column flow. Sizes scale per the typography tables above. CTA stays full-bleed and tall
(≥ 44 px touch target). Sharing buttons stack vertically below 600 px.

The Terminal title-bar path is smart-truncated:

```text
● Pif.sh   ~/.../GXO#k7M2x9    ─ □ ✕
● Pif.sh   ~/.../dispatch [root@TXR]    ─ □ ✕
```

The Manifeste `RELEVÉ · MAI 26` tag stays visible above the fold on the salarié screen — it
identifies the screen.

---

## Common chrome

### Theme switcher

A discreet toggle in the header top-right area, present on every screen of both themes.
Persisted to `localStorage` under `pif:theme`; default on first visit is **Terminal**.

The label shows the _alternative_ theme — clicking it switches:

- In Terminal: `[Manifeste ▶]` rendered in `pif-mono`, `fgDim`, tracking 1, no border. Sits to
  the left of the window controls `─ □ ✕` in the TitleBar (or replaces them on narrow viewports).
- In Manifeste: `[Terminal ▶]` rendered in `pif-mono`, 11, `fgDim`, tracking 1. Sits in the top
  bar, between `PIF v0.0.1` (left) and the `MAI 2026` tag (right) on Home, or aligned right on
  other screens.

Hover: hard color inversion to the theme's accent, no transition. Click: the theme swaps
instantly (snap-cut, no fade); the result/dispatch state in memory is preserved — only the
chrome changes.

### Vest selector (Home only)

A 4-option segment control sitting **below the input field** on the Home page, present in both
themes. Options: `Aléatoire` (default) · `Intérim` · `Embauché` · `Responsable`.

- **Terminal:** rendered as a row of mono pseudo-buttons `[Aléatoire][Intérim][Embauché][Resp.]`.
  Selected option fills with `hi`, dark text; unselected sits in `fgDim` on `panel`, `1px solid
  fgFaint` between cells. Compact label `Resp.` truncates `Responsable` to fit.
- **Manifeste:** same row, but cells are `pif-mono` 10, tracking 2, padded `8px 12px`. Selected
  fills with `hi`, `inkOnHi` text; unselected has `1px solid fgFaint` border, `fgDim` text.
  Label `Resp.` is acceptable on narrow viewports; full `Responsable` on desktop ≥ 480 px.

Selecting a vest forces the next roll to that class. The accent palette of the result card
follows the rolled (or selected) vest. When opening a permalink, the selector reflects the
encoded vest (clicking it does not re-roll until the user clicks `TIRER UNE AUTRE PRIME`).

Touch targets ≥ 44 × 44 px on mobile; segments stack 2 × 2 below 360 px if a row of 4 cannot fit.

### Footer

Identical structure across all 8 layouts (4 screens × 2 themes), driven by a shared
`PifFooter` component:

```text
PIF v0.0.1 — Prime [Illusoire|Imaginaire|Insensée|Injuste] Fictive — PIF Is Fake — /avertissement
```

The bracketed adjective rotates every 4–5 s with a snap-cut typewriter effect, monospace, hi-vis
yellow (or the theme's accent). The `/avertissement` segment is rendered as a discreet link in
`fgDim`, underline on hover, hard color invert.

The footer is **always in normal flow** — anchored at the end of the frame's flex column. Never
absolutely positioned.

| Viewport | Behavior |
| --- | --- |
| Desktop (≥ 480 px content) | Single line, justify center, no wrap |
| Mobile (< 480 px content) | Two centered lines |

Mobile layout:

```text
        PIF v0.0.1 — Prime Illusoire Fictive
        PIF Is Fake — /avertissement
```

If the lines still overflow on the narrowest devices, drop the `Prime [...] Fictive` segment from
line 1 — keep `PIF v0.0.1` alone on line 1, and `PIF Is Fake — /avertissement` on line 2. The
rotating adjective is sacrificed before the link.

### Loading states

Per `MVP.md`: **4 s** on Home → result, **6 s** on Dispatch → grid, **1 s** on permalink replay.
Both themes pull intermediate text from the `loading-steps` bank (salarié picks 2 entries,
dispatch picks 3). Visual treatment:

- **Terminal:** monospace `$` prompt followed by the step, dim color, with a `[ OK ]` tag added
  at the end of each step before moving on. The Terminal-specific framing lines (`Connecting to
  /dev/arbitrary`, `Drawing prime`, `Generating distribution`) are **theme chrome** — they
  appear in addition to the bank-drawn steps and don't consume the bank-entry budget.
- **Manifeste:** centered `pif-mono`, `fgDim`, no `$` prompt, no `[ OK ]` — just the line
  snap-cut in/out.

### Animations

- **Snap-cut everywhere** — no smooth fades, no transitions, no easing curves.
- **Boot reveal (Terminal)** — `[ OK ]` lines appear top-down, ~120 ms between lines.
- **Caret blink** — 1 s `steps(2) infinite`, plain on/off, no halo.
- **Total slab reveal (Manifeste)** — slab swaps in cleanly; the eye is caught by the contrast
  jump from beige to yellow.
- **Hover** — hard color inversion. On a `hi`-filled button, hover swaps `bg` ↔ `hi`. No
  transition.
- **Bar fill** — when a decomposition row reveals, the colored bar may slide left-to-right inside
  its track. Snap-cut is acceptable for v1.

### Edge cases

Behaviours covered in `MVP.md` (input validation, hash failure, Web Share fallback, image-gen
failure, network failure, dispatch with missing colleagues bank) apply to both themes. No
theme-specific divergence required at v1.
