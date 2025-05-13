# Kosmo OS UI Styling System

This directory contains the styling system for Kosmo OS. The styling system is designed to provide consistent, themeable, and maintainable styles across all applications.

## Architecture

The styling system follows a hierarchical structure:

```
styles/
├── tokens/         # Design tokens (colors, typography, spacing, etc.)
│   ├── colors.js
│   ├── typography.js
│   ├── spacing.js
│   ├── shadows.js
│   ├── borders.js
│   └── animations.js
├── themes/         # Theme definitions (light, dark)
│   ├── light.js
│   └── dark.js
└── utilities/      # Utility classes
    ├── reset.css
    └── global.css
```

## Design Tokens

Design tokens are the foundation of the styling system. They define the basic visual properties that are used throughout the UI.

### Colors

Colors are defined with both base values and semantic values:

```javascript
// Base colors
const baseColors = {
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    // ...
  },
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ...
  },
  // ...
};

// Semantic colors
const semanticColors = {
  background: baseColors.gray[50],
  surface: baseColors.white,
  primary: baseColors.primary[600],
  // ...
};
```

### Typography

Typography tokens define font families, sizes, weights, and line heights:

```javascript
const typography = {
  fontFamily: {
    base: 'Inter, system-ui, sans-serif',
    mono: 'Menlo, Monaco, Consolas, monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    // ...
  },
  // ...
};
```

### Spacing

Spacing tokens ensure consistent spacing throughout the UI:

```javascript
const spacing = {
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  // ...
};
```

## Themes

Themes map design tokens to CSS variables, allowing for easy theme switching:

```javascript
// Light theme
const lightTheme = {
  'color-background': tokens.colors.gray[50],
  'color-surface': tokens.colors.white,
  // ...
};

// Dark theme
const darkTheme = {
  'color-background': tokens.colors.gray[900],
  'color-surface': tokens.colors.gray[800],
  // ...
};
```

## CSS Methodology

The styling system follows a modified BEM (Block, Element, Modifier) methodology:

```css
/* Block */
.kosmo-button {
  /* Base styles */
}

/* Element */
.kosmo-button__icon {
  /* Element styles */
}

/* Modifier */
.kosmo-button--primary {
  /* Modifier styles */
}
```

## Usage Guidelines

### Using CSS Variables

Always use CSS variables for themeable properties:

```css
/* Good */
.my-component {
  color: var(--color-on-surface);
  background-color: var(--color-surface);
}

/* Bad */
.my-component {
  color: #333;
  background-color: white;
}
```

### Responsive Design

Use the provided breakpoints for responsive design:

```css
@media (min-width: var(--breakpoint-md)) {
  .my-component {
    /* Styles for medium screens and up */
  }
}
```

### Component-Specific Styles

Keep component-specific styles in the same directory as the component:

```
components/
└── core/
    ├── Button.js
    └── Button.css
```

## Theme Provider

The `ThemeProvider` component manages theme switching:

```javascript
import { ThemeProvider } from '../../components/registry';

// In your app
<ThemeProvider theme="light">
  {/* App content */}
</ThemeProvider>
```

You can also use the `useTheme` hook to access and change the current theme:

```javascript
import { useTheme } from '../../components/registry';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

## Accessibility Considerations

- Ensure sufficient color contrast (WCAG AA compliance)
- Use relative units (rem, em) for better text scaling
- Test with screen readers and keyboard navigation
- Support reduced motion preferences

## Performance Optimization

- Minimize CSS specificity
- Use CSS variables for dynamic values
- Avoid deeply nested selectors
- Consider code splitting for large style files