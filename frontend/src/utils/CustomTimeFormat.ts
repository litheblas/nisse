function dateTimeToIsoWithTimezone(date: Date): string {
  const year: string = date.getFullYear().toString().padStart(4, '0')
  // Add 1 to the month to get the correct month number
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0')
  const day: string = date.getDate().toString().padStart(2, '0')
  const hour: string = date.getHours().toString().padStart(2, '0')
  const minute: string = date.getMinutes().toString().padStart(2, '0')
  const second: string = date.getSeconds().toString().padStart(2, '0')

  return `${year}-${month}-${day}T${hour}:${minute}:${second}`
}

export { dateTimeToIsoWithTimezone }
