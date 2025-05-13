/**
 * Calendar Component
 * 
 * A flexible calendar component for displaying and interacting with dates.
 */

import React, { useState, useEffect } from 'react';
import './Calendar.css';

/**
 * Calendar component for displaying and interacting with dates
 * 
 * @param {Object} props - Component props
 * @param {Date} props.date - Current date to display
 * @param {Function} props.onDateChange - Callback when date changes
 * @param {Function} props.onDateSelect - Callback when a date is selected
 * @param {Array} props.events - Array of events to display on the calendar
 * @param {string} props.view - Calendar view ('month', 'week', 'day')
 * @param {string} props.className - Additional CSS class
 */
const Calendar = ({
  date = new Date(),
  onDateChange,
  onDateSelect,
  events = [],
  view = 'month',
  className = '',
  ...props
}) => {
  const [currentDate, setCurrentDate] = useState(date);
  const [currentView, setCurrentView] = useState(view);
  const [calendarDays, setCalendarDays] = useState([]);
  
  const baseClass = 'kosmo-calendar';
  const classes = [baseClass, `${baseClass}--${currentView}`, className].filter(Boolean).join(' ');

  // Update internal state when props change
  useEffect(() => {
    setCurrentDate(date);
  }, [date]);

  useEffect(() => {
    setCurrentView(view);
  }, [view]);

  // Generate calendar days whenever the date or view changes
  useEffect(() => {
    generateCalendarDays();
  }, [currentDate, currentView]);

  // Generate days for the calendar based on current view
  const generateCalendarDays = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    if (currentView === 'month') {
      // Get first day of the month
      const firstDay = new Date(year, month, 1);
      const startingDayOfWeek = firstDay.getDay();
      
      // Get last day of the month
      const lastDay = new Date(year, month + 1, 0);
      const totalDays = lastDay.getDate();
      
      // Get days from previous month to fill the first week
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        days.push({
          date: new Date(year, month - 1, prevMonthLastDay - i),
          isCurrentMonth: false,
          events: getEventsForDate(new Date(year, month - 1, prevMonthLastDay - i))
        });
      }
      
      // Get days from current month
      for (let i = 1; i <= totalDays; i++) {
        const date = new Date(year, month, i);
        days.push({
          date,
          isCurrentMonth: true,
          isToday: isToday(date),
          events: getEventsForDate(date)
        });
      }
      
      // Get days from next month to fill the last week
      const remainingDays = 42 - days.length; // 6 rows of 7 days
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: new Date(year, month + 1, i),
          isCurrentMonth: false,
          events: getEventsForDate(new Date(year, month + 1, i))
        });
      }
    } else if (currentView === 'week') {
      // Get the first day of the week (Sunday)
      const day = currentDate.getDay();
      const diff = currentDate.getDate() - day;
      const firstDayOfWeek = new Date(currentDate);
      firstDayOfWeek.setDate(diff);
      
      // Generate 7 days for the week view
      for (let i = 0; i < 7; i++) {
        const date = new Date(firstDayOfWeek);
        date.setDate(firstDayOfWeek.getDate() + i);
        days.push({
          date,
          isToday: isToday(date),
          events: getEventsForDate(date)
        });
      }
    } else if (currentView === 'day') {
      // Just the current day
      days.push({
        date: currentDate,
        isToday: isToday(currentDate),
        events: getEventsForDate(currentDate)
      });
    }
    
    setCalendarDays(days);
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear();
    });
  };

  // Navigate to previous period
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (currentView === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    }
    
    setCurrentDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  // Navigate to next period
  const navigateNext = () => {
    const newDate = new Date(currentDate);
    
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (currentView === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    }
    
    setCurrentDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  // Navigate to today
  const navigateToday = () => {
    const today = new Date();
    setCurrentDate(today);
    if (onDateChange) {
      onDateChange(today);
    }
  };

  // Change view
  const changeView = (newView) => {
    setCurrentView(newView);
  };

  // Handle date selection
  const handleDateSelect = (day) => {
    if (onDateSelect) {
      onDateSelect(day.date);
    }
  };

  // Format date for display
  const formatDate = (date) => {
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  // Render day cells for month view
  const renderMonthView = () => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div className={`${baseClass}__month-view`}>
        <div className={`${baseClass}__weekdays`}>
          {dayNames.map(day => (
            <div key={day} className={`${baseClass}__weekday`}>{day}</div>
          ))}
        </div>
        <div className={`${baseClass}__days`}>
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`${baseClass}__day ${!day.isCurrentMonth ? `${baseClass}__day--faded` : ''} ${day.isToday ? `${baseClass}__day--today` : ''}`}
              onClick={() => handleDateSelect(day)}
            >
              <div className={`${baseClass}__day-number`}>{day.date.getDate()}</div>
              <div className={`${baseClass}__day-events`}>
                {day.events.slice(0, 3).map((event, eventIndex) => (
                  <div 
                    key={eventIndex} 
                    className={`${baseClass}__event`}
                    style={{ backgroundColor: event.color || 'var(--color-primary)' }}
                    title={event.title}
                  >
                    {day.events.length <= 2 && (
                      <span className={`${baseClass}__event-title`}>{event.title}</span>
                    )}
                  </div>
                ))}
                {day.events.length > 3 && (
                  <div className={`${baseClass}__more-events`}>+{day.events.length - 3} more</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return (
      <div className={`${baseClass}__week-view`}>
        <div className={`${baseClass}__week-header`}>
          <div className={`${baseClass}__week-header-time`}></div>
          {calendarDays.map((day, index) => {
            const dayName = day.date.toLocaleDateString(undefined, { weekday: 'short' });
            const dayNumber = day.date.getDate();
            return (
              <div 
                key={index} 
                className={`${baseClass}__week-header-day ${day.isToday ? `${baseClass}__week-header-day--today` : ''}`}
              >
                <div className={`${baseClass}__week-header-name`}>{dayName}</div>
                <div className={`${baseClass}__week-header-number`}>{dayNumber}</div>
              </div>
            );
          })}
        </div>
        <div className={`${baseClass}__week-body`}>
          <div className={`${baseClass}__week-hours`}>
            {hours.map(hour => (
              <div key={hour} className={`${baseClass}__week-hour`}>
                <div className={`${baseClass}__week-hour-label`}>
                  {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                </div>
              </div>
            ))}
          </div>
          <div className={`${baseClass}__week-grid`}>
            {calendarDays.map((day, dayIndex) => (
              <div key={dayIndex} className={`${baseClass}__week-day-column`}>
                {hours.map(hour => (
                  <div key={hour} className={`${baseClass}__week-cell`}></div>
                ))}
                {day.events.map((event, eventIndex) => {
                  const eventDate = new Date(event.date);
                  const startHour = eventDate.getHours() + (eventDate.getMinutes() / 60);
                  const duration = event.duration || 1; // Default 1 hour
                  
                  return (
                    <div
                      key={eventIndex}
                      className={`${baseClass}__week-event`}
                      style={{
                        top: `${startHour * 60}px`,
                        height: `${duration * 60}px`,
                        backgroundColor: event.color || 'var(--color-primary)'
                      }}
                      title={event.title}
                    >
                      <div className={`${baseClass}__week-event-title`}>{event.title}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render day view
  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const day = calendarDays[0];
    
    return (
      <div className={`${baseClass}__day-view`}>
        <div className={`${baseClass}__day-header`}>
          <div className={`${baseClass}__day-header-date ${day.isToday ? `${baseClass}__day-header-date--today` : ''}`}>
            {day.date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
        <div className={`${baseClass}__day-body`}>
          <div className={`${baseClass}__day-hours`}>
            {hours.map(hour => (
              <div key={hour} className={`${baseClass}__day-hour`}>
                <div className={`${baseClass}__day-hour-label`}>
                  {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                </div>
              </div>
            ))}
          </div>
          <div className={`${baseClass}__day-grid`}>
            {hours.map(hour => (
              <div key={hour} className={`${baseClass}__day-cell`}></div>
            ))}
            {day.events.map((event, eventIndex) => {
              const eventDate = new Date(event.date);
              const startHour = eventDate.getHours() + (eventDate.getMinutes() / 60);
              const duration = event.duration || 1; // Default 1 hour
              
              return (
                <div
                  key={eventIndex}
                  className={`${baseClass}__day-event`}
                  style={{
                    top: `${startHour * 60}px`,
                    height: `${duration * 60}px`,
                    backgroundColor: event.color || 'var(--color-primary)'
                  }}
                  title={event.title}
                >
                  <div className={`${baseClass}__day-event-title`}>{event.title}</div>
                  {event.location && (
                    <div className={`${baseClass}__day-event-location`}>{event.location}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={classes} {...props}>
      <div className={`${baseClass}__header`}>
        <div className={`${baseClass}__title`}>{formatDate(currentDate)}</div>
        <div className={`${baseClass}__controls`}>
          <button className={`${baseClass}__control-button`} onClick={navigateToday}>Today</button>
          <div className={`${baseClass}__navigation`}>
            <button className={`${baseClass}__nav-button`} onClick={navigatePrevious}>←</button>
            <button className={`${baseClass}__nav-button`} onClick={navigateNext}>→</button>
          </div>
          <div className={`${baseClass}__view-selector`}>
            <button 
              className={`${baseClass}__view-button ${currentView === 'month' ? `${baseClass}__view-button--active` : ''}`} 
              onClick={() => changeView('month')}
            >
              Month
            </button>
            <button 
              className={`${baseClass}__view-button ${currentView === 'week' ? `${baseClass}__view-button--active` : ''}`} 
              onClick={() => changeView('week')}
            >
              Week
            </button>
            <button 
              className={`${baseClass}__view-button ${currentView === 'day' ? `${baseClass}__view-button--active` : ''}`} 
              onClick={() => changeView('day')}
            >
              Day
            </button>
          </div>
        </div>
      </div>
      <div className={`${baseClass}__body`}>
        {currentView === 'month' && renderMonthView()}
        {currentView === 'week' && renderWeekView()}
        {currentView === 'day' && renderDayView()}
      </div>
    </div>
  );
};

export default Calendar;