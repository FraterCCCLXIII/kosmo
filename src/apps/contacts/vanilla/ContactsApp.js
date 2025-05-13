/**
 * Contacts App - Vanilla JS Implementation
 * 
 * A contacts management application built with vanilla JavaScript.
 */

// Mock contacts data
const MOCK_CONTACTS = [
  {
    id: 'contact1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    company: 'Acme Inc.',
    jobTitle: 'Software Engineer',
    address: '123 Main St, Anytown, CA 94321',
    notes: 'Met at the tech conference in March.',
    avatar: 'JD'
  },
  {
    id: 'contact2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    company: 'TechCorp',
    jobTitle: 'Product Manager',
    address: '456 Oak Ave, Somewhere, NY 10001',
    notes: 'Worked together on the XYZ project.',
    avatar: 'JS'
  },
  {
    id: 'contact3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    phone: '(555) 456-7890',
    company: 'Global Solutions',
    jobTitle: 'Marketing Director',
    address: '789 Pine Rd, Elsewhere, TX 75001',
    notes: 'Introduced by Sarah at the networking event.',
    avatar: 'MJ'
  },
  {
    id: 'contact4',
    firstName: 'Emily',
    lastName: 'Williams',
    email: 'emily.williams@example.com',
    phone: '(555) 234-5678',
    company: 'Creative Designs',
    jobTitle: 'UI/UX Designer',
    address: '321 Elm St, Nowhere, WA 98001',
    notes: 'Collaborated on the website redesign project.',
    avatar: 'EW'
  },
  {
    id: 'contact5',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    phone: '(555) 876-5432',
    company: 'Data Analytics Co.',
    jobTitle: 'Data Scientist',
    address: '654 Maple Dr, Anywhere, IL 60001',
    notes: 'PhD in Computer Science, expert in machine learning.',
    avatar: 'DB'
  }
];

/**
 * Contacts App Class
 */
class ContactsApp {
  constructor(container) {
    this.container = container;
    this.contacts = [...MOCK_CONTACTS];
    this.selectedContact = null;
    this.searchQuery = '';
    this.activeFilter = 'all';
    
    // Create app structure
    this.createAppStructure();
    
    // Initialize event listeners
    this.initEventListeners();
    
    // Render initial state
    this.renderContactsList();
    this.updateStats();
  }
  
  /**
   * Create the app structure
   */
  createAppStructure() {
    this.container.innerHTML = '';
    this.container.classList.add('contacts-app');
    
    // Create app layout
    this.container.innerHTML = `
      <div class="contacts-app-layout">
        <header class="contacts-app-header">
          <div class="contacts-app-header-title">
            <span class="contacts-app-header-icon">👤</span>
            <h1>Contacts</h1>
          </div>
          <div class="contacts-app-header-actions">
            <div class="contacts-app-search-container">
              <input type="text" class="contacts-app-search" placeholder="Search contacts...">
              <button class="contacts-app-search-button">🔍</button>
            </div>
            <button class="contacts-app-add-button">Add Contact</button>
          </div>
        </header>
        
        <div class="contacts-app-main">
          <aside class="contacts-app-sidebar">
            <div class="contacts-app-sidebar-section">
              <h3 class="contacts-app-sidebar-title">Filters</h3>
              <ul class="contacts-app-filters">
                <li class="contacts-app-filter active" data-filter="all">All Contacts</li>
                <li class="contacts-app-filter" data-filter="work">Work</li>
                <li class="contacts-app-filter" data-filter="personal">Personal</li>
              </ul>
            </div>
            
            <div class="contacts-app-sidebar-divider"></div>
            
            <div class="contacts-app-sidebar-section">
              <h3 class="contacts-app-sidebar-title">Statistics</h3>
              <div class="contacts-app-stats">
                <div class="contacts-app-stat">
                  <div class="contacts-app-stat-value" id="total-contacts">0</div>
                  <div class="contacts-app-stat-label">Total</div>
                </div>
                <div class="contacts-app-stat">
                  <div class="contacts-app-stat-value" id="work-contacts">0</div>
                  <div class="contacts-app-stat-label">Work</div>
                </div>
                <div class="contacts-app-stat">
                  <div class="contacts-app-stat-value" id="personal-contacts">0</div>
                  <div class="contacts-app-stat-label">Personal</div>
                </div>
              </div>
            </div>
          </aside>
          
          <main class="contacts-app-content">
            <div class="contacts-app-list-container">
              <div class="contacts-app-list"></div>
            </div>
            <div class="contacts-app-detail-container" style="display: none;"></div>
          </main>
        </div>
      </div>
      
      <div class="contacts-app-modal" style="display: none;">
        <div class="contacts-app-modal-backdrop"></div>
        <div class="contacts-app-modal-content"></div>
      </div>
    `;
    
    // Store references to DOM elements
    this.listContainer = this.container.querySelector('.contacts-app-list-container');
    this.listElement = this.container.querySelector('.contacts-app-list');
    this.detailContainer = this.container.querySelector('.contacts-app-detail-container');
    this.searchInput = this.container.querySelector('.contacts-app-search');
    this.filterElements = this.container.querySelectorAll('.contacts-app-filter');
    this.modal = this.container.querySelector('.contacts-app-modal');
    this.modalContent = this.container.querySelector('.contacts-app-modal-content');
    
    // Stats elements
    this.totalContactsElement = this.container.querySelector('#total-contacts');
    this.workContactsElement = this.container.querySelector('#work-contacts');
    this.personalContactsElement = this.container.querySelector('#personal-contacts');
  }
  
