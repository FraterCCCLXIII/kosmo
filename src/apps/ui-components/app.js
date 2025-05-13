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

/**
 * Create a component card
 * @param {string} title - Component title
 * @param {HTMLElement} container - Container element
 * @param {Function} renderFn - Function to render component examples
 */
function createComponentCard(title, container, renderFn) {
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
  card.style.minHeight = '200px';
  
  // Create card header
  const header = document.createElement('h3');
  header.textContent = title;
  header.style.margin = '0';
  header.style.fontSize = '18px';
  header.style.fontWeight = 'bold';
  header.style.color = '#333';
  header.style.borderBottom = '1px solid #eee';
  header.style.paddingBottom = '8px';
  card.appendChild(header);
  
  // Create examples container
  const examplesContainer = document.createElement('div');
  examplesContainer.style.display = 'flex';
  examplesContainer.style.flexDirection = 'column';
  examplesContainer.style.gap = '12px';
  examplesContainer.style.flex = '1';
  examplesContainer.style.padding = '8px 0';
  
  // Render examples
  try {
    renderFn(examplesContainer);
  } catch (error) {
    console.error(`Error rendering ${title} examples:`, error);
    const errorEl = document.createElement('div');
    errorEl.textContent = `Error: ${error.message}`;
    errorEl.style.color = 'red';
    errorEl.style.padding = '8px';
    errorEl.style.backgroundColor = '#fff0f0';
    errorEl.style.borderRadius = '4px';
    examplesContainer.appendChild(errorEl);
  }
  
  card.appendChild(examplesContainer);
  container.appendChild(card);
}

/**
 * Create an example container
 * @param {HTMLElement} container - Parent container
 * @returns {HTMLElement} Example container
 */
