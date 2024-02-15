export function convertDollarsAndCentsToCents(dollarsAndCents: string): number {
  return parseFloat(dollarsAndCents) * 100;
}

export function convertCentsToDollarsAndCents(cents: number): string {
  return (cents / 100).toFixed(2);
}
