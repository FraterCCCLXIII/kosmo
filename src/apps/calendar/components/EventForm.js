/**
 * Event Form Component
 * 
 * A form for creating and editing calendar events.
 */

import React, { useState, useEffect } from 'react';
import { TextField, Button } from '../../../components/registry';
import './EventForm.css';

/**
 * EventForm component for creating and editing calendar events
 * 
 * @param {Object} props - Component props
 * @param {Object} props.event - Event to edit (null for new event)
 * @param {Function} props.onSave - Callback when event is saved
 * @param {Function} props.onCancel - Callback when form is canceled
 * @param {Date} props.defaultDate - Default date for new events
 * @param {string} props.className - Additional CSS class
 */
const EventForm = ({
  event = null,
  onSave,
  onCancel,
  defaultDate = new Date(),
  className = '',
  ...props
}) => {
  const isNewEvent = !event;
  const baseClass = 'kosmo-event-form';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  // Initialize form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    color: '#3498db',
  });

  // Update form when event changes
  useEffect(() => {
    if (event) {
      const eventDate = new Date(event.date);
      const formattedDate = formatDateForInput(eventDate);
      
      // Calculate end time based on duration
      const startTime = formatTimeForInput(eventDate);
      const endDate = new Date(eventDate);
      endDate.setHours(endDate.getHours() + (event.duration || 1));
      const endTime = formatTimeForInput(endDate);
      
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: formattedDate,
        startTime: startTime,
        endTime: endTime,
        location: event.location || '',
        color: event.color || '#3498db',
      });
    } else if (defaultDate) {
      // For new events, use the default date
      setFormData(prevData => ({
        ...prevData,
        date: formatDateForInput(defaultDate),
        startTime: formatTimeForInput(defaultDate),
        endTime: formatTimeForInput(new Date(defaultDate.getTime() + 60 * 60 * 1000)), // 1 hour later
      }));
    }
  }, [event, defaultDate]);

  // Format date for input field (YYYY-MM-DD)
  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Format time for input field (HH:MM)
  const formatTimeForInput = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

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
    
    // Create date object from form data
    const [year, month, day] = formData.date.split('-').map(Number);
    const [startHours, startMinutes] = formData.startTime.split(':').map(Number);
    const [endHours, endMinutes] = formData.endTime.split(':').map(Number);
    
    const startDate = new Date(year, month - 1, day, startHours, startMinutes);
    const endDate = new Date(year, month - 1, day, endHours, endMinutes);
    
    // Calculate duration in hours
    const durationMs = endDate - startDate;
    const durationHours = durationMs / (1000 * 60 * 60);
    
    // Create event object
    const savedEvent = {
      id: event?.id || `event-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      date: startDate.toISOString(),
      duration: durationHours,
      location: formData.location,
      color: formData.color,
    };
    
    if (onSave) {
      onSave(savedEvent);
    }
  };

  return (
    <div className={classes} {...props}>
      <form className={`${baseClass}__form`} onSubmit={handleSubmit}>
        <h2 className={`${baseClass}__title`}>
          {isNewEvent ? 'Create Event' : 'Edit Event'}
        </h2>
        
        <div className={`${baseClass}__field`}>
          <label className={`${baseClass}__label`} htmlFor="title">Title</label>
          <TextField
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event title"
            required
            fullWidth
          />
        </div>
        
        <div className={`${baseClass}__field`}>
          <label className={`${baseClass}__label`} htmlFor="description">Description</label>
          <TextField
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Event description"
            multiline
            rows={3}
            fullWidth
          />
        </div>
        
        <div className={`${baseClass}__field`}>
          <label className={`${baseClass}__label`} htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`${baseClass}__date-input`}
            required
          />
        </div>
        
        <div className={`${baseClass}__row`}>
          <div className={`${baseClass}__field ${baseClass}__field--half`}>
            <label className={`${baseClass}__label`} htmlFor="startTime">Start Time</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className={`${baseClass}__time-input`}
              required
            />
          </div>
          
          <div className={`${baseClass}__field ${baseClass}__field--half`}>
            <label className={`${baseClass}__label`} htmlFor="endTime">End Time</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className={`${baseClass}__time-input`}
              required
            />
          </div>
        </div>
        
        <div className={`${baseClass}__field`}>
          <label className={`${baseClass}__label`} htmlFor="location">Location</label>
          <TextField
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Event location"
            fullWidth
          />
        </div>
        
        <div className={`${baseClass}__field`}>
          <label className={`${baseClass}__label`} htmlFor="color">Color</label>
          <div className={`${baseClass}__color-picker`}>
            <input
              type="color"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className={`${baseClass}__color-input`}
            />
            <span className={`${baseClass}__color-value`}>{formData.color}</span>
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
            {isNewEvent ? 'Create' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;