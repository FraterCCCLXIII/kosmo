# Creating a Framework-Agnostic Component Library

This document outlines the strategy for building a truly framework-agnostic component library for Kosmo OS.

## Core Principles

1. **Native Web Standards**: Use Web Components (Custom Elements, Shadow DOM) as the foundation
2. **No Framework Dependencies**: Components should work without any framework
3. **Framework Compatibility**: Components should be easily usable with React, Vue, Angular, etc.
4. **Consistent API**: Provide a consistent API across all components
5. **Progressive Enhancement**: Start with basic functionality and enhance as needed

## Implementation Strategy

### 1. Web Components Architecture

All components are built as Web Components using the Custom Elements API:

```javascript
export class KosmoButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'disabled', 'size'];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }
  
  // Lifecycle methods
  connectedCallback() { /* ... */ }
  disconnectedCallback() { /* ... */ }
  attributeChangedCallback(name, oldValue, newValue) { /* ... */ }
  
  // Custom methods
  render() { /* ... */ }
}

// Register the component
customElements.define('kosmo-button', KosmoButton);
```

### 2. Shadow DOM for Style Encapsulation

Use Shadow DOM to encapsulate styles and prevent conflicts:

```javascript
render() {
  const styles = `
    :host {
      display: inline-block;
    }
    
    .kosmo-button {
      /* Component styles */
    }
  `;
  
  this.shadowRoot.innerHTML = `
    <style>${styles}</style>
    <button class="kosmo-button">
      <slot></slot>
    </button>
  `;
}
```

### 3. Factory Functions for Easy Creation

Provide factory functions for easier component creation:

```javascript
export function createButton(options = {}) {
  const {
    text = '',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    onClick
  } = options;
  
  const button = document.createElement('kosmo-button');
  button.variant = variant;
  button.size = size;
  button.disabled = disabled;
  button.textContent = text;
  
  if (onClick) {
    button.addEventListener('kosmo-click', onClick);
  }
  
  return button;
}
```

### 4. Custom Events for Interaction

Use custom events for component interactions:

```javascript
handleClick = (event) => {
  if (this.disabled) return;
  
  this.dispatchEvent(new CustomEvent('kosmo-click', {
    bubbles: true,
    composed: true,
    detail: { originalEvent: event }
  }));
}
```

### 5. CSS Custom Properties for Theming

Use CSS custom properties for theming:

```css
.kosmo-button--primary {
  background-color: var(--color-primary, #1976d2);
  color: var(--color-on-primary, #ffffff);
}
```

## Framework Integration

### Vanilla JavaScript

```javascript
import { createButton } from './ui/components/Button.js';

const button = createButton({
  text: 'Click Me',
  onClick: () => console.log('Clicked!')
});

document.body.appendChild(button);
```

### React Integration

```jsx
import React, { useRef, useEffect } from 'react';
import { KosmoButton } from './ui/components/Button.js';

// Register the component if not already registered
if (!customElements.get('kosmo-button')) {
  customElements.define('kosmo-button', KosmoButton);
}

const Button = ({ text, variant, size, disabled, onClick }) => {
  const buttonRef = useRef(null);
  
  useEffect(() => {
    const button = buttonRef.current;
    
    // Add event listener
    if (onClick) {
      button.addEventListener('kosmo-click', onClick);
    }
    
    // Cleanup
    return () => {
      if (onClick) {
        button.removeEventListener('kosmo-click', onClick);
      }
    };
  }, [onClick]);
  
  return (
    <kosmo-button
      ref={buttonRef}
      variant={variant}
      size={size}
      disabled={disabled ? '' : null}
    >
      {text}
    </kosmo-button>
  );
};
```

### Vue Integration

```vue
<template>
  <kosmo-button
    :variant="variant"
    :size="size"
    :disabled="disabled"
    @kosmo-click="onClick"
  >
    {{ text }}
  </kosmo-button>
</template>

<script>
import { KosmoButton } from './ui/components/Button.js';

// Register the component if not already registered
if (!customElements.get('kosmo-button')) {
  customElements.define('kosmo-button', KosmoButton);
}

export default {
  props: {
    text: String,
    variant: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'medium'
    },
    disabled: Boolean
  },
  methods: {
    onClick(event) {
      this.$emit('click', event.detail);
    }
  }
};
</script>
```

## Migration Strategy

1. **Component Audit**: Identify all existing components and their usage
2. **Prioritization**: Prioritize components based on usage and complexity
3. **Incremental Migration**: Migrate one component at a time
4. **Parallel Implementation**: Keep existing components working while migrating
5. **Testing**: Test components in isolation and in applications
6. **Documentation**: Document the new component API and usage

## Benefits

1. **Reduced Dependencies**: No framework dependencies means smaller bundle size
2. **Future-Proof**: Based on web standards that will be supported long-term
3. **Framework Flexibility**: Works with any framework or no framework
4. **Consistent API**: Same API across all components
5. **Better Performance**: Native browser features are faster than framework abstractions
6. **Easier Maintenance**: Components are self-contained and independent