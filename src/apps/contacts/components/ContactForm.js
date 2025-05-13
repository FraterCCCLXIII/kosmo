/**
 * Contact Form Component
 * 
 * A form for creating and editing contacts.
 */

import React, { useState, useEffect } from 'react';
import { TextField, Button } from '../../../components/registry';
import './ContactForm.css';

/**
 * ContactForm component for creating and editing contacts
 * 
 * @param {Object} props - Component props
 * @param {Object} props.contact - Contact to edit (null for new contact)
 * @param {Function} props.onSave - Callback when contact is saved
 * @param {Function} props.onCancel - Callback when form is canceled
 * @param {string} props.className - Additional CSS class
 */
const ContactForm = ({
  contact = null,
  onSave,
  onCancel,
  className = '',
  ...props
}) => {
  const isNewContact = !contact;
  const baseClass = 'kosmo-contact-form';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  // Initialize form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    address: '',
    notes: '',
    avatar: '',
  });

  // Update form when contact changes
  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName || '',
        lastName: contact.lastName || '',
        email: contact.email || '',
        phone: contact.phone || '',
        company: contact.company || '',
        jobTitle: contact.jobTitle || '',
        address: contact.address || '',
        notes: contact.notes || '',
        avatar: contact.avatar || '',
      });
    }
  }, [contact]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create contact object
    const savedContact = {
      id: contact?.id || `contact-${Date.now()}`,
      ...formData,
      // Generate initials for avatar if none provided
      avatar: formData.avatar || generateInitialsAvatar(formData.firstName, formData.lastName),
    };
    
    if (onSave) {
      onSave(savedContact);
    }
  };

  // Generate avatar with initials
  const generateInitialsAvatar = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <div className={classes} {...props}>
      <form className={`${baseClass}__form`} onSubmit={handleSubmit}>
        <h2 className={`${baseClass}__title`}>
          {isNewContact ? 'Create Contact' : 'Edit Contact'}
        </h2>
        
        <div className={`${baseClass}__row`}>
          <div className={`${baseClass}__field ${baseClass}__field--half`}>
            <label className={`${baseClass}__label`} htmlFor="firstName">First Name</label>
            <TextField
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              required
              fullWidth
            />
          </div>
          
          <div className={`${baseClass}__field ${baseClass}__field--half`}>
            <label className={`${baseClass}__label`} htmlFor="lastName">Last Name</label>
            <TextField
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              fullWidth
            />
          </div>
        </div>
        
        <div className={`${baseClass}__field`}>
          <label className={`${baseClass}__label`} htmlFor="email">Email</label>
          <TextField
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            fullWidth
          />
        </div>
        
        <div className={`${baseClass}__field`}>
          <label className={`${baseClass}__label`} htmlFor="phone">Phone</label>
          <TextField
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            fullWidth
          />
        </div>
        
        <div className={`${baseClass}__row`}>
          <div className={`${baseClass}__field ${baseClass}__field--half`}>
            <label className={`${baseClass}__label`} htmlFor="company">Company</label>
            <TextField
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company"
              fullWidth
            />
          </div>
          
          <div className={`${baseClass}__field ${baseClass}__field--half`}>
            <label className={`${baseClass}__label`} htmlFor="jobTitle">Job Title</label>
            <TextField
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Job title"
              fullWidth
            />
          </div>
        </div>
        
        <div className={`${baseClass}__field`}>
          <label className={`${baseClass}__label`} htmlFor="address">Address</label>
          <TextField
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            multiline
            rows={2}
            fullWidth
          />
        </div>
        
        <div className={`${baseClass}__field`}>
          <label className={`${baseClass}__label`} htmlFor="notes">Notes</label>
          <TextField
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            multiline
            rows={3}
            fullWidth
          />
        </div>
        
        <div className={`${baseClass}__field`}>
          <label className={`${baseClass}__label`} htmlFor="avatar">Avatar URL (optional)</label>
          <TextField
            id="avatar"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Avatar URL or leave blank for initials"
            fullWidth
          />
          <div className={`${baseClass}__avatar-preview`}>
            {formData.avatar ? (
              <img 
                src={formData.avatar} 
                alt="Avatar preview" 
                className={`${baseClass}__avatar-image`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.textContent = generateInitialsAvatar(formData.firstName, formData.lastName);
                  e.target.classList.add(`${baseClass}__avatar-initials`);
                }}
              />
            ) : (
              <div className={`${baseClass}__avatar-initials`}>
                {generateInitialsAvatar(formData.firstName, formData.lastName)}
              </div>
            )}
          </div>
        </div>
        
        <div className={`${baseClass}__actions`}>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="primary"
          >
            {isNewContact ? 'Create' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;