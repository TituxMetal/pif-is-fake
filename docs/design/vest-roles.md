# Vest → Role Mapping, Dispatch Model

**Status:** canonical. Companion to [`../MVP.md`](../MVP.md) and [`../design.md`](../design.md).

In real warehouses, the color of a worker's hi-vis vest signals their employment status. Anyone
who has worked a quai knows it instantly: yellow vest = temp, orange vest = permanent, bicolor =
team lead. The vest is the most visible class marker on the floor.

PrimeAuPif uses this code as a satirical lever. The accent color of a generated prime card
(yellow, orange, or yellow-and-orange) tells the visitor — without a single word — which class
the displayed worker belongs to. Once the convention clicks, the dispatch view becomes legible at
a glance: orange cards are the embauchés, yellow cards stand out (intérim), and the rare bicolor
card belongs to the responsable (the one taking the biggest bonus).

## The mapping

| Palette key | Vest color | Role |
| --- | --- | --- |
| `yellow` | Jaune | **Intérimaire** — temp worker hired by the agency |
| `orange` | Orange | **Embauché** — CDI, permanent on the company books |
| `mixed` | Jaune + Orange (bicolore) | **Responsable** — chef d'équipe + responsable merged |

The "Responsable" bucket merges chef d'équipe and responsable de site. In real life they're
distinct (the chef transmits, the responsable decides), but for PIF's satirical purpose the
visual signal is one and the same: the bicolor vest is the marker of someone with discretionary
authority over the prime.

## Where vests appear in the UI

### Salarié view — random per roll

The visitor's prime is rolled with one of the three vests, drawn from a weighted distribution:

| Vest | Weight | Reading |
| --- | --- | --- |
| Orange — embauché | 60 % | Majority of the workforce |
| Jaune — intérim | 30 % | Substantial minority |
| Mixte — responsable | 10 % | Rare — one or two per team |

The vest is part of the rolled state and is encoded in the permalink hash so a shared URL
reproduces the same vest.

The Home page exposes a **vest selector** below the input field — four options:

| Option | Behavior |
| --- | --- |
| **Aléatoire** (default) | Roll a random vest per the weights above |
| **Intérim** | Force vest = `00` (yellow palette) |
| **Embauché** | Force vest = `01` (orange palette) |
| **Responsable** | Force vest = `10` (mixed palette) |

The selector is purely an input — the result card always renders the rolled vest, whether
random or chosen. When the visitor opens a permalink, the selector reflects the encoded vest
(read-only feel; clicking it would re-roll).

### Dispatch view — fixed real names + opaque intérim count

**No random vest assignment here.** The dispatch grid renders:

1. **Real colleagues** — every entry from the `colleagues` bank, each with a **fixed vest**
   recorded alongside the name (`embauche` or `responsable`). The bank is curated by the project
   author who knows the actual vest of each named colleague. Intérim status is **never** pinned
   to a real name (turnover is high, the author doesn't know all of them, and pinning "intérim"
   on a named real person would feel like accusation).
2. **Optional fictional intérim cards** — controlled by an opaque query parameter
   `?n=<base62>`, undocumented in the UI. When present, N additional cards are rendered using
   first names drawn from the `generic-names` bank, all assigned the yellow (intérim) vest.
   The intérim cards complete the visual representation of the warehouse class composition
   without naming any real intérim worker.

#### The `?n=<base62>` easter egg

| Aspect | Value |
| --- | --- |
| Param name | `n` |
| Encoding | base62, single character |
| Range | 0 to 20 |
| Visibility in UI | None — no field, no toggle, no menu reference |
| Discoverability | Source code or this documentation |
| Default behavior (no param) | 0 intérim cards — only real colleagues are shown |

Encoding examples:

| `n` | URL |
| --- | --- |
| 0 | `/dispatch` (param omitted) or `/dispatch?n=0` |
| 7 | `/dispatch?n=7` |
| 10 | `/dispatch?n=A` |
| 15 | `/dispatch?n=F` |
| 20 | `/dispatch?n=K` |

A glance at the URL bar yields no obvious meaning. To know what `?n=F` means, the visitor needs
the docs or the source. Easter-egg by design.

#### Cap and validation

- `n` is clamped to `[0, 20]`.
- Values above 20 are silently capped (no error displayed).
- A non-decodable value (`?n=` empty, `?n=zzz`, etc.) is silently treated as 0.
- Behaviour matches the broader "silent fallback" stance of [`../MVP.md`](../MVP.md).

#### Card count and ordering

- Total cards in the grid: `len(real colleagues) + n_interim` (real bank carries ≈ 20 entries;
  with `n=20`, max ≈ 40 cards).
- All cards (real + fictional) are **shuffled at every generation** — no class grouping.
- Cards display in random order; both real names and fictional intérim names appear
  interleaved.
- Card position is **not** sticky across regenerations.
- Generation cost: trivial — even at 40 cards, JS random + amount + motif × 40 is
  sub-millisecond.

#### Re-roll behavior

Each click on `GÉNÉRER NOUVELLE DISTRIBUTION` triggers:

- Re-draw the N fictional first names from `generic-names`
- Re-roll all primes (real + fictional) per the generation rules in [`../MVP.md`](../MVP.md)
- Re-roll all motifs
- Re-shuffle card positions
- **Keep fixed:** the list of real names and their vests

### Permalinks (salarié only)

Permalinks reproduce a salarié roll exactly, including the vest. The dispatch view has no
permalink (no sharing affordance — see [`../MVP.md`](../MVP.md)).

## Hash encoding — vest field

[`../MVP.md`](../MVP.md) holds the canonical 35-bit hash table. The detail relevant to vest
specifically: 2 bits, 4 codepoints, 3 used:

| Codepoint | Meaning |
| --- | --- |
| `00` | intérim |
| `01` | embauché |
| `10` | responsable |
| `11` | reserved (treat as invalid hash → silent fallback) |

Field order in the pack: `[ Production | Qualité | Sécurité | Bonus | Vest | Motif ]`. Vest is
placed **before** Motif because the motif bank is the most likely field to grow (and to need an
extra bit one day); pinning Vest before Motif fixes its bit slot.

Headroom: 2³⁵ = 34 359 738 368 vs 62⁶ = 56 800 235 584 → ~22 billion combinations of free space
for future fields without growing the URL.
