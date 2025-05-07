import { Money } from '../graphql/schema'

/**
 * Format a Money object to a string
 * The Money amount is in cents
 * @param money - The Money object to format
 * @returns The formatted string
 */
export const formatMoney = (money: Money) => {
  return (money.amount / 100).toLocaleString('is-IS', {
    style: 'currency',
    currency: 'ISK',
    minimumFractionDigits: 2,
  })
}