  /**
   * Initialize event listeners
   */
  initEventListeners() {
    // Add contact button
    const addButton = this.container.querySelector('.contacts-app-add-button');
    addButton.addEventListener('click', () => this.showContactForm());
    
    // Search input
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      this.renderContactsList();
    });
    
    // Filter clicks
    this.filterElements.forEach(filter => {
      filter.addEventListener('click', (e) => {
        this.activeFilter = e.target.dataset.filter;
        
        // Update active filter UI
        this.filterElements.forEach(f => f.classList.remove('active'));
        e.target.classList.add('active');
        
        this.renderContactsList();
      });
    });
    
    // Modal backdrop click (close modal)
    const modalBackdrop = this.container.querySelector('.contacts-app-modal-backdrop');
    modalBackdrop.addEventListener('click', () => this.hideModal());
  }
  
  /**
   * Filter contacts based on search query and active filter
   */
  getFilteredContacts() {
    return this.contacts.filter(contact => {
      const matchesSearch = this.searchQuery === '' || 
        `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(this.searchQuery) ||
        (contact.email && contact.email.toLowerCase().includes(this.searchQuery)) ||
        (contact.company && contact.company.toLowerCase().includes(this.searchQuery));
      
      if (this.activeFilter === 'all') {
        return matchesSearch;
      } else if (this.activeFilter === 'work') {
        return matchesSearch && contact.company;
      } else if (this.activeFilter === 'personal') {
        return matchesSearch && !contact.company;
      }
      
      return matchesSearch;
    });
  }
  
  /**
   * Sort contacts by last name, then first name
   */
  getSortedContacts(contacts) {
    return [...contacts].sort((a, b) => {
      const lastNameA = a.lastName || '';
      const lastNameB = b.lastName || '';
      const firstNameA = a.firstName || '';
      const firstNameB = b.firstName || '';
      
      if (lastNameA !== lastNameB) {
        return lastNameA.localeCompare(lastNameB);
      }
      return firstNameA.localeCompare(firstNameB);
    });
  }
  
  /**
   * Group contacts by first letter of last name
   */
  getGroupedContacts(contacts) {
    const grouped = contacts.reduce((groups, contact) => {
      const lastName = contact.lastName || '';
      const firstLetter = lastName.charAt(0).toUpperCase();
      
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      
      groups[firstLetter].push(contact);
      return groups;
    }, {});
    
    return grouped;
  }
  
  /**
   * Render the contacts list
   */
  renderContactsList() {
    const filteredContacts = this.getFilteredContacts();
    const sortedContacts = this.getSortedContacts(filteredContacts);
    const groupedContacts = this.getGroupedContacts(sortedContacts);
    const sortedGroups = Object.keys(groupedContacts).sort();
    
    // Clear the list
    this.listElement.innerHTML = '';
    
    // Show empty state if no contacts
    if (sortedContacts.length === 0) {
      this.listElement.innerHTML = `
        <div class="contacts-app-empty-state">
          <div class="contacts-app-empty-icon">👤</div>
          <h3>No contacts found</h3>
          <p>${this.searchQuery ? 'Try a different search term' : 'Add your first contact to get started'}</p>
          <button class="contacts-app-add-button">Add Contact</button>
        </div>
      `;
      
      // Add event listener to the new button
      const addButton = this.listElement.querySelector('.contacts-app-add-button');
      addButton.addEventListener('click', () => this.showContactForm());
      
      return;
    }
    
    // Create list HTML
    let listHTML = '';
    
    sortedGroups.forEach(letter => {
      listHTML += `<div class="contacts-app-list-group">`;
      listHTML += `<div class="contacts-app-list-header">${letter}</div>`;
      
      groupedContacts[letter].forEach(contact => {
        listHTML += `
          <div class="contacts-app-list-item" data-id="${contact.id}">
            <div class="contacts-app-list-avatar">${contact.avatar}</div>
            <div class="contacts-app-list-info">
              <div class="contacts-app-list-name">${contact.firstName} ${contact.lastName}</div>
              <div class="contacts-app-list-secondary">${contact.company || contact.email || contact.phone || ''}</div>
            </div>
          </div>
        `;
      });
      
      listHTML += `</div>`;
    });
    
    this.listElement.innerHTML = listHTML;
    
    // Add event listeners to list items
    const listItems = this.listElement.querySelectorAll('.contacts-app-list-item');
    listItems.forEach(item => {
      item.addEventListener('click', () => {
        const contactId = item.dataset.id;
        const contact = this.contacts.find(c => c.id === contactId);
        this.showContactDetail(contact);
      });
    });
  }
  
  /**
   * Show contact detail view
   */
  showContactDetail(contact) {
    this.selectedContact = contact;
    
    // Hide list, show detail
    this.listContainer.style.display = 'none';
    this.detailContainer.style.display = 'block';
    
    // Format phone number
    const formattedPhone = this.formatPhone(contact.phone);
    
    // Generate avatar
    const avatarHTML = contact.avatar.length > 2 && contact.avatar.startsWith('http')
      ? `<img src="${contact.avatar}" alt="${contact.firstName} ${contact.lastName}" class="contacts-app-detail-avatar-image">`
      : `<div class="contacts-app-detail-avatar-initials">${contact.avatar}</div>`;
    
    // Render detail view
    this.detailContainer.innerHTML = `
      <div class="contacts-app-detail">
        <div class="contacts-app-detail-header">
          <button class="contacts-app-back-button">←</button>
          <div class="contacts-app-detail-actions">
            <button class="contacts-app-edit-button">Edit</button>
            <button class="contacts-app-delete-button">Delete</button>
          </div>
        </div>
        
        <div class="contacts-app-detail-content">
          <div class="contacts-app-detail-avatar">
            ${avatarHTML}
          </div>
          
          <h2 class="contacts-app-detail-name">
            ${contact.firstName} ${contact.lastName}
          </h2>
          
          ${(contact.company || contact.jobTitle) ? `
            <div class="contacts-app-detail-job">
              ${contact.jobTitle ? `<span class="contacts-app-detail-job-title">${contact.jobTitle}</span>` : ''}
              ${contact.jobTitle && contact.company ? '<span> at </span>' : ''}
              ${contact.company ? `<span class="contacts-app-detail-company">${contact.company}</span>` : ''}
            </div>
          ` : ''}
          
          <div class="contacts-app-detail-section">
            <h3 class="contacts-app-detail-section-title">Contact Information</h3>
            
            ${contact.email ? `
              <div class="contacts-app-detail-field">
                <div class="contacts-app-detail-field-label">Email</div>
                <div class="contacts-app-detail-field-value">
                  <a href="mailto:${contact.email}" class="contacts-app-detail-link">
                    ${contact.email}
                  </a>
                </div>
              </div>
            ` : ''}
            
            ${contact.phone ? `
              <div class="contacts-app-detail-field">
                <div class="contacts-app-detail-field-label">Phone</div>
                <div class="contacts-app-detail-field-value">
                  <a href="tel:${contact.phone}" class="contacts-app-detail-link">
                    ${formattedPhone}
                  </a>
                </div>
              </div>
            ` : ''}
            
            ${contact.address ? `
              <div class="contacts-app-detail-field">
                <div class="contacts-app-detail-field-label">Address</div>
                <div class="contacts-app-detail-field-value">
                  ${contact.address}
                </div>
              </div>
            ` : ''}
          </div>
          
          ${contact.notes ? `
            <div class="contacts-app-detail-section">
              <h3 class="contacts-app-detail-section-title">Notes</h3>
              <div class="contacts-app-detail-notes">
                ${contact.notes}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
    
    // Add event listeners
    const backButton = this.detailContainer.querySelector('.contacts-app-back-button');
    backButton.addEventListener('click', () => this.hideContactDetail());
    
    const editButton = this.detailContainer.querySelector('.contacts-app-edit-button');
    editButton.addEventListener('click', () => this.showContactForm(contact));
    
    const deleteButton = this.detailContainer.querySelector('.contacts-app-delete-button');
    deleteButton.addEventListener('click', () => {
      if (confirm(`Are you sure you want to delete ${contact.firstName} ${contact.lastName}?`)) {
        this.deleteContact(contact.id);
      }
    });
  }
  
  /**
   * Hide contact detail view
   */
  hideContactDetail() {
    this.selectedContact = null;
    this.detailContainer.style.display = 'none';
    this.listContainer.style.display = 'block';
  }
  
  /**
   * Show contact form (create or edit)
   */
  showContactForm(contact = null) {
    const isNewContact = !contact;
    
    // Generate form HTML
    this.modalContent.innerHTML = `
      <div class="contacts-app-form">
        <h2 class="contacts-app-form-title">
          ${isNewContact ? 'Create Contact' : 'Edit Contact'}
        </h2>
        
        <form id="contact-form">
          <div class="contacts-app-form-row">
            <div class="contacts-app-form-field contacts-app-form-field-half">
              <label class="contacts-app-form-label" for="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                class="contacts-app-form-input" 
                placeholder="First name" 
                value="${contact?.firstName || ''}" 
                required
              >
            </div>
            
            <div class="contacts-app-form-field contacts-app-form-field-half">
              <label class="contacts-app-form-label" for="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                class="contacts-app-form-input" 
                placeholder="Last name" 
                value="${contact?.lastName || ''}"
              >
            </div>
          </div>
          
          <div class="contacts-app-form-field">
            <label class="contacts-app-form-label" for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              class="contacts-app-form-input" 
              placeholder="Email address" 
              value="${contact?.email || ''}"
            >
          </div>
          
          <div class="contacts-app-form-field">
            <label class="contacts-app-form-label" for="phone">Phone</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              class="contacts-app-form-input" 
              placeholder="Phone number" 
              value="${contact?.phone || ''}"
            >
          </div>
          
          <div class="contacts-app-form-row">
            <div class="contacts-app-form-field contacts-app-form-field-half">
              <label class="contacts-app-form-label" for="company">Company</label>
              <input 
                type="text" 
                id="company" 
                name="company" 
                class="contacts-app-form-input" 
                placeholder="Company" 
                value="${contact?.company || ''}"
              >
            </div>
            
            <div class="contacts-app-form-field contacts-app-form-field-half">
              <label class="contacts-app-form-label" for="jobTitle">Job Title</label>
              <input 
                type="text" 
                id="jobTitle" 
                name="jobTitle" 
                class="contacts-app-form-input" 
                placeholder="Job title" 
                value="${contact?.jobTitle || ''}"
              >
            </div>
          </div>
          
          <div class="contacts-app-form-field">
            <label class="contacts-app-form-label" for="address">Address</label>
            <textarea 
              id="address" 
              name="address" 
              class="contacts-app-form-textarea" 
              placeholder="Address" 
              rows="2"
            >${contact?.address || ''}</textarea>
          </div>
          
          <div class="contacts-app-form-field">
            <label class="contacts-app-form-label" for="notes">Notes</label>
            <textarea 
              id="notes" 
              name="notes" 
              class="contacts-app-form-textarea" 
              placeholder="Notes" 
              rows="3"
            >${contact?.notes || ''}</textarea>
          </div>
          
          <div class="contacts-app-form-field">
            <label class="contacts-app-form-label" for="avatar">Avatar (initials or URL)</label>
            <input 
              type="text" 
              id="avatar" 
              name="avatar" 
              class="contacts-app-form-input" 
              placeholder="Avatar initials or URL" 
              value="${contact?.avatar || ''}"
            >
            <div class="contacts-app-form-avatar-preview">
              <div class="contacts-app-form-avatar-initials">
                ${contact?.avatar || ''}
              </div>
            </div>
          </div>
          
          <div class="contacts-app-form-actions">
            <button type="button" class="contacts-app-form-cancel-button">Cancel</button>
            <button type="submit" class="contacts-app-form-submit-button">
              ${isNewContact ? 'Create' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    `;
    
    // Show modal
    this.modal.style.display = 'flex';
    
    // Add event listeners
    const form = this.modalContent.querySelector('#contact-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveContact(form, contact);
    });
    
    const cancelButton = this.modalContent.querySelector('.contacts-app-form-cancel-button');
    cancelButton.addEventListener('click', () => this.hideModal());
    
    // Update avatar preview on input
    const avatarInput = this.modalContent.querySelector('#avatar');
    const avatarPreview = this.modalContent.querySelector('.contacts-app-form-avatar-initials');
    const firstNameInput = this.modalContent.querySelector('#firstName');
    const lastNameInput = this.modalContent.querySelector('#lastName');
    
    const updateAvatarPreview = () => {
      const avatarValue = avatarInput.value.trim();
      if (avatarValue) {
        avatarPreview.textContent = avatarValue;
      } else {
        const firstInitial = firstNameInput.value.charAt(0).toUpperCase();
        const lastInitial = lastNameInput.value.charAt(0).toUpperCase();
        avatarPreview.textContent = firstInitial + lastInitial;
      }
    };
    
    avatarInput.addEventListener('input', updateAvatarPreview);
    firstNameInput.addEventListener('input', updateAvatarPreview);
    lastNameInput.addEventListener('input', updateAvatarPreview);
  }
  
  /**
   * Hide modal
   */
  hideModal() {
    this.modal.style.display = 'none';
    this.modalContent.innerHTML = '';
  }
  
  /**
   * Save contact (create or update)
   */
  saveContact(form, existingContact) {
    const formData = new FormData(form);
    const contactData = {};
    
    // Convert form data to object
    for (const [key, value] of formData.entries()) {
      contactData[key] = value;
    }
    
    // Generate avatar if not provided
    if (!contactData.avatar) {
      const firstInitial = contactData.firstName.charAt(0).toUpperCase();
      const lastInitial = contactData.lastName.charAt(0).toUpperCase();
      contactData.avatar = firstInitial + lastInitial;
    }
    
    if (existingContact) {
      // Update existing contact
      const updatedContact = {
        ...existingContact,
        ...contactData
      };
      
      this.contacts = this.contacts.map(c => 
        c.id === existingContact.id ? updatedContact : c
      );
      
      // Update selected contact if it's the one being edited
      if (this.selectedContact && this.selectedContact.id === existingContact.id) {
        this.selectedContact = updatedContact;
        this.showContactDetail(updatedContact);
      }
    } else {
      // Create new contact
      const newContact = {
        id: `contact-${Date.now()}`,
        ...contactData
      };
      
      this.contacts.push(newContact);
    }
    
    // Hide modal
    this.hideModal();
    
    // Update UI
    this.renderContactsList();
    this.updateStats();
  }
  
  /**
   * Delete contact
   */
  deleteContact(contactId) {
    this.contacts = this.contacts.filter(c => c.id !== contactId);
    
    // Hide detail view if the deleted contact was selected
    if (this.selectedContact && this.selectedContact.id === contactId) {
      this.hideContactDetail();
    }
    
    // Update UI
    this.renderContactsList();
    this.updateStats();
  }
  
  /**
   * Update statistics
   */
  updateStats() {
    const totalContacts = this.contacts.length;
    const workContacts = this.contacts.filter(c => c.company).length;
    const personalContacts = this.contacts.filter(c => !c.company).length;
    
    this.totalContactsElement.textContent = totalContacts;
    this.workContactsElement.textContent = workContacts;
    this.personalContactsElement.textContent = personalContacts;
  }
  
  /**
   * Format phone number
   */
  formatPhone(phone) {
    if (!phone) return '';
    
    // Simple formatting for US numbers
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  }
}

export default ContactsApp;