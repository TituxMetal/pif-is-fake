# `/avertissement` — Disclaimer Page

**Status:** locked during the design-pass brainstorm. Single-page integrated disclaimer with a
3-sentence motivation block.

## Route

`GET /avertissement` — served by Hono like any other page route. Renders inside the same chrome
as the rest of the application (Title bar / top bar, footer). Single-column body, prose-width
capped at ~640 px on desktop, full width minus padding on mobile.

The page is reached only via the small `/avertissement` link in the footer (right side on
desktop, second line on mobile). No banner, no modal on first visit.

## Page copy (locked)

> **AVERTISSEMENT**
>
> PIF est une parodie. Les sociétés sont des sigles tirés au sort. Les sommes, les motifs et les
> distributions sortent d'un algorithme qui ne sait rien de toi, de ton site, ni de ton boulot.
>
> Toute ressemblance avec un système de primes existant serait le pur effet du hasard.
>
> Les prénoms qui apparaissent dans l'application peuvent être réels — saisis par le visiteur ou
> choisis par l'auteur. Mais aucun chiffre, aucun motif, aucune répartition rattachée à un
> prénom ne décrit le travail ou la rémunération réelle de qui que ce soit. Tout est tiré au
> sort.
>
> ---
>
> PIF est né d'une frustration : voir un système d'évaluation qui ne récompense pas ce qu'il
> prétend récompenser. Le problème n'est pas individuel — c'est la mécanique qui crée le piège.
> Le système peut être mauvais sans qu'aucun de ceux qui le font tourner ne le soit.

The horizontal rule (`---`) is part of the layout — it separates the legal-ish disclaimer
(paragraphs 1–3) from the personal motivation (the 3-sentence closing block).

## Rendering per theme

### Terminal

- Title bar shows `● Pif.sh   ~/pif/avertissement   ─ □ ✕`
- Heading `AVERTISSEMENT` rendered as a `┃ AVERTISSEMENT` mono section title in `hi`
- Paragraphs in `fg`, line height 1.55
- The `---` separator renders as `── ─────────────────────`
- The 3-sentence closing block rendered with a `>` prefix and a space on each paragraph (mono
  blockquote feel), `fgDim` color
- Final line at the bottom: `$ ▮` (blinking caret), as on every other Terminal screen

### Manifeste

- Top bar shows `PRIMEAUPIF   [AVERTISSEMENT]` (the right-side tag carries the section)
- Heading `AVERTISSEMENT` in `pif-mono`, 10, tracking 2, `hi2` (same treatment as `SALARIÉ`,
  `MOTIF` tags)
- Paragraphs in `pif-body` Inter, 16, leading 1.55, `fgStrong`
- The `---` separator renders as a `1px solid fgFaint` rule
- The closing block keeps the `pif-body` style; the rule above it is the only chrome

## Footer link placement

The footer (`PifFooter` in `shared.jsx`) gets a small terminal link to the disclaimer.

### Desktop

Single line, justify center:

```text
PIF v0.0.1 — Prime Illusoire Fictive — PIF Is Fake — /avertissement
```

The `/avertissement` segment is rendered as a link (`pif-mono`, `fgDim`, underline on hover, hard
color invert).

### Mobile

Two centered lines:

```text
        PIF v0.0.1 — Prime Illusoire Fictive
        PIF Is Fake — /avertissement
```

If the lines still overflow on the narrowest devices, drop the `Prime [...] Fictive` segment
from line 1 — keep `PIF v0.0.1` alone on line 1, and the full `PIF Is Fake — /avertissement` on
line 2. The rotating adjective is sacrificed before the link.

## What this page is NOT

- **Not a modal** — never shown unprompted.
- **Not an interstitial** — no first-visit banner, no cookie wall.
- **Not a robots.txt entry** — indexable, but practically discoverable only via the footer link.
- **Not a legal document** — the language is satirical-disclaimer, not legalese. There's no
  "mentions légales" section, no T&Cs, no privacy policy in v1 (PIF stores nothing).

## Rationale

The disclaimer's purpose is twofold:

1. **Social cover.** If a colleague or supervisor asks "is this aimed at me?", the page provides
   a clear, honest answer: the algorithm doesn't know you, and the prénoms/numbers shown aren't
   real attributions. The reader can trust this without needing legal training.
2. **Authorial honesty.** The 3-sentence motivation block names the actual target — a system,
   not people — without dishonestly denying that the people who run that system exist. The
   phrasing "le système peut être mauvais sans qu'aucun de ceux qui le font tourner ne le soit"
   leaves room to disagree with a practice while respecting the people performing it.

The page lives at one URL because the two halves reinforce each other: legal cover sits on top of
honest motivation. Splitting them would weaken both.
