/**
 * Notes App
 * 
 * A simple note-taking application using the framework-agnostic component library
 */

import {
  createAppLayout,
  createAppHeader,
  createAppContent,
  createAppSidebar,
  createList,
  createListItem,
  createListDivider,
  createListSubheader,
  createButton
} from '../../ui/components/index.js';

// Mock data for notes
const MOCK_NOTES = [
  {
    id: 'note1',
    title: 'Shopping List',
    content: '- Milk\n- Eggs\n- Bread\n- Apples\n- Coffee',
    category: 'Personal',
    createdAt: new Date('2025-05-10T10:30:00'),
    updatedAt: new Date('2025-05-10T14:45:00')
  },
  {
    id: 'note2',
    title: 'Meeting Notes',
    content: '# Project Kickoff\n\n- Discuss timeline\n- Assign tasks\n- Set up weekly check-ins\n- Review budget',
    category: 'Work',
    createdAt: new Date('2025-05-08T09:15:00'),
    updatedAt: new Date('2025-05-09T11:20:00')
  },
  {
    id: 'note3',
    title: 'Book Recommendations',
    content: '1. The Pragmatic Programmer\n2. Clean Code\n3. Design Patterns\n4. Refactoring',
    category: 'Learning',
    createdAt: new Date('2025-05-05T16:40:00'),
    updatedAt: new Date('2025-05-05T16:40:00')
  },
  {
    id: 'note4',
    title: 'Vacation Ideas',
    content: '## Summer 2025\n\n- Greece (Islands)\n- Japan (Tokyo, Kyoto)\n- Norway (Fjords)\n- New Zealand',
    category: 'Personal',
    createdAt: new Date('2025-05-01T20:10:00'),
    updatedAt: new Date('2025-05-02T08:30:00')
  }
];

/**
 * Notes App Class
 */
export default class NotesApp {
  constructor(container) {
    this.container = container;
    this.notes = [...MOCK_NOTES];
    this.selectedNoteId = null;
    this.filter = 'all';
    
    this.init();
  }
  
  /**
   * Initialize the app
   */
  init() {
    // Create app layout
    this.appLayout = createAppLayout();
    
    // Create header with menu button and search
    const menuButton = createButton({
      text: '☰',
      variant: 'text',
      onClick: () => this.toggleSidebar()
    });
    
    const newNoteButton = createButton({
      text: '+ New Note',
      variant: 'primary',
      onClick: () => this.createNewNote()
    });
    
    this.appHeader = createAppHeader({
      title: 'Notes',
      startContent: menuButton,
      endContent: newNoteButton
    });
    
    // Create sidebar with note list
    this.appSidebar = createAppSidebar();
    this.updateSidebar();
    
    // Create content area
    this.appContent = createAppContent();
    this.updateContent();
    
    // Add components to layout
    this.appLayout.appendChild(this.appHeader);
    this.appLayout.appendChild(this.appSidebar);
    this.appLayout.appendChild(this.appContent);
    
    // Add layout to container
    this.container.appendChild(this.appLayout);
  }
  
  /**
   * Toggle sidebar visibility
   */
  toggleSidebar() {
    this.appLayout.sidebarOpen = !this.appLayout.sidebarOpen;
  }
  
  /**
   * Update sidebar content
   */
  updateSidebar() {
    // Clear existing content
    this.appSidebar.innerHTML = '';
    
    // Create filter options
    const filterList = createList();
    
    filterList.appendChild(createListSubheader({
      text: 'FILTERS'
    }));
    
    filterList.appendChild(createListItem({
      primary: 'All Notes',
      selected: this.filter === 'all',
      onClick: () => {
        this.filter = 'all';
        this.updateSidebar();
        this.updateContent();
      }
    }));
    
    // Get unique categories
    const categories = [...new Set(this.notes.map(note => note.category))];
    
    categories.forEach(category => {
      filterList.appendChild(createListItem({
        primary: category,
        selected: this.filter === category,
        onClick: () => {
          this.filter = category;
          this.updateSidebar();
          this.updateContent();
        }
      }));
    });
    
    filterList.appendChild(createListDivider());
    
    // Create notes list
    const notesList = createList();
    
    notesList.appendChild(createListSubheader({
      text: 'NOTES'
    }));
    
    // Filter notes
    const filteredNotes = this.filter === 'all'
      ? this.notes
      : this.notes.filter(note => note.category === this.filter);
    
    // Sort by updated date (newest first)
    filteredNotes
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .forEach(note => {
        notesList.appendChild(createListItem({
          primary: note.title,
          secondary: this.formatDate(note.updatedAt),
          selected: this.selectedNoteId === note.id,
          onClick: () => {
            this.selectedNoteId = note.id;
            this.updateSidebar();
            this.updateContent();
          }
        }));
      });
    
    // Add lists to sidebar
    this.appSidebar.appendChild(filterList);
    this.appSidebar.appendChild(notesList);
  }
  
