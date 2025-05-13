/**
 * Calendar App
 * 
 * A calendar application for managing events and appointments.
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
  SearchField
} from '../../components/registry';
import Calendar from '../../components/display/calendar/Calendar';
import EventForm from './components/EventForm';
import './CalendarApp.css';

// Mock calendar data
const MOCK_CALENDARS = [
  { id: 'personal', name: 'Personal', color: '#3498db' },
  { id: 'work', name: 'Work', color: '#e74c3c' },
  { id: 'family', name: 'Family', color: '#2ecc71' },
  { id: 'holidays', name: 'Holidays', color: '#f39c12' },
];

const MOCK_EVENTS = [
  {
    id: 'event1',
    title: 'Team Meeting',
    description: 'Weekly team sync meeting',
    date: '2025-05-13T10:00:00Z',
    duration: 1,
    location: 'Conference Room A',
    color: '#e74c3c',
    calendar: 'work'
  },
  {
    id: 'event2',
    title: 'Lunch with Sarah',
    description: 'Catch up over lunch',
    date: '2025-05-13T12:30:00Z',
    duration: 1.5,
    location: 'Cafe Downtown',
    color: '#3498db',
    calendar: 'personal'
  },
  {
    id: 'event3',
    title: 'Project Deadline',
    description: 'Submit final project deliverables',
    date: '2025-05-15T17:00:00Z',
    duration: 1,
    location: '',
    color: '#e74c3c',
    calendar: 'work'
  },
  {
    id: 'event4',
    title: 'Gym Session',
    description: 'Weekly workout',
    date: '2025-05-14T18:00:00Z',
    duration: 1.5,
    location: 'Fitness Center',
    color: '#3498db',
    calendar: 'personal'
  },
  {
    id: 'event5',
    title: 'Family Dinner',
    description: 'Monthly family gathering',
    date: '2025-05-16T19:00:00Z',
    duration: 2,
    location: "Mom's House",
    color: '#2ecc71',
    calendar: 'family'
  },
  {
    id: 'event6',
    title: 'Doctor Appointment',
    description: 'Annual checkup',
    date: '2025-05-20T14:30:00Z',
    duration: 1,
    location: 'Medical Center',
    color: '#3498db',
    calendar: 'personal'
  },
  {
    id: 'event7',
    title: 'Memorial Day',
    description: 'Public Holiday',
    date: '2025-05-26T00:00:00Z',
    duration: 24,
    location: '',
    color: '#f39c12',
    calendar: 'holidays'
  }
];

/**
 * Calendar App Component
 */
const CalendarApp = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [calendars, setCalendars] = useState(MOCK_CALENDARS);
  const [activeCalendars, setActiveCalendars] = useState(calendars.map(cal => cal.id));
  const [searchQuery, setSearchQuery] = useState('');
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Filter events based on active calendars and search query
  const filteredEvents = events.filter(event => {
    const matchesCalendar = activeCalendars.includes(event.calendar);
    const matchesSearch = searchQuery === '' || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCalendar && matchesSearch;
  });

  // Toggle calendar visibility
  const toggleCalendar = (calendarId) => {
    setActiveCalendars(prevActive => {
      if (prevActive.includes(calendarId)) {
        return prevActive.filter(id => id !== calendarId);
      } else {
        return [...prevActive, calendarId];
      }
    });
  };

  // Handle date change in calendar
  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  // Handle date selection in calendar
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setShowEventForm(true);
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Create new event
  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setShowEventForm(true);
  };

  // Edit existing event
  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  };

  // Save event (create or update)
  const handleSaveEvent = (event) => {
    if (selectedEvent) {
      // Update existing event
      setEvents(prevEvents => 
        prevEvents.map(e => e.id === event.id ? event : e)
      );
    } else {
      // Create new event
      setEvents(prevEvents => [...prevEvents, event]);
    }
    setShowEventForm(false);
  };

  // Cancel event form
  const handleCancelEventForm = () => {
    setShowEventForm(false);
  };

  // Delete event
  const handleDeleteEvent = (eventId) => {
    setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
  };

  // Get upcoming events (next 7 days)
  const getUpcomingEvents = () => {
    const now = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(now.getDate() + 7);
    
    return filteredEvents
      .filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= now && eventDate <= sevenDaysLater;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Format event time
  const formatEventTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  // Format event date
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="calendar-app">
      <AppLayout
        header={
          <AppHeader
            title="Calendar"
            icon="📅"
            actions={
              <div className="calendar-app__header-actions">
                <SearchField
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={handleSearch}
                  className="calendar-app__search"
                />
                <Button 
                  variant="primary"
                  onClick={handleCreateEvent}
                  className="calendar-app__create-button"
                >
                  Create Event
                </Button>
              </div>
            }
          />
        }
        sidebar={
          <div className="calendar-app__sidebar-content">
            <h3 className="calendar-app__sidebar-title">My Calendars</h3>
            <List className="calendar-app__calendars">
              {calendars.map(calendar => (
                <ListItem
                  key={calendar.id}
                  primary={calendar.name}
                  startIcon={
                    <div 
                      className="calendar-app__calendar-color" 
                      style={{ backgroundColor: calendar.color }}
                    />
                  }
                  onClick={() => toggleCalendar(calendar.id)}
                  selected={activeCalendars.includes(calendar.id)}
                />
              ))}
            </List>
            
            <ListDivider />
            
            <h3 className="calendar-app__sidebar-title">Upcoming Events</h3>
            <div className="calendar-app__upcoming">
              {getUpcomingEvents().length > 0 ? (
                getUpcomingEvents().map(event => (
                  <div 
                    key={event.id} 
                    className="calendar-app__upcoming-event"
                    onClick={() => handleEditEvent(event)}
                  >
                    <div 
                      className="calendar-app__upcoming-event-indicator" 
                      style={{ backgroundColor: event.color }}
                    />
                    <div className="calendar-app__upcoming-event-content">
                      <div className="calendar-app__upcoming-event-title">{event.title}</div>
                      <div className="calendar-app__upcoming-event-details">
                        {formatEventDate(event.date)} • {formatEventTime(event.date)}
                      </div>
                      {event.location && (
                        <div className="calendar-app__upcoming-event-location">{event.location}</div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="calendar-app__no-events">No upcoming events</div>
              )}
            </div>
          </div>
        }
      >
        <div className="calendar-app__content">
          <Calendar
            date={currentDate}
            view={currentView}
            events={filteredEvents}
            onDateChange={handleDateChange}
            onDateSelect={handleDateSelect}
            className="calendar-app__calendar"
          />
        </div>
        
        {showEventForm && (
          <div className="calendar-app__modal">
            <div className="calendar-app__modal-backdrop" onClick={handleCancelEventForm}></div>
            <EventForm
              event={selectedEvent}
              defaultDate={selectedDate}
              onSave={handleSaveEvent}
              onCancel={handleCancelEventForm}
              className="calendar-app__event-form"
            />
          </div>
        )}
      </AppLayout>
    </div>
  );
};

export default CalendarApp;