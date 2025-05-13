/**
 * UI Components App
 * Showcase of all UI components in the Kosmo OS UI Kit
 */

import { getWindowManager } from '../../ui/WindowManager.js';

/**
 * Initialize the UI Components app
 * @param {HTMLElement} containerEl - Container element
 */
function initUIComponentsApp(containerEl) {
  console.log('Initializing UI Components app...');
  
  // Create app container
  const appContainer = document.createElement('div');
  appContainer.className = 'ui-components-app';
  appContainer.style.width = '100%';
  appContainer.style.height = '100%';
  appContainer.style.overflow = 'auto';
  appContainer.style.padding = '20px';
  
  // Create header
  const header = document.createElement('header');
  header.style.marginBottom = '20px';
  
  const title = document.createElement('h1');
  title.textContent = 'UI Components';
  title.style.fontSize = '24px';
  title.style.fontWeight = 'bold';
  title.style.marginBottom = '10px';
  
  const description = document.createElement('p');
  description.textContent = 'Showcase of all UI components in the Kosmo OS UI Kit';
  description.style.color = '#666';
  
  header.appendChild(title);
  header.appendChild(description);
  appContainer.appendChild(header);
  
  // Create components grid
  const componentsGrid = document.createElement('div');
  componentsGrid.className = 'components-grid';
  componentsGrid.style.display = 'grid';
  componentsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
  componentsGrid.style.gap = '20px';
  
  // Add component cards
  const components = [
    { name: 'Buttons', render: renderButtonsCard },
    { name: 'Inputs', render: renderInputsCard },
    { name: 'Layout', render: renderLayoutCard },
    { name: 'Feedback', render: renderFeedbackCard }
  ];
  
  components.forEach(component => {
    try {
      const card = createComponentCard(component.name, component.render);
      componentsGrid.appendChild(card);
    } catch (error) {
      console.error(`Error creating ${component.name} card:`, error);
      const errorCard = createErrorCard(component.name, error);
      componentsGrid.appendChild(errorCard);
    }
  });
  
  appContainer.appendChild(componentsGrid);
  
  // Add container to the DOM
  containerEl.appendChild(appContainer);
}

/**
 * Create a component card
 * @param {string} name - Component name
 * @param {Function} renderFn - Function to render component example
 * @returns {HTMLElement} Card element
 */
function createComponentCard(name, renderFn) {
  const card = document.createElement('div');
  card.className = 'component-card';
  card.style.backgroundColor = 'white';
  card.style.borderRadius = '8px';
  card.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
  card.style.overflow = 'hidden';
  
  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';
  cardHeader.style.padding = '15px';
  cardHeader.style.borderBottom = '1px solid #eee';
  cardHeader.style.backgroundColor = '#f9f9f9';
  
  const cardTitle = document.createElement('h2');
  cardTitle.textContent = name;
  cardTitle.style.margin = '0';
  cardTitle.style.fontSize = '18px';
  cardTitle.style.fontWeight = '600';
  
  cardHeader.appendChild(cardTitle);
  card.appendChild(cardHeader);
  
  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';
  cardContent.style.padding = '20px';
  cardContent.style.minHeight = '150px';
  cardContent.style.display = 'flex';
  cardContent.style.flexDirection = 'column';
  cardContent.style.alignItems = 'center';
  cardContent.style.justifyContent = 'center';
  
  try {
    renderFn(cardContent);
  } catch (error) {
    console.error(`Error rendering ${name}:`, error);
    cardContent.innerHTML = `
      <div style="color: red; text-align: center;">
        <p>Error rendering component</p>
        <small>${error.message}</small>
      </div>
    `;
  }
  
  card.appendChild(cardContent);
  
  return card;
}

/**
 * Create an error card for a component that failed to render
 * @param {string} name - Component name
 * @param {Error} error - Error object
 * @returns {HTMLElement} Error card element
 */
