import { describe, expect, it } from 'bun:test'

import {
  advanceFooterBackronym,
  type FooterBackronymState
} from '~/features/shell/hooks/useFooterBackronym'

const WORDS = ['Illusoire', 'Imaginaire'] as const

describe('advanceFooterBackronym', () => {
  it('starts deleting after the hold phase on the full word', () => {
    expect(
      advanceFooterBackronym({ wordIndex: 0, visibleLength: 9, phase: 'hold' }, WORDS)
    ).toEqual({ wordIndex: 0, visibleLength: 9, phase: 'deleting' })
  })

  it('shrinks visibleLength by one on each deleting tick', () => {
    expect(
      advanceFooterBackronym({ wordIndex: 0, visibleLength: 5, phase: 'deleting' }, WORDS)
    ).toEqual({ wordIndex: 0, visibleLength: 4, phase: 'deleting' })
  })

  it('switches to the next word and starts typing when deletion completes', () => {
    expect(
      advanceFooterBackronym({ wordIndex: 0, visibleLength: 0, phase: 'deleting' }, WORDS)
    ).toEqual({ wordIndex: 1, visibleLength: 1, phase: 'typing' })
  })

  it('wraps back to the first word after the last', () => {
    expect(
      advanceFooterBackronym({ wordIndex: 1, visibleLength: 0, phase: 'deleting' }, WORDS)
    ).toEqual({ wordIndex: 0, visibleLength: 1, phase: 'typing' })
  })

  it('grows visibleLength by one on each typing tick', () => {
    expect(
      advanceFooterBackronym({ wordIndex: 1, visibleLength: 3, phase: 'typing' }, WORDS)
    ).toEqual({ wordIndex: 1, visibleLength: 4, phase: 'typing' })
  })

  it('switches to hold when typing reaches the full word length', () => {
    expect(
      advanceFooterBackronym({ wordIndex: 1, visibleLength: 10, phase: 'typing' }, WORDS)
    ).toEqual({ wordIndex: 1, visibleLength: 10, phase: 'hold' })
  })

  it('cycles through every word in order across full delete + type sequences', () => {
    const words = ['A', 'B', 'C'] as const
    let state: FooterBackronymState = { wordIndex: 0, visibleLength: 1, phase: 'hold' }
    const visited: number[] = [state.wordIndex]

    for (let step = 0; step < 12; step += 1) {
      state = advanceFooterBackronym(state, words)
      if (state.phase === 'hold' && visited[visited.length - 1] !== state.wordIndex) {
        visited.push(state.wordIndex)
      }
    }

    expect(visited).toEqual([0, 1, 2, 0])
  })
})
