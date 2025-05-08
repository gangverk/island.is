// Kennitala: 6 digits, hyphen, 4 digits (e.g. 101284-3489)
export const formatKennitala = (kennitala: string): string => {
  if (!kennitala) return ''
  const cleaned = kennitala.replace(/[^0-9]/g, '')
  if (cleaned.length !== 10) return kennitala
  return `${cleaned.slice(0, 6)}-${cleaned.slice(6)}`
}

// Phone number: 3 digits, hyphen, 4 digits (e.g. 58-12345)
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return ''
  const cleaned = phone.replace(/[^0-9]/g, '')
  if (cleaned.length !== 7) return phone
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
}

// Bank account: 4 digits, hyphen, 2 digits, hyphen, 6 digits (e.g. 0137-05-000124)
export const formatBankAccountNumber = (account: string): string => {
  if (!account) return ''
  const cleaned = account.replace(/[^0-9]/g, '')
  if (cleaned.length !== 12) return account
  return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(6)}`
}
