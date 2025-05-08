import { Money } from '../graphql/schema'

/**
 * Format a Money object to a string
 * The Money amount is in cents
 * @param money - The Money object to format
 * @returns The formatted string
 */
export const formatMoney = (money: Money) => {
  return (money.amount / 100).toLocaleString('is-IS', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

/**
 * Parse a string to a Money object
 * @param money - The string to parse
 * @returns The parsed Money object
 */
export const parseMoney = (money: string) => {
  const cleanedMoney = money.replace(/[^0-9]/g, '')
  return { amount: parseInt(cleanedMoney, 10) * 100 }
}
