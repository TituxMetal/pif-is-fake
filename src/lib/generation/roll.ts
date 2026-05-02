import { motifs } from '~/lib/banks'
import { decomposePrime, generateBasePrime, generateBonus } from '~/lib/generation/amounts'
import { pickIndex } from '~/lib/generation/pickers'
import { generateSigle } from '~/lib/generation/sigle'
import { generateVest } from '~/lib/generation/vest'
import type { Vest } from '~/types/bank.types'
import type { Roll } from '~/types/roll.types'

export interface ComposeRollInput {
  prenom: string
  sigle?: string
  vest?: Vest
}

export const composeRoll = ({ prenom, sigle, vest }: ComposeRollInput): Roll => {
  const finalSigle = sigle ?? generateSigle()
  const finalVest = vest ?? generateVest()
  const base = generateBasePrime()
  const decomposition = decomposePrime(base)
  const bonus = generateBonus()
  const motifIndex = pickIndex(motifs.length)

  return {
    prenom,
    sigle: finalSigle,
    decomposition,
    bonus,
    vest: finalVest,
    motifIndex
  }
}