function createErrorCard(name, error) {
  const card = document.createElement('div');
  card.className = 'component-card error';
  card.style.backgroundColor = '#fff0f0';
  card.style.borderRadius = '8px';
  card.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
  card.style.overflow = 'hidden';
  
  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';
  cardHeader.style.padding = '15px';
  cardHeader.style.borderBottom = '1px solid #ffcccc';
  cardHeader.style.backgroundColor = '#fff0f0';
  
  const cardTitle = document.createElement('h2');
  cardTitle.textContent = `${name} (Error)`;
  cardTitle.style.margin = '0';
  cardTitle.style.fontSize = '18px';
  cardTitle.style.fontWeight = '600';
  cardTitle.style.color = '#cc0000';
  
  cardHeader.appendChild(cardTitle);
  card.appendChild(cardHeader);
  
  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';
  cardContent.style.padding = '20px';
  cardContent.style.minHeight = '150px';
  
  const errorMessage = document.createElement('div');
  errorMessage.style.color = '#cc0000';
  errorMessage.style.textAlign = 'center';
  
  const errorTitle = document.createElement('p');
  errorTitle.textContent = 'Failed to render component';
  errorTitle.style.fontWeight = 'bold';
  errorTitle.style.marginBottom = '10px';
  
  const errorDetails = document.createElement('pre');
  errorDetails.textContent = error.message;
  errorDetails.style.fontSize = '12px';
  errorDetails.style.padding = '10px';
  errorDetails.style.backgroundColor = '#ffeeee';
  errorDetails.style.borderRadius = '4px';
  errorDetails.style.overflow = 'auto';
  errorDetails.style.maxHeight = '100px';
  
  errorMessage.appendChild(errorTitle);
  errorMessage.appendChild(errorDetails);
  cardContent.appendChild(errorMessage);
  card.appendChild(cardContent);
  
  return card;
}

// Component render functions
function renderButtonsCard(container) {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.display = 'flex';
  buttonsContainer.style.flexDirection = 'column';
  buttonsContainer.style.gap = '10px';
  
  // Primary button
  const primaryButton = document.createElement('button');
  primaryButton.textContent = 'Primary Button';
  primaryButton.style.padding = '8px 16px';
  primaryButton.style.borderRadius = '4px';
  primaryButton.style.backgroundColor = '#007bff';
  primaryButton.style.color = 'white';
  primaryButton.style.border = 'none';
  primaryButton.style.cursor = 'pointer';
  
  // Secondary button
  const secondaryButton = document.createElement('button');
  secondaryButton.textContent = 'Secondary Button';
  secondaryButton.style.padding = '8px 16px';
  secondaryButton.style.borderRadius = '4px';
  secondaryButton.style.backgroundColor = '#6c757d';
  secondaryButton.style.color = 'white';
  secondaryButton.style.border = 'none';
  secondaryButton.style.cursor = 'pointer';
  
  // Danger button
  const dangerButton = document.createElement('button');
  dangerButton.textContent = 'Danger Button';
  dangerButton.style.padding = '8px 16px';
  dangerButton.style.borderRadius = '4px';
  dangerButton.style.backgroundColor = '#dc3545';
  dangerButton.style.color = 'white';
  dangerButton.style.border = 'none';
  dangerButton.style.cursor = 'pointer';
  
  buttonsContainer.appendChild(primaryButton);
  buttonsContainer.appendChild(secondaryButton);
  buttonsContainer.appendChild(dangerButton);
  container.appendChild(buttonsContainer);
}

function renderInputsCard(container) {
  const inputsContainer = document.createElement('div');
  inputsContainer.style.display = 'flex';
  inputsContainer.style.flexDirection = 'column';
  inputsContainer.style.gap = '15px';
  inputsContainer.style.width = '100%';
  
  // Text input
  const textInputGroup = document.createElement('div');
  textInputGroup.style.display = 'flex';
  textInputGroup.style.flexDirection = 'column';
  textInputGroup.style.gap = '5px';
  
  const textInputLabel = document.createElement('label');
  textInputLabel.textContent = 'Text Input';
  textInputLabel.style.fontSize = '14px';
  textInputLabel.style.fontWeight = '500';
  
  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.placeholder = 'Enter text...';
  textInput.style.padding = '8px 12px';
  textInput.style.borderRadius = '4px';
  textInput.style.border = '1px solid #ced4da';
  
  textInputGroup.appendChild(textInputLabel);
  textInputGroup.appendChild(textInput);
  
  // Checkbox
  const checkboxGroup = document.createElement('div');
  checkboxGroup.style.display = 'flex';
  checkboxGroup.style.alignItems = 'center';
  checkboxGroup.style.gap = '8px';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'demo-checkbox';
  
  const checkboxLabel = document.createElement('label');
  checkboxLabel.textContent = 'Checkbox';
  checkboxLabel.htmlFor = 'demo-checkbox';
  checkboxLabel.style.fontSize = '14px';
  
  checkboxGroup.appendChild(checkbox);
  checkboxGroup.appendChild(checkboxLabel);
  
  // Radio buttons
  const radioGroup = document.createElement('div');
  radioGroup.style.display = 'flex';
  radioGroup.style.flexDirection = 'column';
  radioGroup.style.gap = '8px';
  
  const radioGroupLabel = document.createElement('div');
  radioGroupLabel.textContent = 'Radio Buttons';
  radioGroupLabel.style.fontSize = '14px';
  radioGroupLabel.style.fontWeight = '500';
  radioGroupLabel.style.marginBottom = '5px';
  
  const radio1Group = document.createElement('div');
  radio1Group.style.display = 'flex';
  radio1Group.style.alignItems = 'center';
  radio1Group.style.gap = '8px';
  
  const radio1 = document.createElement('input');
  radio1.type = 'radio';
  radio1.name = 'demo-radio';
  radio1.id = 'radio1';
  radio1.checked = true;
  
  const radio1Label = document.createElement('label');
  radio1Label.textContent = 'Option 1';
  radio1Label.htmlFor = 'radio1';
  radio1Label.style.fontSize = '14px';
  
  radio1Group.appendChild(radio1);
  radio1Group.appendChild(radio1Label);
  
  const radio2Group = document.createElement('div');
  radio2Group.style.display = 'flex';
  radio2Group.style.alignItems = 'center';
  radio2Group.style.gap = '8px';
  
  const radio2 = document.createElement('input');
  radio2.type = 'radio';
  radio2.name = 'demo-radio';
  radio2.id = 'radio2';
  
  const radio2Label = document.createElement('label');
  radio2Label.textContent = 'Option 2';
  radio2Label.htmlFor = 'radio2';
  radio2Label.style.fontSize = '14px';
  
  radio2Group.appendChild(radio2);
  radio2Group.appendChild(radio2Label);
  
  radioGroup.appendChild(radioGroupLabel);
  radioGroup.appendChild(radio1Group);
  radioGroup.appendChild(radio2Group);
  
  inputsContainer.appendChild(textInputGroup);
  inputsContainer.appendChild(checkboxGroup);
  inputsContainer.appendChild(radioGroup);
  container.appendChild(inputsContainer);
}

