/**
 * Kosmo OS UI Kit - Animation Tokens
 * 
 * This file defines the animation system for the entire UI.
 * All animations and transitions should reference these tokens.
 */

export const animations = {
  // Transition durations (in ms)
  duration: {
    fastest: '50ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
    slowest: '500ms',
  },
  
  // Transition timing functions (easing)
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Custom easings
    bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    snappy: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  },
  
  // Semantic animations
  semantic: {
    hover: {
      duration: '150ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    click: {
      duration: '100ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    expand: {
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    fade: {
      duration: '200ms',
      easing: 'cubic-bezier(0, 0, 0.2, 1)',
    },
    slide: {
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    scale: {
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  // Keyframe animations
  keyframes: {
    fadeIn: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `,
    fadeOut: `
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `,
    slideInRight: `
      @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
    `,
    slideOutRight: `
      @keyframes slideOutRight {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
      }
    `,
    slideInLeft: `
      @keyframes slideInLeft {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
      }
    `,
    slideOutLeft: `
      @keyframes slideOutLeft {
        from { transform: translateX(0); }
        to { transform: translateX(-100%); }
      }
    `,
    slideInUp: `
      @keyframes slideInUp {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
    `,
    slideOutDown: `
      @keyframes slideOutDown {
        from { transform: translateY(0); }
        to { transform: translateY(100%); }
      }
    `,
    pulse: `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    `,
    spin: `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `,
  },
};

export default animations;