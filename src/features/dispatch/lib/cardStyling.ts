const WINNER_THRESHOLD = 250

export const isWinner = (total: number): boolean => total >= WINNER_THRESHOLD

export const cardAccentClass = (total: number, bonus: number): string => {
  if (total >= WINNER_THRESHOLD) return 'border-t-hi'
  if (bonus > 0) return 'border-t-hi-2'

  return 'border-t-fg-faint'
}
