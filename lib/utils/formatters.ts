/**
 * Formatting utilities for displaying data
 */

export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toLocaleString();
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${(Math.round(value * 10 ** decimals) / 10 ** decimals).toFixed(decimals)}%`;
}

export function formatLargeNumber(num: number): string {
  return num.toLocaleString();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}
