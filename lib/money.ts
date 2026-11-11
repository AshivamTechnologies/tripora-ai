export const CURRENCIES = [
  { code: 'USD', label: 'US Dollar' },
  { code: 'EUR', label: 'Euro' },
  { code: 'GBP', label: 'British Pound' },
  { code: 'INR', label: 'Indian Rupee' },
  { code: 'JPY', label: 'Japanese Yen' },
  { code: 'IDR', label: 'Indonesian Rupiah' },
  { code: 'AED', label: 'UAE Dirham' },
  { code: 'SGD', label: 'Singapore Dollar' },
  { code: 'THB', label: 'Thai Baht' },
  { code: 'AUD', label: 'Australian Dollar' },
] as const;

export function currencyDigits(currency: string): number {
  return new Intl.NumberFormat('en', { style: 'currency', currency }).resolvedOptions()
    .maximumFractionDigits ?? 2;
}

export function toMinorUnits(amount: number, currency: string): number {
  return Math.round(amount * 10 ** currencyDigits(currency));
}

export function fromMinorUnits(minor: number, currency: string): number {
  return minor / 10 ** currencyDigits(currency);
}

export function formatMoney(minor: number, currency: string): string {
  const digits = currencyDigits(currency);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(fromMinorUnits(minor, currency));
}
