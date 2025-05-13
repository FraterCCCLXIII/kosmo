/**
 * Kosmo OS UI Kit - Spacing Tokens
 * 
 * This file defines the spacing system for the entire UI.
 * All margins, paddings, and layout spacing should reference these tokens.
 */

export const spacing = {
  // Base spacing unit (in rem for accessibility)
  // 1rem = 16px by default in most browsers
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
  
  // Semantic spacing
  layout: {
    page: '1.5rem',       // Page margins
    section: '2rem',      // Section spacing
    card: '1rem',         // Card padding
    input: '0.75rem',     // Input field padding
    button: '0.75rem',    // Button padding
    icon: '0.5rem',       // Icon spacing
    inline: '0.5rem',     // Inline element spacing
    stack: '1rem',        // Stacked element spacing
  }
};

export default spacing;