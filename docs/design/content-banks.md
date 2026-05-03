# Content Banks — First Draft

**Status:** draft for v1. Companion to [`../MVP.md`](../MVP.md) (specification) and
[`vest-roles.md`](./vest-roles.md) (dispatch model). The initial entries of the motif and
loading-step banks were drafted during the design-pass brainstorm.

`MVP.md` sets the targets:

- **Motifs:** 50–100 entries, ~70% direct/warehouse, ~30% absurd/everyday, no corporate-cadres
  jargon
- **Loading steps:** 20–30 entries, same tonal range
- **Colleagues:** ~20 first names, no surnames, no roles
- **Generic names:** ~50 common French first names (fallback in salarié view)

Updated structure for v1:

- The `colleagues` bank carries a **vest tag per entry** — see the dispatch model.
- The `generic-names` bank serves **two purposes** — input fallback in salarié view, AND the
  fictional intérim pool for the `?n=<base62>` easter egg in dispatch view.

## Motifs (target ≈ 50–100)

### Initial seed (15 entries)

```text
1.  Pour avoir filmé tes palettes proprement.
2.  Parce que ton chariot a fait du bruit.
3.  Bonus — t'as bien fait de râler.
4.  Pour avoir ripé au bon quai.
5.  Pour ta poignée de main au chef d'équipe.
6.  Tu as scanné dans le bon sens.
7.  Pour la pause café écourtée du 12.
8.  Parce que t'étais là à 4h57.
9.  Pour avoir refermé la grille du quai 3.
10. T'as pas bronché quand le chrono a sauté.
11. Pour la pile bien droite, allée centrale.
12. Parce que t'as pris le créneau personne voulait.
13. Pour avoir prêté ton transpalette sans soupirer.
14. Tu as su disparaître avant l'audit.
15. Pour ton silence à la dernière réunion.
```

These all sit inside the ~70% direct/warehouse band requested by `MVP.md`. Tonal landmarks worth
preserving in the rest of the bank:

- **Hypocrisy of metric performance** — entries like #1 (filmer proprement), #6 (scanner dans le
  bon sens), #11 (pile bien droite) reward *appearance* of doing the work, not the work itself.
  This is the central satirical mechanic.
- **Time-stamp sycophancy** — #8 (4h57), #7 (pause écourtée du 12), #10 (chrono sauté) reward
  visible early arrival or visibly cut breaks.
- **Manager-pleasing** — #2 (chariot bruyant — visible), #5 (poignée de main), #15 (silence en
  réunion) — keeping the chef happy via theater.
- **Quiet co-optation** — #14 (disparaître avant l'audit) — being absent at the right moment.
- **Active negotiation** — #3 (râler), #12 (créneau personne voulait), #13 (transpalette sans
  soupirer) — visible willingness to absorb friction.

### Missing categories to expand

Aim for ~70 motifs total. Slots to fill:

