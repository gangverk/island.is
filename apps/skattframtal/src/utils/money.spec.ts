import { formatMoney, parseMoney } from './money'

describe('formatMoney', () => {
  it('should format money correctly', () => {
    expect(formatMoney({ __typename: 'Money', amount: 100_000 })).toBe('1.000')
  })
  it('should format money correctly', () => {
    expect(formatMoney({ __typename: 'Money', amount: 1_234_567 })).toBe(
      '12.346',
    )
  })
})

describe('parseMoney', () => {
  it('should parse money correctly', () => {
    expect(parseMoney('1.000')).toEqual({ amount: 100000 })
  })
  it('should parse money correctly', () => {
    expect(parseMoney('12.346')).toEqual({ amount: 1234600 })
  })
})
