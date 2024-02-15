export function addTime(date: Date, ms: number): Date {
  const newDate = new Date(date);
  newDate.setTime(newDate.getTime() + ms);
  return newDate;
}
