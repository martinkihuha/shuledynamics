import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { reactive } from 'vue'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const store = reactive({
  authUser: {
    name: 'Mkenya Mwema',
    email: 'mkenya@shule1.com',
  },
  page: 1,
  perPage: 30,
  searchParam: '',
  searchPlaceholder: 'Search...',
  notification: {
    title: 'Notification Title',
    content: 'Notification content notifying the user of some event',
    type: 'warning',
    timeout: 5000,
    visible: false,
  },
})

export function formatCurrency(currency: string, money: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency,
    currencySign: 'accounting',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(money)
}

export function format2Decimals(num: number) {
  return new Intl.NumberFormat('en-KE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
}

export function getGreeting() {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) {
    return 'Good morning'
  } else if (hour >= 12 && hour < 18) {
    return 'Good afternoon'
  } else {
    return 'Good evening'
  }
}

// Helper function to add ordinal suffix
function getOrdinalSuffix(day: any) {
  if (day > 3 && day < 21) return 'th' // Handle 11th, 12th, 13th, etc.
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export function formatDate(date: string) {
  const day = new Date(date).getDate()
  const ordinalSuffix = getOrdinalSuffix(day)

  // Use Intl.DateTimeFormat to format the date
  const formattedDate = new Intl.DateTimeFormat('en-KE', {
    weekday: 'long', // Full day name (e.g., "Monday")
    day: 'numeric', // Day of the month (e.g., "31")
    month: 'long', // Full month name (e.g., "October")
    year: 'numeric', // Full year (e.g., "2023")
  }).format(new Date(date))

  // Replace the numeric day with the ordinal day
  return formattedDate.replace(/\d+/, `${day}${ordinalSuffix}`)
}

export function formatDateFull(date: string) {
  // Use Intl.DateTimeFormat to format the date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long', // Full month name (e.g., "October")
    day: 'numeric', // Day of the month (e.g., "31")
    year: 'numeric', // Full year (e.g., "2023")
  }).format(new Date(date))

  return formattedDate
}

export function formatDateShort(date: string) {
  // Use Intl.DateTimeFormat to format the date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short', // Abbreviated month name (e.g., "Oct")
    day: 'numeric', // Day of the month (e.g., "31")
    year: 'numeric', // Full year (e.g., "2024")
  }).format(new Date(date))

  return formattedDate
}

export function formatDateTime(date: string) {
  // Use Intl.DateTimeFormat to format the date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short', // Abbreviated month name (e.g., "Oct")
    day: 'numeric', // Day of the month (e.g., "31")
    year: 'numeric', // Full year (e.g., "2024")
    hour: 'numeric', // Hour (e.g., "2 PM")
    minute: 'numeric', // Minute (e.g., "37")
  }).format(new Date(date))

  return formattedDate
}

export function formatDateMonth(date: string) {
  // Use Intl.DateTimeFormat to format the date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short', // Abbreviated month name (e.g., "Oct")
    day: 'numeric', // Day of the month (e.g., "31")
  }).format(new Date(date))

  return formattedDate
}

export function formatDateNorm(date: string) {
  // Use Intl.DateTimeFormat to format the date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'numeric', // Numeric month (e.g., "10")
    day: 'numeric', // Day of the month (e.g., "31")
    year: 'numeric', // Full year (e.g., "2024")
  }).format(new Date(date))

  return formattedDate
}

/**
 * Compares a given date string with the current date.
 * Returns true if the given date is today or in the future, false otherwise.
 * @param dateString The date string to compare.
 * @returns boolean
 */
export function isDateInFutureOrToday(dateString: string): boolean {
  try {
    const inputDate = new Date(dateString)
    const currentDate = new Date()

    // Check if the input date is valid
    if (isNaN(inputDate.getTime())) {
      console.error('Invalid date string provided:', dateString)
      return false // Or handle invalid date as needed
    }

    // Set time to midnight for both dates to compare only the date part
    inputDate.setHours(0, 0, 0, 0)
    currentDate.setHours(0, 0, 0, 0)

    return inputDate >= currentDate
  } catch (error) {
    console.error('Error comparing dates:', error)
    return false // Handle potential errors during date parsing/comparison
  }
}

export function formatPhone(phone: string) {
  return phone?.substring(0, 4) + ' ' + phone?.substring(4, 7) + ' ' + phone?.substring(7, 10)
}

/**
 * Formats a date range by concatenating two dates with their times in hour:minutes AM/PM format
 * @param date1 The first date string of the range
 * @param date2 The second date string of the range
 * @returns A string with both formatted dates and times
 */
export function formatDateRange(date1: string, date2: string): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }

  const formattedDate1 = new Intl.DateTimeFormat('en-US', options).format(new Date(date1))
  const formattedDate2 = new Intl.DateTimeFormat('en-US', options).format(new Date(date2))

  return `${formattedDate1} to ${formattedDate2}`
}

/**
 * Converts a date string into a Unix timestamp (milliseconds since epoch)
 * @param date The date string to be converted
 * @returns A number representing the Unix timestamp in milliseconds
 */
export function formatTimestamp(date: string): number {
  const dateObj = new Date(date)

  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    console.error('Invalid date string provided:', date)
    return 0
  }

  // Return Unix timestamp (milliseconds since epoch)
  return dateObj.getTime()
}
