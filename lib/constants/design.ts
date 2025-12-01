/**
 * Buffer Design System Tokens
 * https://buffer.com
 */

export const colors = {
  // Primary brand colors
  primary: '#9FD356', // Vibrant green
  primaryLight: '#B8FF6D',
  primaryDark: '#8BC245',

  // Secondary colors (teal palette)
  secondary: '#346B63', // Teal-dark
  secondaryDark: '#2B5A52', // Deep teal
  secondaryLight: '#4A8B7F',

  // Neutral palette
  white: '#FFFFFF',
  offWhite: '#F9FAFB',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  black: '#000000',

  // Status colors
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Ghost score tier colors
  tiers: {
    communityChampion: '#10B981', // Green
    engagedCreator: '#346B63', // Teal
    partTimeReplier: '#F59E0B', // Amber
    occasionalVisitor: '#F97316', // Orange
    serialGhoster: '#EF4444', // Red
  },
} as const;

export const typography = {
  // Font families
  fonts: {
    heading: 'var(--font-manrope)',
    body: 'var(--font-figtree)',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  },

  // Font sizes
  sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
  },

  // Line heights
  lineHeights: {
    tight: '1.1',
    normal: '1.4',
    relaxed: '1.6',
  },

  // Font weights
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const spacing = {
  // Base spacing unit is 4px
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px',
} as const;

export const transitions = {
  fast: '150ms ease-in-out',
  base: '200ms ease-in-out',
  slow: '300ms ease-in-out',
} as const;

export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px', // Full radius for buttons
} as const;

export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const zIndex = {
  hide: '-1',
  base: '0',
  dropdown: '1000',
  sticky: '1020',
  fixed: '1030',
  modal: '1040',
  popover: '1050',
  tooltip: '1060',
} as const;
