import { motifs } from '~/lib/banks'
import { colleagues } from '~/lib/banks/colleagues'
import { genericNames } from '~/lib/banks/genericNames'
import { decomposePrime, generateBasePrime, generateBonus } from '~/lib/generation/amounts'
import { pickIndex, pickN } from '~/lib/generation/pickers'
import { generateSigle } from '~/lib/generation/sigle'
import { generateId } from '~/lib/util/generateId'
import type { Vest } from '~/types/bank.types'
import type { Roll } from '~/types/roll.types'

export interface DispatchCardEntry extends Roll {
  id: string
}

export interface DispatchView {
  sigle: string
  cards: DispatchCardEntry[]
}

export interface ComposeDispatchInput {
  sigle?: string
  interimCount?: number
}

const composeCard = (prenom: string, sigle: string, vest: Vest): DispatchCardEntry => {
  const base = generateBasePrime()
  const decomposition = decomposePrime(base)
  const bonus = generateBonus()
  const motifIndex = pickIndex(motifs.length)

  return { id: generateId(), prenom, sigle, decomposition, bonus, vest, motifIndex }
}

const shuffle = <T>(items: readonly T[]): T[] => {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const swap = result[i] as T
    result[i] = result[j] as T
    result[j] = swap
  }

  return result
}

export const composeDispatchView = ({
  sigle,
  interimCount = 0
}: ComposeDispatchInput = {}): DispatchView => {
  const finalSigle = sigle ?? generateSigle()

  const realCards = colleagues.map((colleague) =>
    composeCard(colleague.name, finalSigle, colleague.vest)
  )

  const interimNames = interimCount === 0 ? [] : pickN(genericNames, interimCount)
  const interimCards = interimNames.map((name) => composeCard(name, finalSigle, 'interim'))

  return {
    sigle: finalSigle,
    cards: shuffle([...realCards, ...interimCards])
  }
}
