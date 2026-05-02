export const pickIndex = (bankSize: number): number => {
  return Math.floor(Math.random() * bankSize)
}

export const pickN = <T>(bank: readonly T[], n: number): T[] => {
  if (n > bank.length) throw new Error('pickN: n exceeds bank size')

  const picked: T[] = []
  const seen = new Set<number>()

  while (picked.length < n) {
    const idx = pickIndex(bank.length)
    if (seen.has(idx)) continue

    const item = bank[idx]
    if (item === undefined) continue

    seen.add(idx)
    picked.push(item)
  }

  return picked
}
