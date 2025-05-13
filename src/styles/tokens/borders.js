/**
 * Kosmo OS UI Kit - Border Tokens
 * 
 * This file defines the border system for the entire UI.
 * All border styles should reference these tokens.
 */

export const borders = {
  // Border widths
  width: {
    0: '0px',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
  },
  
  // Border styles
  style: {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
    double: 'double',
    none: 'none',
  },
  
  // Border radii
  radius: {
    none: '0',
    sm: '0.125rem',    // 2px
    default: '0.25rem', // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px',    // Fully rounded (for pills, circles)
  },
  
  // Semantic borders
  semantic: {
    input: {
      width: '1px',
      style: 'solid',
      radius: '0.375rem',
      color: 'var(--color-gray-300)',
      focusColor: 'var(--color-primary-500)',
    },
    card: {
      width: '1px',
      style: 'solid',
      radius: '0.5rem',
      color: 'var(--color-gray-200)',
    },
    button: {
      width: '1px',
      style: 'solid',
      radius: '0.375rem',
    },
    divider: {
      width: '1px',
      style: 'solid',
      color: 'var(--color-gray-200)',
    },
  },
};

export default borders;