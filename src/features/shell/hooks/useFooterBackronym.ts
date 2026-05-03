import { useEffect, useState } from 'react'

export type FooterBackronymPhase = 'hold' | 'deleting' | 'typing'

export type FooterBackronymState = {
  wordIndex: number
  visibleLength: number
  phase: FooterBackronymPhase
}

export const advanceFooterBackronym = (
  state: FooterBackronymState,
  words: readonly string[]
): FooterBackronymState => {
  if (state.phase === 'hold') {
    return { ...state, phase: 'deleting' }
  }

  if (state.phase === 'deleting') {
    if (state.visibleLength <= 0) {
      const nextIndex = (state.wordIndex + 1) % words.length

      return { wordIndex: nextIndex, visibleLength: 1, phase: 'typing' }
    }

    return { ...state, visibleLength: state.visibleLength - 1 }
  }

  const currentWord = words[state.wordIndex] ?? ''

  if (state.visibleLength >= currentWord.length) {
    return { ...state, phase: 'hold' }
  }

  return { ...state, visibleLength: state.visibleLength + 1 }
}

type UseFooterBackronymOptions = {
  charDelayMs?: number
  holdMs?: number
}

export const useFooterBackronym = (
  words: readonly string[],
  options: UseFooterBackronymOptions = {}
): string => {
  const { charDelayMs = 80, holdMs = 2500 } = options

  const [state, setState] = useState<FooterBackronymState>(() => ({
    wordIndex: 0,
    visibleLength: words[0]?.length ?? 0,
    phase: 'hold'
  }))

  useEffect(() => {
    const delay = state.phase === 'hold' ? holdMs : charDelayMs

    const id = setTimeout(() => {
      setState((current) => advanceFooterBackronym(current, words))
    }, delay)

    return () => {
      clearTimeout(id)
    }
  }, [state, words, charDelayMs, holdMs])

  const currentWord = words[state.wordIndex] ?? ''

  return currentWord.slice(0, state.visibleLength)
}
