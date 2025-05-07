import { formatMoney } from './money'

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
