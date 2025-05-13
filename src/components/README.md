# Kosmo OS UI Component System

This directory contains the UI component system for Kosmo OS. The component system is designed to be modular, reusable, and consistent across all applications.

## Architecture

The component system follows a hierarchical structure:

```
components/
├── core/           # Core components used across the system
├── layout/         # Layout components for structuring content
├── inputs/         # Input components for user interaction
├── display/        # Display components for showing content
├── navigation/     # Navigation components for moving between views
├── feedback/       # Feedback components for user notifications
├── media/          # Media-specific components
├── productivity/   # Productivity-specific components
└── registry.js     # Central registry for all components
```

## Design Tokens

The design system is built on a foundation of design tokens, which are stored in the `styles/tokens` directory:

```
styles/
├── tokens/         # Design tokens (colors, typography, spacing, etc.)
├── themes/         # Theme definitions (light, dark)
└── utilities/      # Utility classes
```

Design tokens include:
- Colors
- Typography
- Spacing
- Shadows
- Borders
- Animations

## Themes

The system supports multiple themes, with light and dark modes implemented by default. Themes are applied using CSS variables, which are defined in the `styles/themes` directory.

## Component Registry

All components are registered in the central `registry.js` file, which serves as the single source of truth for component imports. This approach:

1. Simplifies imports across the application
2. Provides a clear overview of available components
3. Facilitates component versioning and deprecation
4. Enables centralized component documentation

## Usage Guidelines

### Importing Components

Always import components from the registry, not directly from their source files:

```javascript
// Good
import { Button, Card } from '../../components/registry';

// Bad
import Button from '../../components/core/Button';
```

### Component Customization

Components should be customized using props, not by modifying their source code:

```javascript
// Good
<Button variant="primary" size="large" fullWidth />

// Bad - Don't create custom variants by copying and modifying component code
```

### Creating New Components

When creating new components:

1. Place them in the appropriate category directory
2. Follow the established naming and coding conventions
3. Include proper documentation
4. Register them in the registry.js file

## Accessibility

All components are designed with accessibility in mind:

- Proper ARIA attributes
- Keyboard navigation support
- Sufficient color contrast
- Screen reader compatibility
- Focus management

## Performance Considerations

Components are optimized for performance:

- Minimal DOM manipulation
- Efficient rendering
- Lazy loading where appropriate
- Optimized CSS

## App Template System

For application development, use the AppTemplate component from the `_template` directory:

```javascript
import AppTemplate from '../_template/AppTemplate';

const MyApp = ({ appName, appIcon, onClose }) => {
  return (
    <AppTemplate
      appName={appName}
      appIcon={appIcon}
      onClose={onClose}
    >
      {/* App content goes here */}
    </AppTemplate>
  );
};
```

## Coming Soon Modal

For apps that are not yet implemented, use the ComingSoonModal component:

```javascript
import { ComingSoonModal } from '../_template/AppTemplate';

// In your app's launch function
root.render(
  <ComingSoonModal
    appName="My App"
    appIcon={<MyAppIcon />}
    appDescription="Description of my app"
    onClose={() => window.close()}
  />
);
```