| Theme bucket | Target count | Notes |
| --- | --- | --- |
| Filmage / palettes (existing #1) | 6–8 | Vary size, alley, time of day |
| Quai / ripage / camions | 6–8 | "Pour avoir tenu le quai 5 sans broncher" |
| Chariot / transpalette | 6–8 | Charge, retour, prêt, panne |
| Préparation de commandes / scan | 6–8 | Cadence, erreur évitée, double-scan |
| Heures / horaires / pauses | 6–8 | Arrivée, départ, créneau, week-end |
| Réunions / audits / chefs | 4–6 | Manager-pleasing variants |
| Sécurité / EPI | 4–6 | Casque, chaussures, gilet bien porté |
| Absurde / quotidien (≈30%) | 8–12 | Météo, café, anniv collègue, ascenseur en panne |
| **Total target** | **≈ 60–70** | |

### Tonal red flags (stay out)

- No corporate-cadres vocabulary: avoid "synergie", "ROI", "alignement", "pilotage", "kpis",
  "sprint", "process". The bank speaks the warehouse, not the open-space.
- No anglicisms beyond what a real warehouse uses (`scan`, `quai` are fine; `meeting`, `feedback`
  are not).
- No mentions of identifiable real people, real companies (other than the trigger sigles already
  defined), or real sites.
- No motif that punches down at named individuals. The system is the target.

## Loading steps (target ≈ 20–30)

### Initial seed (10 entries)

```text
1.  Calcul des cadences…
2.  Pondération arbitraire en cours…
3.  Lecture du carnet du chef d'équipe…
4.  Détection des préférences…
5.  Réajustement après-pause…
6.  Application du coefficient sympathie…
7.  Vérification du quai d'embarquement…
8.  Comptage des palettes filmées…
9.  Consultation des notes manuscrites…
10. Arrondi à la défaveur du salarié…
```

All terminate with `…` (single ellipsis character `…`) — preserve this convention. They double as
system-pretense (sounds like a real backend operation) and satire (the operation is arbitrary or
hostile).

### Slots to fill

Need ~15 more entries. Tonal mix to extend:

| Bucket | Target | Examples to write |
| --- | --- | --- |
| Mock backend ops | 4–5 | "Synchronisation avec /dev/arbitrary…", "Hash en cours…" |
| Manager-discretion narration | 4–5 | "Évaluation de l'humeur du chef…", "Vérif tableau Excel…" |
| Punchy absurd | 3–4 | "Distribution à la tête du client…" |
| Direct allusions (palettes, quai, scan) | 3–4 | "Recomptage des heures sup invisibles…" |

The Terminal theme renders these as `$ <step> ........ [ OK ]`. The Manifeste theme renders them
as plain centered mono text. Both flows use the same bank.

## Colleagues — structure changes

### New shape

The `colleagues` bank entries are **no longer plain strings**. Each entry is an object carrying
the name and the worker's vest:

```ts
type Vest = "embauche" | "responsable"

type Colleague = {
  name: string
  vest: Vest
}

const colleagues: Colleague[] = [
  { name: "GÉRARD", vest: "embauche" },
  { name: "ROGER", vest: "responsable" },
  // ...
]
```

Two reasons:

1. **Dispatch model.** Real colleague cards display with a fixed vest accent, not a random one.
   The vest is data, not styling.
2. **Privacy.** No real colleague is ever assigned the `interim` vest. Intérim cards in the
   dispatch view come from the `generic-names` bank exclusively, only when the easter-egg query
   param is present.

### Curating the vest field

Vest values for real names are filled in by the project author at content-bank-write time. Only
two values are valid: `embauche` and `responsable`. The author knows the real-life status of
each named colleague.

If a real colleague's status is uncertain (new hire, status change, etc.), default to `embauche`.

### Initial seed (20 entries)

Names are stored in **normal case** (proper capitalization). The themes apply uppercase via CSS
(`text-transform: uppercase`) at render time — keeping the data clean lets us also display
mixed-case versions in the future (e.g. screen reader output, an export file) without losing
the original spelling.

```text
Gérard, Roger, Caroline, Djamel, Mireille,
Kevin, Fatima, Christophe, Jonathan, Sandrine,
Moussa, Patrick, Aurélie, Stéphane, Nadia,
Bruno, Céline, Mehdi, Josiane, Didier
```

The vest values are **TBD by the project author**. At implementation time, fill them in based
on the real-life mapping. Default to `embauche` for any name whose status the author is unsure
about.

Strengths to preserve:

- French logistics demographic mix — generations and origins coexist
- No surnames, no titles — `MVP.md` rule honored

### Replacement candidates

If 20 entries feels short or any name doesn't sit right, swap-ins ready:

```text
Sylvie, Jean-Marc, Abdel, Karine, Rachid,
Thierry, Dominique, Muriel, Franck, Nathalie
```

(Pure suggestions — discard or replace freely.)

## Generic names (target ≈ 50)

**Not yet drafted.** No initial seed — this bank carries **two roles**:

1. Salarié-view fallback when the input field is left empty (per `MVP.md`)
2. **Pool of fictional intérim names** in the dispatch view when `?n=<base62>` is present (see
   [`vest-roles.md`](./vest-roles.md))

Both roles draw from the same flat `string[]`. No vest tag — these names are always fictional and
always rendered with the yellow (intérim) vest in the dispatch context.

### Sourcing approach

A balanced French first-name pool, mixing:

- Common contemporary first names (Léa, Hugo, Emma, Noah, Lola)
- Common 1970–1990s first names (Sébastien, Aurélie, Cédric, Sandrine, Stéphane)
- Common 1990–2010s first names (Camille, Maxime, Manon, Théo, Léa)
- French first names from the broader cultural mix common in logistics (Karim, Yasmine, Adel,
  Sofia, Inès)

Avoid:

- Names that overlap heavily with the colleagues bank (the two banks should feel distinct)
- Compound or hyphenated names that wreck the URL slug after sanitization (the 24-char limit
  per `MVP.md` allows them, but keep them rare)
- Identifiably-foreign names not commonly held in France

### To do at implementation

Generate 50 entries during the first content pass. The bank has no satirical content — it's pure
input fallback / intérim pool — so the bar is just "feels like it could be the next person who
hits the page".

## Bonus line labels (per `MVP.md`)

Already pinned:

| Bonus value | Label |
| --- | --- |
| `+50€` | Bonus surproduction |
| `+100€` | Bonus négocié |
| `+150€` | Bonus — t'as bien fait de râler |

## Trigger sigles (per `MVP.md`)

Pinned in [`../MVP.md`](../MVP.md):

```text
GXO, DHL, UPS, FDX, GLS, XPO
```

When a salarié roll lands one of these, the temporary dispatch link surfaces below the result
(see the salarié view flow in [`../MVP.md`](../MVP.md)).

Display format in the UI: `<SIGLE> Logistics` — for both trigger sigles and random sigles. The
suffix is display-only, never present in the URL.

## Rotating footer adjectives (per `MVP.md`)

Pinned in [`../MVP.md`](../MVP.md):

```text
Illusoire, Imaginaire, Insensée, Injuste
```

Footer template: `PIF v0.0.1 — Prime [Illusoire|Imaginaire|Insensée|Injuste] Fictive — PIF Is Fake`.

## Versioning

These banks are **static and versioned content** per `MVP.md` ("no runtime AI generation of
motifs"). They should ship in the bundle as TypeScript modules, not be fetched at runtime. The
project's `frontend-architecture` skill decides exact file location and naming.
