# Kosmo OS UI Kit

A cross-platform, AI-first operating system GUI framework that can be used across devices, contexts, and operating systems (desktop, mobile, watch, etc). The framework is designed to be AI-first, allowing AI to access all aspects of the OS front-end and back-end.

## Project Overview

This framework provides a foundation for building AI-integrated operating system interfaces that work across multiple platforms. It includes:

- Window management system
- Virtual file system
- Theme management
- Internationalization support
- AI integration
- App management
- Git integration

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kosmo-os-ui-kit.git
cd kosmo-os-ui-kit
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

## Project Structure

```
📦 kosmo-os-ui-kit/
├── index.html ← Main entry HTML for bootstrapping the app
├── /src/
│ ├── main.js ← App entry point. Initializes core systems and launches UI
│ ├── config.js ← Global settings: themes, initial apps, platform config
│ ├── assets/ ← Static assets (e.g., images, branding)
│ │ └── logo.png ← Example app logo
│
│ ├── git/ ← Git integration system
│ │ ├── GitProvider.js ← Abstract Git interface (pull, push, branch, etc.)
│ │ ├── GitHubProvider.js ← GitHub-specific implementation
│ │ ├── FakeGitProvider.js ← Stub for testing/mock environments
│ │ └── GitConnector.js ← Interface for connecting GitProvider with UI
│
│ ├── fs/ ← Virtual file system
│ │ └── VirtualFS.js ← In-memory file/folder management
│
│ ├── i18n/ ← Internationalization (translation)
│ │ ├── index.js ← Language manager and string fetcher
│ │ ├── en.json ← English translations
│ │ └── es.json ← Spanish translations (example)
│
│ ├── persistence/ ← Save/load user preferences, session state, etc.
│ │ ├── LocalStorageAdapter.js ← Handles storage using browser localStorage
│ │ └── SessionManager.js ← Tracks and restores open windows, app states
│
│ ├── router/ ← Optional route/view manager (for stateful navigation)
│ │ └── Router.js ← Simple hash-based routing system
│
│ ├── ui/ ← Core UI engine and components
│ │ ├── Accessibility.js ← a11y helpers: focus trap, keyboard nav, screen reader support
│ │ ├── Announcer.js ← ARIA live region for screen readers
│ │ ├── WindowManager.js ← Z-index, window focus, modal behavior
│ │ ├── AppLauncher.js ← Grid or start menu of available apps
│ │ ├── Taskbar.js ← Running apps UI, minimize/maximize
│ │ ├── Modal.js ← Base modal/dialog wrapper
│ │ ├── ThemeManager.js ← Theme switcher using CSS variables
│ │ ├── DeviceContext.js ← Media query and platform detection
│ │ ├── GitOperationWindow.js ← Modal for git actions: pull, push, etc.
│ │ └── UIComponents/ ← All fundamental UI parts, categorized below:
│ │ ├── layout/
│ │ │ ├── Container.js ← Layout wrapper with padding/responsive breakpoints
│ │ │ └── Grid.js ← Grid system layout
│ │ ├── inputs/
│ │ │ ├── Button.js ← Accessible, styled button with states
│ │ │ ├── InputField.js ← Text/number/email inputs
│ │ │ ├── Dropdown.js ← Select dropdown with keyboard nav
│ │ │ └── Checkbox.js ← Checkbox with label and aria
│ │ ├── feedback/
│ │ │ ├── Loader.js ← Loading spinner
│ │ │ └── Toast.js ← Notification popups
│ │ └── navigation/
│ │ ├── Tabs.js ← Tabbed navigation
│ │ └── Menu.js ← Dropdown or sidebar menu
│
│ ├── apps/ ← Native app definitions
│ │ ├── calculator/ ← Sample app
│ │ │ ├── icon.png
│ │ │ ├── app.js ← Mounts app window
│ │ │ └── manifest.json ← Title, icon, meta info
│ │ ├── text-editor/
│ │ ├── browser/
│ │ └── todo-list/
│
│ ├── sandbox/ ← Secure iframe-based execution
│ │ ├── sandbox.js ← Injects and manages iframe context
│ │ └── index.html ← Target frame for loading app content
│
│ ├── ai/ ← AI chat, command, and context panel
│ │ └── AiPanel.js ← Integrated AI agent UI + executor
│
│ ├── styles/
│ │ └── main.css ← Global theme variables, layout rules, media queries
│
│ ├── tests/ ← Unit testing directory
│ │ ├── Button.test.js
│ │ ├── GitConnector.test.js
│ │ ├── ThemeManager.test.js
│ │ └── WindowManager.test.js
```

## Core Features

### Window Management

The `WindowManager.js` provides a complete window management system with:
- Window creation, focus, and z-index management
- Draggable and resizable windows
- Minimize, maximize, and restore functionality
- Modal windows

### Theme System

The `ThemeManager.js` implements a theme system using CSS variables that:
- Supports light, dark, and custom themes
- Detects system preferences
- Allows runtime theme switching
- Provides consistent styling across the OS

### Virtual File System

The `VirtualFS.js` provides an in-memory file system that:
- Supports standard file operations (create, read, write, delete)
- Handles directories and file hierarchies
- Persists data using localStorage
- Provides a familiar file system API

### AI Integration

The `AiPanel.js` implements an AI assistant that:
- Provides a chat interface for user interaction
- Can execute commands and access OS features
- Maintains context awareness
- Integrates with the rest of the OS

## Development

### Adding a New Component

1. Create a new file in the appropriate directory
2. Implement the component using the established patterns
3. Export the component
4. Import and use the component where needed

### Adding a New App

1. Create a new directory in `src/apps/`
2. Create the necessary files (app.js, manifest.json, icon.png)
3. Implement the app using the OS APIs
4. Register the app in `config.js`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.