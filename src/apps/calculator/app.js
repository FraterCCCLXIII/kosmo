/**
 * Calculator App
 * A simple calculator application
 */

// Calculator state
let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

/**
 * Initialize the calculator app
 * @param {Object} container - Container element
 * @returns {Object} Calculator app API
 */
export function initCalculator(container) {
  console.log('Initializing calculator app...');
  
  // Create calculator UI
  createCalculatorUI(container);
  
  // Return public API
  return {
    getDisplayValue,
    setDisplayValue,
    clearDisplay,
    calculate,
  };
}

/**
 * Create calculator UI
 * @param {HTMLElement} container - Container element
 */
function createCalculatorUI(container) {
  // Create calculator container
  const calculatorEl = document.createElement('div');
  calculatorEl.className = 'calculator';
  calculatorEl.style.display = 'flex';
  calculatorEl.style.flexDirection = 'column';
  calculatorEl.style.width = '100%';
  calculatorEl.style.height = '100%';
  calculatorEl.style.padding = 'var(--spacing-md)';
  calculatorEl.style.backgroundColor = 'var(--color-bg-primary)';
  calculatorEl.style.borderRadius = 'var(--border-radius-md)';
  calculatorEl.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  
  // Create display
  const displayEl = document.createElement('div');
  displayEl.className = 'calculator-display';
  displayEl.style.width = '100%';
  displayEl.style.padding = 'var(--spacing-md)';
  displayEl.style.marginBottom = 'var(--spacing-md)';
  displayEl.style.backgroundColor = 'var(--color-bg-secondary)';
  displayEl.style.borderRadius = 'var(--border-radius-sm)';
  displayEl.style.textAlign = 'right';
  displayEl.style.fontSize = '2rem';
  displayEl.style.fontWeight = 'bold';
  displayEl.style.overflow = 'hidden';
  displayEl.style.textOverflow = 'ellipsis';
  displayEl.style.whiteSpace = 'nowrap';
  displayEl.textContent = displayValue;
  calculatorEl.appendChild(displayEl);
  
  // Create keypad
  const keypadEl = document.createElement('div');
  keypadEl.className = 'calculator-keypad';
  keypadEl.style.display = 'grid';
  keypadEl.style.gridTemplateColumns = 'repeat(4, 1fr)';
  keypadEl.style.gridGap = 'var(--spacing-sm)';
  keypadEl.style.flex = '1';
  calculatorEl.appendChild(keypadEl);
  
  // Define keypad buttons
  const buttons = [
    { text: 'C', type: 'clear' },
    { text: '±', type: 'negate' },
    { text: '%', type: 'percent' },
    { text: '÷', type: 'operator', value: '/' },
    { text: '7', type: 'digit' },
    { text: '8', type: 'digit' },
    { text: '9', type: 'digit' },
    { text: '×', type: 'operator', value: '*' },
    { text: '4', type: 'digit' },
    { text: '5', type: 'digit' },
    { text: '6', type: 'digit' },
    { text: '-', type: 'operator' },
    { text: '1', type: 'digit' },
    { text: '2', type: 'digit' },
    { text: '3', type: 'digit' },
    { text: '+', type: 'operator' },
    { text: '0', type: 'digit', span: 2 },
    { text: '.', type: 'decimal' },
    { text: '=', type: 'equals' },
  ];
  
  // Create buttons
  buttons.forEach(button => {
    const buttonEl = document.createElement('button');
    buttonEl.className = `calculator-button calculator-button-${button.type}`;
    buttonEl.textContent = button.text;
    buttonEl.style.padding = 'var(--spacing-md)';
    buttonEl.style.fontSize = '1.25rem';
    buttonEl.style.fontWeight = 'bold';
    buttonEl.style.border = 'none';
    buttonEl.style.borderRadius = 'var(--border-radius-sm)';
    buttonEl.style.cursor = 'pointer';
    buttonEl.style.transition = 'background-color 0.2s';
    
    // Set grid column span
    if (button.span) {
      buttonEl.style.gridColumn = `span ${button.span}`;
    }
    
    // Set button colors based on type
    switch (button.type) {
      case 'clear':
      case 'negate':
      case 'percent':
        buttonEl.style.backgroundColor = 'var(--color-bg-tertiary)';
        buttonEl.style.color = 'var(--color-text-primary)';
        break;
      case 'operator':
      case 'equals':
        buttonEl.style.backgroundColor = 'var(--color-accent)';
        buttonEl.style.color = 'white';
        break;
      default:
        buttonEl.style.backgroundColor = 'var(--color-bg-secondary)';
        buttonEl.style.color = 'var(--color-text-primary)';
    }
    
    // Add hover effect
    buttonEl.addEventListener('mouseenter', () => {
      buttonEl.style.filter = 'brightness(0.9)';
    });
    
    buttonEl.addEventListener('mouseleave', () => {
      buttonEl.style.filter = 'brightness(1)';
    });
    
    // Add click handler
    buttonEl.addEventListener('click', () => {
      handleButtonClick(button, displayEl);
    });
    
    keypadEl.appendChild(buttonEl);
  });
  
  // Add to container
  container.appendChild(calculatorEl);
  
  // Add keyboard support
  document.addEventListener('keydown', (event) => {
    handleKeyDown(event, displayEl);
  });
}

