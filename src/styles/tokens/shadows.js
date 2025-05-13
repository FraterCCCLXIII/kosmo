/**
 * Kosmo OS UI Kit - Shadow Tokens
 * 
 * This file defines the shadow system for the entire UI.
 * All shadows and elevation effects should reference these tokens.
 */

export const shadows = {
  // Elevation shadows
  elevation: {
    0: 'none',
    1: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    2: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    3: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    4: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    5: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    6: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  
  // Semantic shadows
  semantic: {
    dropdown: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    modal: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    toast: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    popover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  
  // Inner shadows
  inner: {
    1: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    2: 'inset 0 2px 8px 0 rgba(0, 0, 0, 0.1)',
  },
  
  // Focus ring shadows
  focus: {
    outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
  },
  
  // Dark mode shadows
  dark: {
    elevation: {
      1: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
      2: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
      3: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      4: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
      5: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.14)',
      6: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
    },
  },
};

export default shadows;