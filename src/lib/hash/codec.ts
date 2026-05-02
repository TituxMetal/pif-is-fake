import type { Vest } from '~/types/bank.types'
import type { Bonus, Decomposition, Roll } from '~/types/roll.types'

const HASH_LENGTH = 6
const RADIX = 62

const ZERO_CODE = 48
const NINE_CODE = 57
const UPPER_A_CODE = 65
const UPPER_Z_CODE = 90
const LOWER_A_CODE = 97
const LOWER_Z_CODE = 122

const BONUS_VALUES: readonly Bonus[] = [0, 50, 100, 150]
const VEST_VALUES: readonly Vest[] = ['interim', 'embauche', 'responsable']

const indexToBase62 = (idx: number): string => {
  if (idx < 10) return String.fromCharCode(ZERO_CODE + idx)
  if (idx < 36) return String.fromCharCode(UPPER_A_CODE + (idx - 10))

  return String.fromCharCode(LOWER_A_CODE + (idx - 36))
}

const base62ToIndex = (char: string): number | null => {
  if (char.length !== 1) return null

  const code = char.charCodeAt(0)

  if (code >= ZERO_CODE && code <= NINE_CODE) return code - ZERO_CODE
  if (code >= UPPER_A_CODE && code <= UPPER_Z_CODE) return code - UPPER_A_CODE + 10
  if (code >= LOWER_A_CODE && code <= LOWER_Z_CODE) return code - LOWER_A_CODE + 36

  return null
}

export const encodeRollHash = (roll: Roll): string => {
  const { production, qualite, securite } = roll.decomposition
  const bonusCode = BONUS_VALUES.indexOf(roll.bonus)
  const vestCode = VEST_VALUES.indexOf(roll.vest)

  const packed =
    production * 2 ** 27 +
    qualite * 2 ** 19 +
    securite * 2 ** 11 +
    bonusCode * 2 ** 9 +
    vestCode * 2 ** 7 +
    roll.motifIndex

  let n = packed

  const chars: string[] = []

  for (let i = 0; i < HASH_LENGTH; i++) {
    chars.push(indexToBase62(n % RADIX))
    n = Math.floor(n / RADIX)
  }

  return chars.reverse().join('')
}

export interface DecodedRoll {
  decomposition: Decomposition
  bonus: Bonus
  vest: Vest
  motifIndex: number
}

export const decodeRollHash = (hash: string): DecodedRoll | null => {
  if (hash.length !== HASH_LENGTH) return null

  let packed = 0
  for (const char of hash) {
    const idx = base62ToIndex(char)

    if (idx === null) return null

    packed = packed * RADIX + idx
  }

  const motifIndex = packed % 128
  const r1 = Math.floor(packed / 128)
  const vestCode = r1 % 4
  const r2 = Math.floor(r1 / 4)
  const bonusCode = r2 % 4
  const r3 = Math.floor(r2 / 4)
  const securite = r3 % 256
  const r4 = Math.floor(r3 / 256)
  const qualite = r4 % 256
  const production = Math.floor(r4 / 256) % 256

  if (production > 200) return null
  if (qualite > 200) return null
  if (securite > 200) return null

  const bonus = BONUS_VALUES[bonusCode]
  const vest = VEST_VALUES[vestCode]

  if (bonus === undefined || vest === undefined) return null

  return {
    decomposition: { production, qualite, securite },
    bonus,
    vest,
    motifIndex
  }
}
