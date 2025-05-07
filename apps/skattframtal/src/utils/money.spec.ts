import { formatMoney } from './money'

describe('formatMoney', () => {
  it('should format money correctly', () => {
    expect(formatMoney({ __typename: 'Money', amount: 10000 })).toBe(
      '100,00 kr',
    )
  })
  it('should format money correctly', () => {
    expect(formatMoney({ __typename: 'Money', amount: 1234567 })).toBe(
      '12.345,67 kr',
    )
  })
})
