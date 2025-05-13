/**
 * Contact Detail Component
 * 
 * Displays detailed information about a contact.
 */

import React from 'react';
import { Button } from '../../../components/registry';
import './ContactDetail.css';

/**
 * ContactDetail component for displaying contact information
 * 
 * @param {Object} props - Component props
 * @param {Object} props.contact - Contact to display
 * @param {Function} props.onEdit - Callback when edit button is clicked
 * @param {Function} props.onDelete - Callback when delete button is clicked
 * @param {Function} props.onBack - Callback when back button is clicked
 * @param {string} props.className - Additional CSS class
 */
const ContactDetail = ({
  contact,
  onEdit,
  onDelete,
  onBack,
  className = '',
  ...props
}) => {
  if (!contact) return null;
  
  const baseClass = 'kosmo-contact-detail';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  // Generate avatar with initials if no avatar URL
  const renderAvatar = () => {
    if (contact.avatar && contact.avatar.startsWith('http')) {
      return (
        <img 
          src={contact.avatar} 
          alt={`${contact.firstName} ${contact.lastName}`} 
          className={`${baseClass}__avatar-image`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.textContent = `${contact.firstName?.charAt(0) || ''}${contact.lastName?.charAt(0) || ''}`;
            e.target.classList.add(`${baseClass}__avatar-initials`);
          }}
        />
      );
    } else {
      return (
        <div className={`${baseClass}__avatar-initials`}>
          {contact.avatar || `${contact.firstName?.charAt(0) || ''}${contact.lastName?.charAt(0) || ''}`}
        </div>
      );
    }
  };

  // Format phone number
  const formatPhone = (phone) => {
    if (!phone) return '';
    
    // Simple formatting for US numbers, could be expanded for international
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  return (
    <div className={classes} {...props}>
      <div className={`${baseClass}__header`}>
        <button 
          className={`${baseClass}__back-button`}
          onClick={onBack}
          aria-label="Back to contacts list"
        >
          ←
        </button>
        <div className={`${baseClass}__actions`}>
          <Button 
            variant="secondary" 
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button 
            variant="danger" 
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete ${contact.firstName} ${contact.lastName}?`)) {
                onDelete(contact.id);
              }
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      
      <div className={`${baseClass}__content`}>
        <div className={`${baseClass}__avatar`}>
          {renderAvatar()}
        </div>
        
        <h2 className={`${baseClass}__name`}>
          {contact.firstName} {contact.lastName}
        </h2>
        
        {(contact.company || contact.jobTitle) && (
          <div className={`${baseClass}__job`}>
            {contact.jobTitle && <span className={`${baseClass}__job-title`}>{contact.jobTitle}</span>}
            {contact.jobTitle && contact.company && <span> at </span>}
            {contact.company && <span className={`${baseClass}__company`}>{contact.company}</span>}
          </div>
        )}
        
        <div className={`${baseClass}__section`}>
          <h3 className={`${baseClass}__section-title`}>Contact Information</h3>
          
          {contact.email && (
            <div className={`${baseClass}__field`}>
              <div className={`${baseClass}__field-label`}>Email</div>
              <div className={`${baseClass}__field-value`}>
                <a href={`mailto:${contact.email}`} className={`${baseClass}__link`}>
                  {contact.email}
                </a>
              </div>
            </div>
          )}
          
          {contact.phone && (
            <div className={`${baseClass}__field`}>
              <div className={`${baseClass}__field-label`}>Phone</div>
              <div className={`${baseClass}__field-value`}>
                <a href={`tel:${contact.phone}`} className={`${baseClass}__link`}>
                  {formatPhone(contact.phone)}
                </a>
              </div>
            </div>
          )}
          
          {contact.address && (
            <div className={`${baseClass}__field`}>
              <div className={`${baseClass}__field-label`}>Address</div>
              <div className={`${baseClass}__field-value`}>
                {contact.address}
              </div>
            </div>
          )}
        </div>
        
        {contact.notes && (
          <div className={`${baseClass}__section`}>
            <h3 className={`${baseClass}__section-title`}>Notes</h3>
            <div className={`${baseClass}__notes`}>
              {contact.notes}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDetail;