/**
 * Kosmo OS UI Kit - Dark Theme
 * 
 * This file defines the dark theme for the UI system.
 * It maps design tokens to CSS variables.
 */

import tokens from '../tokens';

export const darkTheme = {
  // Color variables
  '--color-background': tokens.colors.dark.background,
  '--color-surface': tokens.colors.dark.surface,
  '--color-surface-variant': '#2C2C2C',
  '--color-on-surface': tokens.colors.neutral.gray100,
  '--color-on-surface-variant': tokens.colors.neutral.gray300,
  
  // Brand colors
  '--color-primary': tokens.colors.dark.primary,
  '--color-primary-hover': '#7A99FF', // Lighter variant for dark mode
  '--color-primary-active': '#96AFFF', // Even lighter for active state
  '--color-on-primary': tokens.colors.neutral.gray900,
  
  '--color-secondary': tokens.colors.dark.secondary,
  '--color-secondary-hover': '#A59DFF',
  '--color-secondary-active': '#BEB8FF',
  '--color-on-secondary': tokens.colors.neutral.gray900,
  
  '--color-accent': '#00D9BF', // Brighter for dark mode
  '--color-accent-hover': '#00F5D7',
  '--color-accent-active': '#4DFFF0',
  '--color-on-accent': tokens.colors.neutral.gray900,
  
  // Semantic colors
  '--color-success': '#1FD397', // Brighter for dark mode
  '--color-warning': '#FFD233', // Brighter for dark mode
  '--color-error': '#FF6B6B', // Brighter for dark mode
  '--color-info': '#5C9DFF', // Brighter for dark mode
  
  '--color-on-success': tokens.colors.neutral.gray900,
  '--color-on-warning': tokens.colors.neutral.gray900,
  '--color-on-error': tokens.colors.neutral.gray900,
  '--color-on-info': tokens.colors.neutral.gray900,
  
  // Neutral colors
  '--color-gray-50': tokens.colors.neutral.gray900,
  '--color-gray-100': tokens.colors.neutral.gray800,
  '--color-gray-200': tokens.colors.neutral.gray700,
  '--color-gray-300': tokens.colors.neutral.gray600,
  '--color-gray-400': tokens.colors.neutral.gray500,
  '--color-gray-500': tokens.colors.neutral.gray400,
  '--color-gray-600': tokens.colors.neutral.gray300,
  '--color-gray-700': tokens.colors.neutral.gray200,
  '--color-gray-800': tokens.colors.neutral.gray100,
  '--color-gray-900': tokens.colors.neutral.gray50,
  
  // Border colors
  '--color-border': '#3A3A3A',
  '--color-border-hover': '#4A4A4A',
  '--color-border-focus': tokens.colors.dark.primary,
  
  // Shadow colors
  '--shadow-color': 'rgba(0, 0, 0, 0.3)',
  '--shadow-color-darker': 'rgba(0, 0, 0, 0.5)',
  
  // Typography
  '--font-family-base': tokens.typography.fontFamily.base,
  '--font-family-heading': tokens.typography.fontFamily.heading,
  '--font-family-mono': tokens.typography.fontFamily.mono,
  
  // Font weights
  '--font-weight-light': tokens.typography.fontWeight.light,
  '--font-weight-regular': tokens.typography.fontWeight.regular,
  '--font-weight-medium': tokens.typography.fontWeight.medium,
  '--font-weight-semibold': tokens.typography.fontWeight.semibold,
  '--font-weight-bold': tokens.typography.fontWeight.bold,
  
  // Font sizes
  '--font-size-xs': tokens.typography.fontSize.xs,
  '--font-size-sm': tokens.typography.fontSize.sm,
  '--font-size-base': tokens.typography.fontSize.base,
  '--font-size-lg': tokens.typography.fontSize.lg,
  '--font-size-xl': tokens.typography.fontSize.xl,
  '--font-size-2xl': tokens.typography.fontSize['2xl'],
  '--font-size-3xl': tokens.typography.fontSize['3xl'],
  '--font-size-4xl': tokens.typography.fontSize['4xl'],
  '--font-size-5xl': tokens.typography.fontSize['5xl'],
  '--font-size-6xl': tokens.typography.fontSize['6xl'],
  
  // Line heights
  '--line-height-none': tokens.typography.lineHeight.none,
  '--line-height-tight': tokens.typography.lineHeight.tight,
  '--line-height-snug': tokens.typography.lineHeight.snug,
  '--line-height-normal': tokens.typography.lineHeight.normal,
  '--line-height-relaxed': tokens.typography.lineHeight.relaxed,
  '--line-height-loose': tokens.typography.lineHeight.loose,
  
  // Spacing
  '--spacing-0': tokens.spacing[0],
  '--spacing-0-5': tokens.spacing[0.5],
  '--spacing-1': tokens.spacing[1],
  '--spacing-1-5': tokens.spacing[1.5],
  '--spacing-2': tokens.spacing[2],
  '--spacing-2-5': tokens.spacing[2.5],
  '--spacing-3': tokens.spacing[3],
  '--spacing-3-5': tokens.spacing[3.5],
  '--spacing-4': tokens.spacing[4],
  '--spacing-5': tokens.spacing[5],
  '--spacing-6': tokens.spacing[6],
  '--spacing-7': tokens.spacing[7],
  '--spacing-8': tokens.spacing[8],
  '--spacing-9': tokens.spacing[9],
  '--spacing-10': tokens.spacing[10],
  '--spacing-12': tokens.spacing[12],
  '--spacing-16': tokens.spacing[16],
  '--spacing-20': tokens.spacing[20],
  '--spacing-24': tokens.spacing[24],
  '--spacing-32': tokens.spacing[32],
  '--spacing-40': tokens.spacing[40],
  '--spacing-48': tokens.spacing[48],
  '--spacing-56': tokens.spacing[56],
  '--spacing-64': tokens.spacing[64],
  
  // Semantic spacing
  '--spacing-page': tokens.spacing.layout.page,
  '--spacing-section': tokens.spacing.layout.section,
  '--spacing-card': tokens.spacing.layout.card,
  '--spacing-input': tokens.spacing.layout.input,
  '--spacing-button': tokens.spacing.layout.button,
  '--spacing-icon': tokens.spacing.layout.icon,
  '--spacing-inline': tokens.spacing.layout.inline,
  '--spacing-stack': tokens.spacing.layout.stack,
  
  // Borders
  '--border-width-0': tokens.borders.width[0],
  '--border-width-1': tokens.borders.width[1],
  '--border-width-2': tokens.borders.width[2],
  '--border-width-4': tokens.borders.width[4],
  '--border-width-8': tokens.borders.width[8],
  
  '--border-radius-none': tokens.borders.radius.none,
  '--border-radius-sm': tokens.borders.radius.sm,
  '--border-radius-default': tokens.borders.radius.default,
  '--border-radius-md': tokens.borders.radius.md,
  '--border-radius-lg': tokens.borders.radius.lg,
  '--border-radius-xl': tokens.borders.radius.xl,
  '--border-radius-2xl': tokens.borders.radius['2xl'],
  '--border-radius-3xl': tokens.borders.radius['3xl'],
  '--border-radius-full': tokens.borders.radius.full,
  
  // Shadows
  '--shadow-1': tokens.shadows.dark.elevation[1],
  '--shadow-2': tokens.shadows.dark.elevation[2],
  '--shadow-3': tokens.shadows.dark.elevation[3],
  '--shadow-4': tokens.shadows.dark.elevation[4],
  '--shadow-5': tokens.shadows.dark.elevation[5],
  '--shadow-6': tokens.shadows.dark.elevation[6],
  
  '--shadow-inner-1': tokens.shadows.inner[1],
  '--shadow-inner-2': tokens.shadows.inner[2],
  
  '--shadow-focus': '0 0 0 3px rgba(94, 129, 255, 0.5)',
  
  // Semantic shadows
  '--shadow-dropdown': tokens.shadows.dark.elevation[3],
  '--shadow-card': tokens.shadows.dark.elevation[2],
  '--shadow-modal': tokens.shadows.dark.elevation[5],
  '--shadow-toast': tokens.shadows.dark.elevation[4],
  '--shadow-popover': tokens.shadows.dark.elevation[4],
  
  // Animations
  '--duration-fastest': tokens.animations.duration.fastest,
  '--duration-faster': tokens.animations.duration.faster,
  '--duration-fast': tokens.animations.duration.fast,
  '--duration-normal': tokens.animations.duration.normal,
  '--duration-slow': tokens.animations.duration.slow,
  '--duration-slower': tokens.animations.duration.slower,
  '--duration-slowest': tokens.animations.duration.slowest,
  
  '--easing-linear': tokens.animations.easing.linear,
  '--easing-ease': tokens.animations.easing.ease,
  '--easing-ease-in': tokens.animations.easing.easeIn,
  '--easing-ease-out': tokens.animations.easing.easeOut,
  '--easing-ease-in-out': tokens.animations.easing.easeInOut,
  '--easing-bounce': tokens.animations.easing.bounce,
  '--easing-snappy': tokens.animations.easing.snappy,
};

export default darkTheme;