  /**
   * Update content area
   */
  updateContent() {
    // Clear existing content
    this.appContent.innerHTML = '';
    
    if (this.selectedNoteId) {
      // Find selected note
      const note = this.notes.find(n => n.id === this.selectedNoteId);
      
      if (note) {
        // Create note editor
        const noteEditor = this.createNoteEditor(note);
        this.appContent.appendChild(noteEditor);
      } else {
        this.showEmptyState();
      }
    } else {
      this.showEmptyState();
    }
  }
  
  /**
   * Create note editor
   * @param {Object} note - Note object
   * @returns {HTMLElement} Note editor element
   */
  createNoteEditor(note) {
    const editorContainer = document.createElement('div');
    editorContainer.className = 'note-editor';
    editorContainer.style.display = 'flex';
    editorContainer.style.flexDirection = 'column';
    editorContainer.style.height = '100%';
    editorContainer.style.gap = '16px';
    
    // Title input
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = note.title;
    titleInput.placeholder = 'Note title';
    titleInput.style.fontSize = '24px';
    titleInput.style.fontWeight = 'bold';
    titleInput.style.padding = '8px 0';
    titleInput.style.border = 'none';
    titleInput.style.borderBottom = '1px solid #ddd';
    titleInput.style.outline = 'none';
    titleInput.style.width = '100%';
    titleInput.style.backgroundColor = 'transparent';
    
    titleInput.addEventListener('input', () => {
      note.title = titleInput.value;
      note.updatedAt = new Date();
      this.updateSidebar();
    });
    
    // Category selector
    const categoryContainer = document.createElement('div');
    categoryContainer.style.display = 'flex';
    categoryContainer.style.alignItems = 'center';
    categoryContainer.style.gap = '8px';
    
    const categoryLabel = document.createElement('label');
    categoryLabel.textContent = 'Category:';
    categoryLabel.style.fontSize = '14px';
    categoryLabel.style.color = '#666';
    
    const categorySelect = document.createElement('select');
    categorySelect.style.padding = '4px 8px';
    categorySelect.style.borderRadius = '4px';
    categorySelect.style.border = '1px solid #ddd';
    
    // Get unique categories
    const categories = [...new Set(this.notes.map(n => n.category))];
    
    // Add options
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      option.selected = note.category === category;
      categorySelect.appendChild(option);
    });
    
    // Add "New category" option
    const newOption = document.createElement('option');
    newOption.value = 'new';
    newOption.textContent = '+ New category';
    categorySelect.appendChild(newOption);
    
    categorySelect.addEventListener('change', () => {
      if (categorySelect.value === 'new') {
        const newCategory = prompt('Enter new category name:');
        if (newCategory && newCategory.trim()) {
          note.category = newCategory.trim();
          note.updatedAt = new Date();
          this.updateSidebar();
          this.updateContent();
        } else {
          // Reset to previous value
          categorySelect.value = note.category;
        }
      } else {
        note.category = categorySelect.value;
        note.updatedAt = new Date();
        this.updateSidebar();
      }
    });
    
    categoryContainer.appendChild(categoryLabel);
    categoryContainer.appendChild(categorySelect);
    
    // Content textarea
    const contentTextarea = document.createElement('textarea');
    contentTextarea.value = note.content;
    contentTextarea.placeholder = 'Write your note here...';
    contentTextarea.style.flex = '1';
    contentTextarea.style.padding = '12px';
    contentTextarea.style.border = '1px solid #ddd';
    contentTextarea.style.borderRadius = '4px';
    contentTextarea.style.outline = 'none';
    contentTextarea.style.resize = 'none';
    contentTextarea.style.fontFamily = 'monospace';
    contentTextarea.style.fontSize = '14px';
    contentTextarea.style.lineHeight = '1.5';
    
    contentTextarea.addEventListener('input', () => {
      note.content = contentTextarea.value;
      note.updatedAt = new Date();
      this.updateSidebar();
    });
    
    // Footer with metadata
    const footer = document.createElement('div');
    footer.style.display = 'flex';
    footer.style.justifyContent = 'space-between';
    footer.style.fontSize = '12px';
    footer.style.color = '#666';
    
    const createdAt = document.createElement('span');
    createdAt.textContent = `Created: ${this.formatDate(note.createdAt)}`;
    
    const updatedAt = document.createElement('span');
    updatedAt.textContent = `Updated: ${this.formatDate(note.updatedAt)}`;
    
    footer.appendChild(createdAt);
    footer.appendChild(updatedAt);
    
    // Delete button
    const deleteButton = createButton({
      text: 'Delete Note',
      variant: 'secondary',
      onClick: () => {
        if (confirm('Are you sure you want to delete this note?')) {
          this.deleteNote(note.id);
        }
      }
    });
    
    deleteButton.style.alignSelf = 'flex-end';
    deleteButton.style.marginTop = '16px';
    
    // Add elements to container
    editorContainer.appendChild(titleInput);
    editorContainer.appendChild(categoryContainer);
    editorContainer.appendChild(contentTextarea);
    editorContainer.appendChild(footer);
    editorContainer.appendChild(deleteButton);
    
    return editorContainer;
  }
  
  /**
   * Show empty state
   */
  showEmptyState() {
    const emptyState = document.createElement('div');
    emptyState.style.display = 'flex';
    emptyState.style.flexDirection = 'column';
    emptyState.style.alignItems = 'center';
    emptyState.style.justifyContent = 'center';
    emptyState.style.height = '100%';
    emptyState.style.textAlign = 'center';
    emptyState.style.padding = '20px';
    
    const icon = document.createElement('div');
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16"><path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/><path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"/><path d="M8.5 6.5a.5.5 0 0 0-1 0V8H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V9H10a.5.5 0 0 0 0-1H8.5V6.5Z"/></svg>';
    icon.style.fontSize = '64px';
    icon.style.color = '#ccc';
    icon.style.marginBottom = '16px';
    
    const title = document.createElement('h2');
    title.textContent = 'No Note Selected';
    title.style.margin = '0 0 8px 0';
    title.style.color = '#333';
    
    const description = document.createElement('p');
    description.textContent = 'Select a note from the sidebar or create a new one';
    description.style.margin = '0 0 24px 0';
    description.style.color = '#666';
    
    const newNoteButton = createButton({
      text: '+ Create New Note',
      variant: 'primary',
      onClick: () => this.createNewNote()
    });
    
    emptyState.appendChild(icon);
    emptyState.appendChild(title);
    emptyState.appendChild(description);
    emptyState.appendChild(newNoteButton);
    
    this.appContent.appendChild(emptyState);
  }
  
  /**
   * Create a new note
   */
  createNewNote() {
    const newNote = {
      id: `note${Date.now()}`,
      title: 'Untitled Note',
      content: '',
      category: 'Personal',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.notes.push(newNote);
    this.selectedNoteId = newNote.id;
    this.updateSidebar();
    this.updateContent();
  }
  
  /**
   * Delete a note
   * @param {string} noteId - Note ID
   */
  deleteNote(noteId) {
    this.notes = this.notes.filter(note => note.id !== noteId);
    this.selectedNoteId = this.notes.length > 0 ? this.notes[0].id : null;
    this.updateSidebar();
    this.updateContent();
  }
  
  /**
   * Format date for display
   * @param {Date} date - Date to format
   * @returns {string} Formatted date
   */
  formatDate(date) {
    const now = new Date();
    const diff = now - date;
    
    // Less than a day
    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Less than a week
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return days[date.getDay()];
    }
    
    // Otherwise show date
    return date.toLocaleDateString();
  }
}