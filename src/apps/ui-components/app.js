/**
 * UI Components App
 * 
 * Showcases all UI components from the Kosmo OS UI Kit in a grid of cards
 */

import { getWindowManager } from '../../ui/WindowManager.js';
import { createButton } from '../../ui/UIComponents/inputs/Button.js';
import { createCheckbox } from '../../ui/UIComponents/inputs/Checkbox.js';
import { createDropdown } from '../../ui/UIComponents/inputs/Dropdown.js';
import { createInputField } from '../../ui/UIComponents/inputs/InputField.js';
import { createLoader } from '../../ui/UIComponents/feedback/Loader.js';
import { createToast } from '../../ui/UIComponents/feedback/Toast.js';
import { createContainer } from '../../ui/UIComponents/layout/Container.js';
import { createGrid } from '../../ui/UIComponents/layout/Grid.js';

// Component definitions with examples
const components = [
  {
    name: 'Button',
    component: createButton,
    examples: [
      { props: { text: 'Primary Button', variant: 'primary' } },
      { props: { text: 'Secondary Button', variant: 'secondary' } },
      { props: { text: 'Text Button', variant: 'text' } },
      { props: { text: 'Disabled Button', disabled: true } }
    ]
  },
  {
    name: 'Checkbox',
    component: createCheckbox,
    examples: [
      { props: { label: 'Unchecked', checked: false } },
      { props: { label: 'Checked', checked: true } },
      { props: { label: 'Disabled', disabled: true } }
    ]
  },
  {
    name: 'Dropdown',
    component: createDropdown,
    examples: [
      { 
        props: { 
          label: 'Select an option',
          options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' }
          ]
        } 
      }
    ]
  },
  {
    name: 'Input Field',
    component: createInputField,
    examples: [
      { props: { label: 'Text Input', placeholder: 'Enter text...' } },
      { props: { label: 'Password', type: 'password', placeholder: 'Enter password...' } },
      { props: { label: 'Disabled', disabled: true, value: 'Disabled input' } }
    ]
  },
  {
    name: 'Loader',
    component: createLoader,
    examples: [
      { props: { size: 'small' } },
      { props: { size: 'medium' } },
      { props: { size: 'large' } }
    ]
  },
  {
    name: 'Toast',
    component: createToast,
    examples: [
      { props: { message: 'Success message', type: 'success' } },
      { props: { message: 'Error message', type: 'error' } },
      { props: { message: 'Info message', type: 'info' } }
    ]
  }
];

/**
 * Create a component card
 * @param {Object} componentInfo - Component information
 * @param {HTMLElement} container - Container element
 */
function createComponentCard(componentInfo, container) {
  const { name, component, examples } = componentInfo;
  
  // Create card container
  const card = document.createElement('div');
  card.className = 'component-card';
  card.style.border = '1px solid #ddd';
  card.style.borderRadius = '8px';
  card.style.padding = '16px';
  card.style.backgroundColor = '#fff';
  card.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
  card.style.display = 'flex';
  card.style.flexDirection = 'column';
  card.style.gap = '12px';
  
  // Create card header
  const header = document.createElement('h3');
  header.textContent = name;
  header.style.margin = '0';
  header.style.fontSize = '18px';
  header.style.fontWeight = 'bold';
  header.style.color = '#333';
  card.appendChild(header);
  
  // Create examples container
  const examplesContainer = document.createElement('div');
  examplesContainer.style.display = 'flex';
  examplesContainer.style.flexDirection = 'column';
  examplesContainer.style.gap = '8px';
  
  // Add examples
  examples.forEach((example, index) => {
    const exampleContainer = document.createElement('div');
    exampleContainer.style.padding = '8px';
    exampleContainer.style.backgroundColor = '#f9f9f9';
    exampleContainer.style.borderRadius = '4px';
    
    try {
      // Create component instance
      const componentInstance = component(example.props);
      
      // If the component returns an HTML element, append it
      if (componentInstance instanceof HTMLElement) {
        exampleContainer.appendChild(componentInstance);
      } 
      // If the component returns a string, set it as innerHTML
      else if (typeof componentInstance === 'string') {
        exampleContainer.innerHTML = componentInstance;
      }
      // If the component is a function that needs to be called with a container
      else if (typeof componentInstance === 'function') {
        componentInstance(exampleContainer);
      }
    } catch (error) {
      console.error(`Error rendering ${name} example ${index}:`, error);
      exampleContainer.textContent = `Error: ${error.message}`;
      exampleContainer.style.color = 'red';
    }
    
    examplesContainer.appendChild(exampleContainer);
  });
  
  card.appendChild(examplesContainer);
  container.appendChild(card);
}

/**
 * Initialize the UI Components app
 * @param {HTMLElement} container - Container element
 */
function initUIComponentsApp(container) {
  // Create app container
  const appContainer = document.createElement('div');
  appContainer.style.padding = '20px';
  appContainer.style.height = '100%';
  appContainer.style.overflow = 'auto';
  
  // Create title
  const title = document.createElement('h2');
  title.textContent = 'UI Components Showcase';
  title.style.marginBottom = '20px';
  title.style.color = '#333';
  appContainer.appendChild(title);
  
  // Create components grid
  const componentsGrid = document.createElement('div');
  componentsGrid.style.display = 'grid';
  componentsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
  componentsGrid.style.gap = '20px';
  
  // Add component cards to grid
  components.forEach(componentInfo => {
    createComponentCard(componentInfo, componentsGrid);
  });
  
  appContainer.appendChild(componentsGrid);
  container.appendChild(appContainer);
}

/**
 * Launch the UI Components app
 */
export async function launch() {
  console.log('Launching UI Components app...');
  
  // Get window manager
  const windowManager = await getWindowManager();
  
  // Create window
  const window = windowManager.createWindow({
    title: 'UI Components',
    width: 800,
    height: 600,
    x: 100,
    y: 100,
    resizable: true,
    maximizable: true,
    minimizable: true,
    closable: true
  });
  
  // Initialize UI Components app in window content
  console.log('Window content element:', window.getContentElement());
  try {
    // Make sure the content element has proper styling
    const contentEl = window.getContentElement();
    contentEl.style.display = 'flex';
    contentEl.style.flexDirection = 'column';
    contentEl.style.width = '100%';
    contentEl.style.height = '100%';
    contentEl.style.overflow = 'hidden';
    
    initUIComponentsApp(contentEl);
    console.log('UI Components app initialized successfully');
  } catch (error) {
    console.error('Error initializing UI Components app:', error);
    window.getContentElement().innerHTML = `
      <div style="padding: 20px; color: red;">
        <h3>Error initializing UI Components app</h3>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
  
  return window;
}