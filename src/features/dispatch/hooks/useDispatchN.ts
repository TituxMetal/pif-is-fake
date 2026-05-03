const MAX_INTERIM = 20

const ZERO_CODE = 48
const NINE_CODE = 57
const UPPER_A_CODE = 65
const UPPER_Z_CODE = 90
const LOWER_A_CODE = 97
const LOWER_Z_CODE = 122

const base62ToNumber = (input: string): number | null => {
  if (input.length !== 1) return null

  const code = input.charCodeAt(0)

  if (code >= ZERO_CODE && code <= NINE_CODE) return code - ZERO_CODE
  if (code >= UPPER_A_CODE && code <= UPPER_Z_CODE) return code - UPPER_A_CODE + 10
  if (code >= LOWER_A_CODE && code <= LOWER_Z_CODE) return code - LOWER_A_CODE + 36

  return null
}

export const decodeDispatchN = (search: string): number => {
  const params = new URLSearchParams(search)
  const raw = params.get('n')

  if (raw === null) return 0
  if (raw === '') return 0

  const decoded = base62ToNumber(raw)

  if (decoded === null) return 0
  if (decoded < 0) return 0
  if (decoded > MAX_INTERIM) return MAX_INTERIM

  return decoded
}

export const useDispatchN = (): number => {
  return decodeDispatchN(window.location.search)
}
