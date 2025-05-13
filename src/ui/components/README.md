# Kosmo OS UI Component Library

A framework-agnostic UI component library for Kosmo OS, built using Web Components.

## Architecture

The component library follows these principles:

1. **Framework Agnostic**: Components work with any framework or vanilla JavaScript
2. **Web Components**: Built using the Web Components standard (Custom Elements, Shadow DOM)
3. **Encapsulated Styling**: CSS is scoped to components using Shadow DOM
4. **Declarative API**: Simple, consistent API for creating and configuring components
5. **Accessibility**: ARIA attributes and keyboard navigation built-in
6. **Theming**: CSS custom properties for easy theming

## Component Categories

Components are organized into the following categories:

- **Core**: Base components and utilities
- **Layout**: Components for page structure (AppLayout, Grid, etc.)
- **Navigation**: Components for navigation (Tabs, Menu, etc.)
- **Input**: Form controls and input components
- **Display**: Components for displaying content
- **Feedback**: Components for user feedback
- **Media**: Components for media content
- **Productivity**: Components for productivity apps

## Usage

### Using Web Components Directly

```html
<!-- Import the component -->
<script type="module">
  import { KosmoButton } from './ui/components/Button.js';
</script>

<!-- Use the component -->
<kosmo-button variant="primary">Click Me</kosmo-button>
```

### Using Factory Functions

```javascript
// Import the factory function
import { createButton } from './ui/components/Button.js';

// Create a button
const button = createButton({
  text: 'Click Me',
  variant: 'primary',
  onClick: (event) => {
    console.log('Button clicked!', event);
  }
});

// Add to the DOM
document.body.appendChild(button);
```

## Component Documentation

### Button

A customizable button component.

```javascript
// Create a button
const button = createButton({
  text: 'Click Me',
  variant: 'primary', // 'primary', 'secondary', 'text'
  size: 'medium', // 'small', 'medium', 'large'
  disabled: false,
  onClick: (event) => {
    console.log('Button clicked!', event);
  }
});
```

### List

A list component for displaying items.

```javascript
// Create a list
const list = createList();

// Add items
list.appendChild(createListItem({
  primary: 'Item 1',
  secondary: 'Description',
  selected: true,
  onClick: (event) => {
    console.log('Item clicked!', event);
  }
}));

list.appendChild(createListDivider());

list.appendChild(createListSubheader({
  text: 'Section Title'
}));

list.appendChild(createListItem({
  primary: 'Item 2'
}));
```

### Tabs

A tabbed interface component.

```javascript
// Create tabs
const tabs = createTabs({
  selectedIndex: 0,
  onChange: (event) => {
    console.log('Tab changed!', event.detail.selectedIndex);
  }
});

// Add tabs and panels
tabs.appendChild(createTab({
  label: 'Tab 1',
  selected: true
}));

tabs.appendChild(createTab({
  label: 'Tab 2'
}));

tabs.appendChild(createTabPanel({
  content: 'Content for Tab 1'
}));

tabs.appendChild(createTabPanel({
  content: 'Content for Tab 2'
}));
```

### AppLayout

A layout component for applications.

```javascript
// Create app layout
const appLayout = createAppLayout({
  sidebarOpen: true
});

// Add header
appLayout.appendChild(createAppHeader({
  title: 'My App'
}));

// Add sidebar
appLayout.appendChild(createAppSidebar({
  content: sidebarContent
}));

// Add content
appLayout.appendChild(createAppContent({
  content: mainContent
}));

// Add footer
appLayout.appendChild(createAppFooter({
  text: '© 2025 Kosmo OS'
}));
```

## Extending the Library

To add a new component:

1. Create a new file in the appropriate category folder
2. Define the component class extending HTMLElement
3. Implement the component's functionality
4. Create factory functions for easy usage
5. Export the component and factory functions
6. Add the component to the index.js exports