/**
 * Format a number as Indian currency: ₹1,20,000
 */
export function formatCurrency(amount: number): string {
  if (isNaN(amount)) return '₹0';
  const isNegative = amount < 0;
  const abs = Math.abs(Math.round(amount));
  const str = abs.toString();

  if (str.length <= 3) return `${isNegative ? '-' : ''}₹${str}`;

  // Indian number system: last 3 digits, then groups of 2
  const lastThree = str.substring(str.length - 3);
  const remaining = str.substring(0, str.length - 3);
  const formatted = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  return `${isNegative ? '-' : ''}₹${formatted}`;
}

/**
 * Format a number with Indian grouping (no currency symbol)
 */
export function formatNumber(n: number): string {
  if (isNaN(n)) return '0';
  const abs = Math.abs(Math.round(n));
  const str = abs.toString();
  if (str.length <= 3) return `${n < 0 ? '-' : ''}${str}`;
  const lastThree = str.substring(str.length - 3);
  const remaining = str.substring(0, str.length - 3);
  return `${n < 0 ? '-' : ''}${remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',')}${','}`  + lastThree;
}

/**
 * Format as percentage
 */
export function formatPercentage(n: number): string {
  return `${Math.round(n * 100) / 100}%`;
}

/**
 * Format large numbers in lakhs for display (e.g., ₹1.32L)
 */
export function formatLakhs(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)}L`;
  }
  return formatCurrency(amount);
}