function renderLayoutCard(container) {
  const layoutContainer = document.createElement('div');
  layoutContainer.style.display = 'flex';
  layoutContainer.style.flexDirection = 'column';
  layoutContainer.style.gap = '15px';
  layoutContainer.style.width = '100%';
  
  // Card example
  const card = document.createElement('div');
  card.style.padding = '15px';
  card.style.borderRadius = '4px';
  card.style.border = '1px solid #dee2e6';
  card.style.backgroundColor = '#f8f9fa';
  
  const cardTitle = document.createElement('h3');
  cardTitle.textContent = 'Card Component';
  cardTitle.style.margin = '0 0 10px 0';
  cardTitle.style.fontSize = '16px';
  
  const cardContent = document.createElement('p');
  cardContent.textContent = 'This is an example card component with some content.';
  cardContent.style.margin = '0';
  cardContent.style.fontSize = '14px';
  
  card.appendChild(cardTitle);
  card.appendChild(cardContent);
  
  // Tabs example
  const tabsContainer = document.createElement('div');
  tabsContainer.style.display = 'flex';
  tabsContainer.style.flexDirection = 'column';
  tabsContainer.style.width = '100%';
  
  const tabsHeader = document.createElement('div');
  tabsHeader.style.display = 'flex';
  tabsHeader.style.borderBottom = '1px solid #dee2e6';
  
  const tab1 = document.createElement('div');
  tab1.textContent = 'Tab 1';
  tab1.style.padding = '8px 16px';
  tab1.style.cursor = 'pointer';
  tab1.style.borderBottom = '2px solid #007bff';
  tab1.style.color = '#007bff';
  
  const tab2 = document.createElement('div');
  tab2.textContent = 'Tab 2';
  tab2.style.padding = '8px 16px';
  tab2.style.cursor = 'pointer';
  tab2.style.color = '#6c757d';
  
  const tab3 = document.createElement('div');
  tab3.textContent = 'Tab 3';
  tab3.style.padding = '8px 16px';
  tab3.style.cursor = 'pointer';
  tab3.style.color = '#6c757d';
  
  tabsHeader.appendChild(tab1);
  tabsHeader.appendChild(tab2);
  tabsHeader.appendChild(tab3);
  
  const tabContent = document.createElement('div');
  tabContent.textContent = 'Content for Tab 1';
  tabContent.style.padding = '15px';
  tabContent.style.fontSize = '14px';
  
  tabsContainer.appendChild(tabsHeader);
  tabsContainer.appendChild(tabContent);
  
  layoutContainer.appendChild(card);
  layoutContainer.appendChild(tabsContainer);
  container.appendChild(layoutContainer);
}

