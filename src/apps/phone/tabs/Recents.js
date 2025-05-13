/**
 * Phone App - Recents Tab
 */

import React from 'react';
import { Card } from '../../../components/registry';

const Recents = () => {
  // Mock data for recent calls
  const recentCalls = [
    {
      id: 1,
      name: 'John Doe',
      number: '+1 (555) 123-4567',
      time: '10:30 AM',
      date: 'Today',
      type: 'incoming',
      missed: false
    },
    {
      id: 2,
      name: 'Jane Smith',
      number: '+1 (555) 987-6543',
      time: 'Yesterday',
      date: 'May 12',
      type: 'outgoing',
      missed: false
    },
    {
      id: 3,
      name: 'Unknown',
      number: '+1 (555) 555-5555',
      time: '3:45 PM',
      date: 'May 10',
      type: 'incoming',
      missed: true
    },
    {
      id: 4,
      name: 'Mom',
      number: '+1 (555) 111-2222',
      time: '2:20 PM',
      date: 'May 9',
      type: 'outgoing',
      missed: false
    },
    {
      id: 5,
      name: 'Pizza Delivery',
      number: '+1 (555) 333-4444',
      time: '7:15 PM',
      date: 'May 8',
      type: 'outgoing',
      missed: false
    }
  ];
  
  // Get icon for call type
  const getCallIcon = (type, missed) => {
    if (type === 'incoming') {
      return missed ? '📵' : '📲';
    } else {
      return '📱';
    }
  };
  
  // Handle call button press
  const handleCall = (number) => {
    console.log(`Calling ${number}...`);
    alert(`Calling ${number}...`);
  };
  
  return (
    <div className="phone-recents">
      <ul className="phone-recents__list">
        {recentCalls.map((call) => (
          <li key={call.id} className="phone-recents__item">
            <div className="phone-recents__icon">
              {getCallIcon(call.type, call.missed)}
            </div>
            
            <div className="phone-recents__details">
              <h3 className="phone-recents__name">
                {call.name}
                {call.missed && ' (Missed)'}
              </h3>
              <p className="phone-recents__number">{call.number}</p>
            </div>
            
            <div className="phone-recents__time">
              {call.time}
            </div>
            
            <button 
              className="phone-recents__call-button"
              onClick={() => handleCall(call.number)}
            >
              📞
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recents;