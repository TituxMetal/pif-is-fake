export type MonthLabelCase = 'uppercase' | 'capitalized'

const MONTHS_FR = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre'
] as const

export const previousMonthLabel = (
  casing: MonthLabelCase,
  now: Date = new Date()
): string => {
  const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const month = MONTHS_FR[previousMonth.getMonth()] ?? ''
  const label =
    casing === 'uppercase'
      ? month.toUpperCase()
      : month.charAt(0).toUpperCase() + month.slice(1)

  return `${label} ${previousMonth.getFullYear()}`
}
