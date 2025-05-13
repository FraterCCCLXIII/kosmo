/**
 * Phone App - Contacts Tab
 */

import React, { useState } from 'react';
import { TextField } from '../../../components/registry';

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for contacts
  const allContacts = [
    {
      id: 1,
      name: 'Alice Johnson',
      number: '+1 (555) 123-4567',
      email: 'alice@example.com',
      favorite: true
    },
    {
      id: 2,
      name: 'Bob Smith',
      number: '+1 (555) 234-5678',
      email: 'bob@example.com',
      favorite: false
    },
    {
      id: 3,
      name: 'Charlie Brown',
      number: '+1 (555) 345-6789',
      email: 'charlie@example.com',
      favorite: true
    },
    {
      id: 4,
      name: 'Diana Prince',
      number: '+1 (555) 456-7890',
      email: 'diana@example.com',
      favorite: false
    },
    {
      id: 5,
      name: 'Ethan Hunt',
      number: '+1 (555) 567-8901',
      email: 'ethan@example.com',
      favorite: false
    }
  ];
  
  // Filter contacts based on search query
  const filteredContacts = allContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.number.includes(searchQuery)
  );
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle call button press
  const handleCall = (number) => {
    console.log(`Calling ${number}...`);
    alert(`Calling ${number}...`);
  };
  
  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="phone-contacts">
      <div className="phone-contacts__search">
        <TextField
          id="contact-search"
          placeholder="Search contacts"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          variant="filled"
          prefix="🔍"
        />
      </div>
      
      <ul className="phone-contacts__list">
        {filteredContacts.map((contact) => (
          <li key={contact.id} className="phone-contacts__item">
            <div className="phone-contacts__avatar">
              {getInitials(contact.name)}
            </div>
            
            <div className="phone-contacts__details">
              <h3 className="phone-contacts__name">
                {contact.name}
                {contact.favorite && ' ⭐'}
              </h3>
              <p className="phone-contacts__number">{contact.number}</p>
            </div>
            
            <button 
              className="phone-contacts__call-button"
              onClick={() => handleCall(contact.number)}
            >
              📞
            </button>
          </li>
        ))}
        
        {filteredContacts.length === 0 && (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-gray-500)' }}>
            No contacts found
          </div>
        )}
      </ul>
    </div>
  );
};

export default Contacts;