function renderFeedbackCard(container) {
  const feedbackContainer = document.createElement('div');
  feedbackContainer.style.display = 'flex';
  feedbackContainer.style.flexDirection = 'column';
  feedbackContainer.style.gap = '15px';
  feedbackContainer.style.width = '100%';
  
  // Alert
  const alert = document.createElement('div');
  alert.textContent = 'This is an alert message';
  alert.style.padding = '12px 15px';
  alert.style.borderRadius = '4px';
  alert.style.backgroundColor = '#cce5ff';
  alert.style.color = '#004085';
  alert.style.border = '1px solid #b8daff';
  
  // Progress bar
  const progressContainer = document.createElement('div');
  progressContainer.style.display = 'flex';
  progressContainer.style.flexDirection = 'column';
  progressContainer.style.gap = '5px';
  
  const progressLabel = document.createElement('div');
  progressLabel.textContent = 'Progress Bar (75%)';
  progressLabel.style.fontSize = '14px';
  
  const progressBarOuter = document.createElement('div');
  progressBarOuter.style.width = '100%';
  progressBarOuter.style.height = '10px';
  progressBarOuter.style.backgroundColor = '#e9ecef';
  progressBarOuter.style.borderRadius = '5px';
  progressBarOuter.style.overflow = 'hidden';
  
  const progressBarInner = document.createElement('div');
  progressBarInner.style.width = '75%';
  progressBarInner.style.height = '100%';
  progressBarInner.style.backgroundColor = '#007bff';
  
  progressBarOuter.appendChild(progressBarInner);
  progressContainer.appendChild(progressLabel);
  progressContainer.appendChild(progressBarOuter);
  
  // Toast button
  const toastButton = document.createElement('button');
  toastButton.textContent = 'Show Toast Notification';
  toastButton.style.padding = '8px 16px';
  toastButton.style.borderRadius = '4px';
  toastButton.style.backgroundColor = '#28a745';
  toastButton.style.color = 'white';
  toastButton.style.border = 'none';
  toastButton.style.cursor = 'pointer';
  
  toastButton.addEventListener('click', () => {
    // Create a toast notification
    const toast = document.createElement('div');
    toast.textContent = 'This is a toast notification';
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '12px 20px';
    toast.style.backgroundColor = 'rgba(40, 167, 69, 0.9)';
    toast.style.color = 'white';
    toast.style.borderRadius = '4px';
    toast.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    toast.style.zIndex = '9999';
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.5s ease';
      
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 500);
    }, 3000);
  });
  
  feedbackContainer.appendChild(alert);
  feedbackContainer.appendChild(progressContainer);
  feedbackContainer.appendChild(toastButton);
  container.appendChild(feedbackContainer);
}

/**
 * Launch the UI Components app
 */
export async function launch() {
  console.log('Launching UI Components app...');
  console.error('UI Components app launch started'); // Add error log for visibility
  
  try {
    // Get window manager
    console.log('Getting window manager...');
    console.error('About to call getWindowManager()'); // Add error log for visibility
    const windowManager = await getWindowManager();
    console.log('Window manager obtained:', windowManager);
    console.error('Window manager obtained:', windowManager); // Add error log for visibility
    
    if (!windowManager) {
      console.error('Window manager is null or undefined');
      alert('Failed to get window manager');
      return null;
    }
    
    // Create window
    console.log('Creating window...');
    try {
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
      
      if (!window) {
        console.error('Window is null or undefined after creation');
        alert('Failed to create window');
        return null;
      }
      
      // Initialize UI Components app in window content
      console.log('Getting window content element...');
      const contentEl = window.getContentElement();
      console.log('Window content element:', contentEl);
      
      if (!contentEl) {
        console.error('Content element is null or undefined');
        alert('Failed to get content element');
        return window;
      }
      
      // Make sure the content element has proper styling
      console.log('Applying styles to content element...');
      contentEl.style.display = 'flex';
      contentEl.style.flexDirection = 'column';
      contentEl.style.width = '100%';
      contentEl.style.height = '100%';
      contentEl.style.overflow = 'hidden';
      contentEl.style.backgroundColor = '#f5f5f5';
      
      // Initialize the app immediately
      console.log('Initializing UI Components app...');
      try {
        console.log('Content element before initialization:', contentEl);
        initUIComponentsApp(contentEl);
        console.log('UI Components app initialized successfully');
      } catch (innerError) {
        console.error('Error in initialization:', innerError);
        contentEl.innerHTML = `
          <div style="padding: 20px; color: red;">
            <h3>Error initializing UI Components app</h3>
            <p>${innerError.message}</p>
            <pre>${innerError.stack}</pre>
          </div>
        `;
        alert('Error initializing UI Components app: ' + innerError.message);
      }
      
      console.log('Returning window object...');
      return window;
    } catch (windowError) {
      console.error('Error creating window:', windowError);
      alert('Failed to create window: ' + windowError.message);
      throw windowError;
    }
  } catch (error) {
    console.error('Error in UI Components app launch:', error);
    alert('Failed to launch UI Components app: ' + error.message);
    throw error;
  }
}