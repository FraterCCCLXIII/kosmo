/**
 * Todo List App
 */

import { getWindowManager } from '../../ui/WindowManager.js';

// Define icon SVG paths
const ICONS = {
  todoList: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" /></svg>'
};

/**
 * Launch the todo list app
 * @returns {Promise<Object>} Window instance
 */
export async function launch() {
  console.log('Launching todo list app...');
  
  // Get window manager instance
  const windowManager = await getWindowManager();
  
  // Create window
  const window = windowManager.createWindow({
    title: 'Todo List',
    width: 400,
    height: 600,
    minWidth: 300,
    minHeight: 400,
    resizable: true,
    maximizable: true,
    minimizable: true,
    closable: true,
  });
  
  // Initialize todo list in window content
  console.log('Window content element:', window.getContentElement());
  try {
    // Make sure the content element has proper styling
    const contentEl = window.getContentElement();
    contentEl.style.display = 'flex';
    contentEl.style.flexDirection = 'column';
    contentEl.style.width = '100%';
    contentEl.style.height = '100%';
    contentEl.style.overflow = 'hidden';
    
    initTodoListApp(contentEl);
    console.log('Todo list app initialized successfully');
  } catch (error) {
    console.error('Error initializing todo list app:', error);
    window.getContentElement().innerHTML = `<div style="padding: 20px; color: red;">Error initializing todo list app: ${error.message}</div>`;
  }
  
  return window;
}

function initTodoListApp(container) {
  console.log('Initializing Todo List app');
  
  // Create app container
  const appContainer = document.createElement('div');
  appContainer.className = 'todo-list-app';
  appContainer.style.display = 'flex';
  appContainer.style.flexDirection = 'column';
  appContainer.style.height = '100%';
  appContainer.style.padding = 'var(--spacing-md)';
  
  // Create header
  const header = document.createElement('div');
  header.className = 'todo-list-header';
  header.style.marginBottom = 'var(--spacing-md)';
  
  const title = document.createElement('h2');
  title.textContent = 'Todo List';
  title.style.margin = '0 0 var(--spacing-sm) 0';
  
  header.appendChild(title);
  
  // Create input container
  const inputContainer = document.createElement('div');
  inputContainer.className = 'todo-input-container';
  inputContainer.style.display = 'flex';
  inputContainer.style.marginBottom = 'var(--spacing-md)';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Add a new task...';
  input.className = 'todo-input';
  input.style.flex = '1';
  input.style.padding = 'var(--spacing-sm)';
  input.style.borderRadius = 'var(--border-radius-sm)';
  input.style.border = 'var(--border-width) solid var(--border-color)';
  input.style.marginRight = 'var(--spacing-sm)';
  
  const addButton = document.createElement('button');
  addButton.textContent = 'Add';
  addButton.className = 'todo-add-button';
  addButton.style.padding = 'var(--spacing-sm) var(--spacing-md)';
  addButton.style.borderRadius = 'var(--border-radius-sm)';
  addButton.style.border = 'none';
  addButton.style.backgroundColor = 'var(--color-primary)';
  addButton.style.color = 'var(--color-text-on-primary)';
  addButton.style.cursor = 'pointer';
  
  inputContainer.appendChild(input);
  inputContainer.appendChild(addButton);
  
  // Create todo list container
  const todoListContainer = document.createElement('div');
  todoListContainer.className = 'todo-list-container';
  todoListContainer.style.flex = '1';
  todoListContainer.style.overflowY = 'auto';
  
  // Create todo list
  const todoList = document.createElement('ul');
  todoList.className = 'todo-list';
  todoList.style.listStyle = 'none';
  todoList.style.padding = '0';
  todoList.style.margin = '0';
  
  todoListContainer.appendChild(todoList);
  
  // Add components to app container
  appContainer.appendChild(header);
  appContainer.appendChild(inputContainer);
  appContainer.appendChild(todoListContainer);
  
  // Add app container to window container
  container.appendChild(appContainer);
  
  // Sample data
  const sampleTodos = [
    { id: 1, text: 'Learn about Kosmo OS', completed: true },
    { id: 2, text: 'Build a custom app', completed: false },
    { id: 3, text: 'Explore the file system', completed: false },
    { id: 4, text: 'Customize the theme', completed: false }
  ];
  
  // Render initial todos
  renderTodos(sampleTodos);
  
  // Add event listeners
  addButton.addEventListener('click', addTodo);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  });
  
  // Add todo function
  function addTodo() {
    const text = input.value.trim();
    if (text) {
      const newTodo = {
        id: Date.now(),
        text,
        completed: false
      };
      
      sampleTodos.push(newTodo);
      renderTodos(sampleTodos);
      input.value = '';
    }
  }
  
  // Toggle todo completion
  function toggleTodo(id) {
    const todoIndex = sampleTodos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      sampleTodos[todoIndex].completed = !sampleTodos[todoIndex].completed;
      renderTodos(sampleTodos);
    }
  }
  
  // Delete todo
  function deleteTodo(id) {
    const todoIndex = sampleTodos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      sampleTodos.splice(todoIndex, 1);
      renderTodos(sampleTodos);
    }
  }
  
  // Render todos
  function renderTodos(todos) {
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
      const todoItem = document.createElement('li');
      todoItem.className = 'todo-item';
      todoItem.style.display = 'flex';
      todoItem.style.alignItems = 'center';
      todoItem.style.padding = 'var(--spacing-sm)';
      todoItem.style.borderBottom = 'var(--border-width) solid var(--border-color)';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.style.marginRight = 'var(--spacing-sm)';
      checkbox.addEventListener('change', () => toggleTodo(todo.id));
      
      const text = document.createElement('span');
      text.textContent = todo.text;
      text.style.flex = '1';
      if (todo.completed) {
        text.style.textDecoration = 'line-through';
        text.style.color = 'var(--color-text-secondary)';
      }
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '×';
      deleteButton.className = 'todo-delete-button';
      deleteButton.style.background = 'none';
      deleteButton.style.border = 'none';
      deleteButton.style.color = 'var(--color-danger)';
      deleteButton.style.fontSize = 'var(--font-size-lg)';
      deleteButton.style.cursor = 'pointer';
      deleteButton.style.padding = 'var(--spacing-xs)';
      deleteButton.addEventListener('click', () => deleteTodo(todo.id));
      
      todoItem.appendChild(checkbox);
      todoItem.appendChild(text);
      todoItem.appendChild(deleteButton);
      
      todoList.appendChild(todoItem);
    });
  }
  
  // Return app API
  return {
    // App lifecycle methods
    onResize: () => {
      console.log('Todo List app resized');
    },
    onFocus: () => {
      console.log('Todo List app focused');
    },
    onBlur: () => {
      console.log('Todo List app blurred');
    },
    onClose: () => {
      console.log('Todo List app closed');
      return true; // Allow window to close
    }
  };
}