function createExampleContainer(container) {
  const exampleContainer = document.createElement('div');
  exampleContainer.style.padding = '8px';
  exampleContainer.style.backgroundColor = '#f9f9f9';
  exampleContainer.style.borderRadius = '4px';
  container.appendChild(exampleContainer);
  return exampleContainer;
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
  appContainer.style.display = 'flex';
  appContainer.style.flexDirection = 'column';
  
  // Create header
  const header = document.createElement('div');
  header.style.marginBottom = '20px';
  header.style.borderBottom = '1px solid #ddd';
  header.style.paddingBottom = '10px';
  
  const title = document.createElement('h2');
  title.textContent = 'UI Components Showcase';
  title.style.margin = '0 0 10px 0';
  title.style.color = '#333';
  
  const description = document.createElement('p');
  description.textContent = 'A showcase of all UI components available in the Kosmo OS UI Kit';
  description.style.margin = '0';
  description.style.color = '#666';
  
  header.appendChild(title);
  header.appendChild(description);
  appContainer.appendChild(header);
  
  // Create components grid
  const componentsGrid = document.createElement('div');
  componentsGrid.style.display = 'grid';
  componentsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
  componentsGrid.style.gap = '20px';
  componentsGrid.style.flex = '1';
  
  // Add Button component card
  createComponentCard('Button', componentsGrid, (container) => {
    // Primary button
    const primaryExample = createExampleContainer(container);
    primaryExample.appendChild(createButton({ 
      text: 'Primary Button', 
      variant: 'primary' 
    }));
    
    // Secondary button
    const secondaryExample = createExampleContainer(container);
    secondaryExample.appendChild(createButton({ 
      text: 'Secondary Button', 
      variant: 'secondary' 
    }));
    
    // Text button
    const textExample = createExampleContainer(container);
    textExample.appendChild(createButton({ 
      text: 'Text Button', 
      variant: 'text' 
    }));
    
    // Disabled button
    const disabledExample = createExampleContainer(container);
    disabledExample.appendChild(createButton({ 
      text: 'Disabled Button', 
      disabled: true 
    }));
  });
  
  // Add Checkbox component card
  createComponentCard('Checkbox', componentsGrid, (container) => {
    // Unchecked checkbox
    const uncheckedExample = createExampleContainer(container);
    uncheckedExample.appendChild(createCheckbox({ 
      label: 'Unchecked', 
      checked: false 
    }));
    
    // Checked checkbox
    const checkedExample = createExampleContainer(container);
    checkedExample.appendChild(createCheckbox({ 
      label: 'Checked', 
      checked: true 
    }));
    
    // Disabled checkbox
    const disabledExample = createExampleContainer(container);
    disabledExample.appendChild(createCheckbox({ 
      label: 'Disabled', 
      disabled: true 
    }));
  });
  
  // Add Dropdown component card
  createComponentCard('Dropdown', componentsGrid, (container) => {
    // Standard dropdown
    const standardExample = createExampleContainer(container);
    standardExample.appendChild(createDropdown({ 
      label: 'Select an option',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ]
    }));
    
    // Disabled dropdown
    const disabledExample = createExampleContainer(container);
    disabledExample.appendChild(createDropdown({ 
      label: 'Disabled dropdown',
      disabled: true,
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ]
    }));
  });
  
  // Add Input Field component card
  createComponentCard('Input Field', componentsGrid, (container) => {
    // Text input
    const textExample = createExampleContainer(container);
    textExample.appendChild(createInputField({ 
      label: 'Text Input', 
      placeholder: 'Enter text...' 
    }));
    
    // Password input
    const passwordExample = createExampleContainer(container);
    passwordExample.appendChild(createInputField({ 
      label: 'Password Input', 
      type: 'password', 
      placeholder: 'Enter password...' 
    }));
    
    // Disabled input
    const disabledExample = createExampleContainer(container);
    disabledExample.appendChild(createInputField({ 
      label: 'Disabled Input', 
      disabled: true, 
      placeholder: 'Disabled' 
    }));
  });
  
  // Add Loader component card
  createComponentCard('Loader', componentsGrid, (container) => {
    // Small loader
    const smallExample = createExampleContainer(container);
    smallExample.appendChild(createLoader({ size: 'small' }));
    
    // Medium loader
    const mediumExample = createExampleContainer(container);
    mediumExample.appendChild(createLoader({ size: 'medium' }));
    
    // Large loader
    const largeExample = createExampleContainer(container);
    largeExample.appendChild(createLoader({ size: 'large' }));
  });
  
  // Add Toast component card
  createComponentCard('Toast', componentsGrid, (container) => {
    // Success toast
    const successExample = createExampleContainer(container);
    successExample.appendChild(createToast({ 
      message: 'Success message', 
      type: 'success' 
    }));
    
    // Error toast
    const errorExample = createExampleContainer(container);
    errorExample.appendChild(createToast({ 
      message: 'Error message', 
      type: 'error' 
    }));
    
    // Info toast
    const infoExample = createExampleContainer(container);
    infoExample.appendChild(createToast({ 
      message: 'Info message', 
      type: 'info' 
    }));
  });
  
  appContainer.appendChild(componentsGrid);
  
  // Add footer
  const footer = document.createElement('div');
  footer.style.marginTop = '20px';
  footer.style.borderTop = '1px solid #ddd';
  footer.style.paddingTop = '10px';
  footer.style.color = '#666';
  footer.style.fontSize = '12px';
  footer.style.textAlign = 'center';
  footer.textContent = 'Kosmo OS UI Kit - Version 0.1.0';
  appContainer.appendChild(footer);
  
  container.appendChild(appContainer);
}

/**
 * Launch the UI Components app
 */
export async function launch() {
  console.log('Launching UI Components app...');
  
  try {
    // Get window manager
    console.log('Getting window manager...');
    const windowManager = await getWindowManager();
    console.log('Window manager obtained:', windowManager);
    
    // Create window
    console.log('Creating window...');
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
    console.log('Window created:', window);
    
    // Initialize UI Components app in window content
    console.log('Window content element:', window.getContentElement());
    
    // Make sure the content element has proper styling
    const contentEl = window.getContentElement();
    contentEl.style.display = 'flex';
    contentEl.style.flexDirection = 'column';
    contentEl.style.width = '100%';
    contentEl.style.height = '100%';
    contentEl.style.overflow = 'hidden';
    contentEl.style.backgroundColor = '#f5f5f5';
    
    // Add a small delay to ensure the window is fully rendered
    console.log('Setting timeout to initialize app...');
    setTimeout(() => {
      console.log('Timeout fired, initializing UI Components app...');
      try {
        initUIComponentsApp(contentEl);
        console.log('UI Components app initialized successfully');
      } catch (innerError) {
        console.error('Error in delayed initialization:', innerError);
        contentEl.innerHTML = `
          <div style="padding: 20px; color: red;">
            <h3>Error initializing UI Components app (delayed)</h3>
            <p>${innerError.message}</p>
            <pre>${innerError.stack}</pre>
          </div>
        `;
      }
    }, 300); // Increased delay
    
    console.log('Returning window object...');
    return window;
  } catch (error) {
    console.error('Error in UI Components app launch:', error);
    alert('Failed to launch UI Components app: ' + error.message);
    throw error;
  }
}