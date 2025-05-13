/**
 * Contacts App
 * 
 * A contacts management application.
 */

import React, { useState, useEffect } from 'react';
import { 
  AppLayout, 
  AppHeader, 
  AppContent, 
  AppSidebar,
  List,
  ListItem,
  ListDivider,
  Button,
  SearchField,
  EmptyState
} from '../../components/registry';
import ContactForm from './components/ContactForm';
import ContactDetail from './components/ContactDetail';
import './ContactsApp.css';

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
 * Contacts App Component
 */
const ContactsApp = () => {
  const [contacts, setContacts] = useState(MOCK_CONTACTS);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter contacts based on search query and active filter
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = searchQuery === '' || 
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.email && contact.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (contact.company && contact.company.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeFilter === 'all') {
      return matchesSearch;
    } else if (activeFilter === 'work') {
      return matchesSearch && contact.company;
    } else if (activeFilter === 'personal') {
      return matchesSearch && !contact.company;
    }
    
    return matchesSearch;
  });

  // Sort contacts alphabetically by last name, then first name
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    const lastNameA = a.lastName || '';
    const lastNameB = b.lastName || '';
    const firstNameA = a.firstName || '';
    const firstNameB = b.firstName || '';
    
    if (lastNameA !== lastNameB) {
      return lastNameA.localeCompare(lastNameB);
    }
    return firstNameA.localeCompare(firstNameB);
  });

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Create new contact
  const handleCreateContact = () => {
    setEditingContact(null);
    setShowContactForm(true);
  };

  // Edit existing contact
  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowContactForm(true);
  };

  // Save contact (create or update)
  const handleSaveContact = (contact) => {
    if (editingContact) {
      // Update existing contact
      setContacts(prevContacts => 
        prevContacts.map(c => c.id === contact.id ? contact : c)
      );
      
      // Update selected contact if it's the one being edited
      if (selectedContact && selectedContact.id === contact.id) {
        setSelectedContact(contact);
      }
    } else {
      // Create new contact
      setContacts(prevContacts => [...prevContacts, contact]);
    }
    setShowContactForm(false);
  };

  // Cancel contact form
  const handleCancelContactForm = () => {
    setShowContactForm(false);
  };

  // Delete contact
  const handleDeleteContact = (contactId) => {
    setContacts(prevContacts => prevContacts.filter(c => c.id !== contactId));
    
    // Clear selected contact if it's the one being deleted
    if (selectedContact && selectedContact.id === contactId) {
      setSelectedContact(null);
    }
  };

  // Select contact to view details
  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  // Go back to contact list
  const handleBackToList = () => {
    setSelectedContact(null);
  };

  // Filter contacts
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Group contacts by first letter of last name
  const groupedContacts = sortedContacts.reduce((groups, contact) => {
    const lastName = contact.lastName || '';
    const firstLetter = lastName.charAt(0).toUpperCase();
    
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    
    groups[firstLetter].push(contact);
    return groups;
  }, {});

  // Sort group keys alphabetically
  const sortedGroups = Object.keys(groupedContacts).sort();

  // Render contact list
  const renderContactList = () => {
    if (sortedContacts.length === 0) {
      return (
        <EmptyState
          icon="👤"
          title="No contacts found"
          description={searchQuery ? "Try a different search term" : "Add your first contact to get started"}
          action={
            <Button 
              variant="primary" 
              onClick={handleCreateContact}
            >
              Add Contact
            </Button>
          }
        />
      );
    }
    
    return (
      <List className="contacts-app__list">
        {sortedGroups.map(letter => (
          <React.Fragment key={letter}>
            <ListSubheader>{letter}</ListSubheader>
            {groupedContacts[letter].map(contact => (
              <ListItem
                key={contact.id}
                primary={`${contact.firstName} ${contact.lastName}`}
                secondary={contact.company || contact.email || contact.phone || ''}
                startIcon={
                  <div className="contacts-app__avatar">
                    {contact.avatar}
                  </div>
                }
                onClick={() => handleSelectContact(contact)}
              />
            ))}
          </React.Fragment>
        ))}
      </List>
    );
  };

  return (
    <div className="contacts-app">
      <AppLayout
        header={
          <AppHeader
            title="Contacts"
            icon="👤"
            actions={
              <div className="contacts-app__header-actions">
                <SearchField
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={handleSearch}
                  className="contacts-app__search"
                />
                <Button 
                  variant="primary"
                  onClick={handleCreateContact}
                  className="contacts-app__create-button"
                >
                  Add Contact
                </Button>
              </div>
            }
          />
        }
        sidebar={
          <div className="contacts-app__sidebar-content">
            <h3 className="contacts-app__sidebar-title">Filters</h3>
            <List className="contacts-app__filters">
              <ListItem
                primary="All Contacts"
                onClick={() => handleFilterChange('all')}
                selected={activeFilter === 'all'}
              />
              <ListItem
                primary="Work"
                onClick={() => handleFilterChange('work')}
                selected={activeFilter === 'work'}
              />
              <ListItem
                primary="Personal"
                onClick={() => handleFilterChange('personal')}
                selected={activeFilter === 'personal'}
              />
            </List>
            
            <ListDivider />
            
            <div className="contacts-app__stats">
              <div className="contacts-app__stat">
                <div className="contacts-app__stat-value">{contacts.length}</div>
                <div className="contacts-app__stat-label">Total Contacts</div>
              </div>
              <div className="contacts-app__stat">
                <div className="contacts-app__stat-value">
                  {contacts.filter(c => c.company).length}
                </div>
                <div className="contacts-app__stat-label">Work</div>
              </div>
              <div className="contacts-app__stat">
                <div className="contacts-app__stat-value">
                  {contacts.filter(c => !c.company).length}
                </div>
                <div className="contacts-app__stat-label">Personal</div>
              </div>
            </div>
          </div>
        }
      >
        <div className="contacts-app__content">
          {selectedContact ? (
            <ContactDetail
              contact={selectedContact}
              onEdit={() => handleEditContact(selectedContact)}
              onDelete={handleDeleteContact}
              onBack={handleBackToList}
              className="contacts-app__detail"
            />
          ) : (
            renderContactList()
          )}
        </div>
        
        {showContactForm && (
          <div className="contacts-app__modal">
            <div className="contacts-app__modal-backdrop" onClick={handleCancelContactForm}></div>
            <ContactForm
              contact={editingContact}
              onSave={handleSaveContact}
              onCancel={handleCancelContactForm}
              className="contacts-app__contact-form"
            />
          </div>
        )}
      </AppLayout>
    </div>
  );
};

export default ContactsApp;