/**
 * Handle button click
 * @param {Object} button - Button object
 * @param {HTMLElement} displayEl - Display element
 */
function handleButtonClick(button, displayEl) {
  switch (button.type) {
    case 'digit':
      inputDigit(button.text);
      break;
    case 'decimal':
      inputDecimal();
      break;
    case 'operator':
      handleOperator(button.value || button.text);
      break;
    case 'equals':
      handleEquals();
      break;
    case 'clear':
      clearDisplay();
      break;
    case 'negate':
      negateValue();
      break;
    case 'percent':
      percentValue();
      break;
  }
  
  // Update display
  displayEl.textContent = displayValue;
}

/**
 * Handle keyboard input
 * @param {KeyboardEvent} event - Keyboard event
 * @param {HTMLElement} displayEl - Display element
 */
function handleKeyDown(event, displayEl) {
  // Prevent default for calculator keys
  if (/^[0-9+\-*/.=%]$/.test(event.key) || event.key === 'Enter' || event.key === 'Escape' || event.key === 'Backspace') {
    event.preventDefault();
  } else {
    return;
  }
  
  // Handle digit keys
  if (/^[0-9]$/.test(event.key)) {
    inputDigit(event.key);
  }
  // Handle operator keys
  else if (/^[+\-*/]$/.test(event.key)) {
    handleOperator(event.key);
  }
  // Handle decimal key
  else if (event.key === '.') {
    inputDecimal();
  }
  // Handle equals/enter key
  else if (event.key === '=' || event.key === 'Enter') {
    handleEquals();
  }
  // Handle escape key
  else if (event.key === 'Escape') {
    clearDisplay();
  }
  // Handle backspace key
  else if (event.key === 'Backspace') {
    backspace();
  }
  // Handle percent key
  else if (event.key === '%') {
    percentValue();
  }
  
  // Update display
  displayEl.textContent = displayValue;
}

/**
 * Input a digit
 * @param {string} digit - Digit to input
 */
function inputDigit(digit) {
  if (waitingForSecondOperand) {
    displayValue = digit;
    waitingForSecondOperand = false;
  } else {
    // Replace initial 0 with digit
    displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

/**
 * Input a decimal point
 */
function inputDecimal() {
  // If waiting for second operand, start with '0.'
  if (waitingForSecondOperand) {
    displayValue = '0.';
    waitingForSecondOperand = false;
    return;
  }
  
  // Add decimal point if not already present
  if (!displayValue.includes('.')) {
    displayValue += '.';
  }
}

/**
 * Handle operator
 * @param {string} nextOperator - Operator to handle
 */
function handleOperator(nextOperator) {
  // Parse current display value
  const inputValue = parseFloat(displayValue);
  
  // If we already have an operator and are waiting for second operand,
  // just update the operator
  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }
  
  // If this is the first operand
  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    // Calculate result of previous operation
    const result = calculate();
    displayValue = String(result);
    firstOperand = result;
  }
  
  // Set waiting flag and operator
  waitingForSecondOperand = true;
  operator = nextOperator;
}

/**
 * Handle equals
 */
function handleEquals() {
  // If waiting for second operand, do nothing
  if (waitingForSecondOperand) return;
  
  // Get second operand
  const inputValue = parseFloat(displayValue);
  
  // Calculate result
  if (operator && firstOperand !== null) {
    const result = calculate();
    displayValue = String(result);
    
    // Reset for next calculation
    firstOperand = result;
    waitingForSecondOperand = true;
    operator = null;
  }
}

/**
 * Calculate result
 * @returns {number} Calculation result
 */
function calculate() {
  // Get second operand
  const secondOperand = parseFloat(displayValue);
  
  // Perform calculation based on operator
  let result;
  
  switch (operator) {
    case '+':
      result = firstOperand + secondOperand;
      break;
    case '-':
      result = firstOperand - secondOperand;
      break;
    case '*':
      result = firstOperand * secondOperand;
      break;
    case '/':
      result = firstOperand / secondOperand;
      break;
    default:
      return secondOperand;
  }
  
  return result;
}

/**
 * Clear display
 */
function clearDisplay() {
  displayValue = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
}

/**
 * Negate value
 */
function negateValue() {
  const value = parseFloat(displayValue);
  displayValue = String(-value);
}

/**
 * Convert to percentage
 */
function percentValue() {
  const value = parseFloat(displayValue);
  displayValue = String(value / 100);
}

/**
 * Backspace (remove last character)
 */
function backspace() {
  if (displayValue.length === 1 || (displayValue.length === 2 && displayValue.startsWith('-'))) {
    displayValue = '0';
  } else {
    displayValue = displayValue.slice(0, -1);
  }
}

/**
 * Get display value
 * @returns {string} Display value
 */
function getDisplayValue() {
  return displayValue;
}

/**
 * Set display value
 * @param {string} value - Value to set
 */
function setDisplayValue(value) {
  displayValue = value;
}