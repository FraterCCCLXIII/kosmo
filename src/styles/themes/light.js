/**
 * Kosmo OS UI Kit - Light Theme
 * 
 * This file defines the light theme for the UI system.
 * It maps design tokens to CSS variables.
 */

import tokens from '../tokens';

export const lightTheme = {
  // Color variables
  '--color-background': tokens.colors.neutral.white,
  '--color-surface': tokens.colors.neutral.white,
  '--color-surface-variant': tokens.colors.neutral.gray50,
  '--color-on-surface': tokens.colors.neutral.gray900,
  '--color-on-surface-variant': tokens.colors.neutral.gray700,
  
  // Brand colors
  '--color-primary': tokens.colors.brand.primary,
  '--color-primary-hover': '#2952CC', // Darker variant
  '--color-primary-active': '#1F3D99', // Even darker for active state
  '--color-on-primary': tokens.colors.neutral.white,
  
  '--color-secondary': tokens.colors.brand.secondary,
  '--color-secondary-hover': '#574FCC',
  '--color-secondary-active': '#423C99',
  '--color-on-secondary': tokens.colors.neutral.white,
  
  '--color-accent': tokens.colors.brand.accent,
  '--color-accent-hover': '#00A894',
  '--color-accent-active': '#008573',
  '--color-on-accent': tokens.colors.neutral.white,
  
  // Semantic colors
  '--color-success': tokens.colors.semantic.success,
  '--color-warning': tokens.colors.semantic.warning,
  '--color-error': tokens.colors.semantic.error,
  '--color-info': tokens.colors.semantic.info,
  
  '--color-on-success': tokens.colors.neutral.white,
  '--color-on-warning': tokens.colors.neutral.gray900,
  '--color-on-error': tokens.colors.neutral.white,
  '--color-on-info': tokens.colors.neutral.white,
  
  // Neutral colors
  '--color-gray-50': tokens.colors.neutral.gray50,
  '--color-gray-100': tokens.colors.neutral.gray100,
  '--color-gray-200': tokens.colors.neutral.gray200,
  '--color-gray-300': tokens.colors.neutral.gray300,
  '--color-gray-400': tokens.colors.neutral.gray400,
  '--color-gray-500': tokens.colors.neutral.gray500,
  '--color-gray-600': tokens.colors.neutral.gray600,
  '--color-gray-700': tokens.colors.neutral.gray700,
  '--color-gray-800': tokens.colors.neutral.gray800,
  '--color-gray-900': tokens.colors.neutral.gray900,
  
  // Border colors
  '--color-border': tokens.colors.neutral.gray200,
  '--color-border-hover': tokens.colors.neutral.gray300,
  '--color-border-focus': tokens.colors.brand.primary,
  
  // Shadow colors
  '--shadow-color': 'rgba(0, 0, 0, 0.1)',
  '--shadow-color-darker': 'rgba(0, 0, 0, 0.2)',
  
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
  '--shadow-1': tokens.shadows.elevation[1],
  '--shadow-2': tokens.shadows.elevation[2],
  '--shadow-3': tokens.shadows.elevation[3],
  '--shadow-4': tokens.shadows.elevation[4],
  '--shadow-5': tokens.shadows.elevation[5],
  '--shadow-6': tokens.shadows.elevation[6],
  
  '--shadow-inner-1': tokens.shadows.inner[1],
  '--shadow-inner-2': tokens.shadows.inner[2],
  
  '--shadow-focus': tokens.shadows.focus.outline,
  
  // Semantic shadows
  '--shadow-dropdown': tokens.shadows.semantic.dropdown,
  '--shadow-card': tokens.shadows.semantic.card,
  '--shadow-modal': tokens.shadows.semantic.modal,
  '--shadow-toast': tokens.shadows.semantic.toast,
  '--shadow-popover': tokens.shadows.semantic.popover,
  
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

export default lightTheme;