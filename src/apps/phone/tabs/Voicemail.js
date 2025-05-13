/**
 * Phone App - Voicemail Tab
 */

import React from 'react';

const Voicemail = () => {
  // Mock data for voicemails
  const voicemails = [
    {
      id: 1,
      name: 'John Doe',
      number: '+1 (555) 123-4567',
      time: '10:30 AM',
      date: 'Today',
      duration: '0:45',
      isNew: true
    },
    {
      id: 2,
      name: 'Jane Smith',
      number: '+1 (555) 987-6543',
      time: 'Yesterday',
      date: 'May 12',
      duration: '1:23',
      isNew: true
    },
    {
      id: 3,
      name: 'Unknown',
      number: '+1 (555) 555-5555',
      time: '3:45 PM',
      date: 'May 10',
      duration: '0:12',
      isNew: false
    },
    {
      id: 4,
      name: 'Mom',
      number: '+1 (555) 111-2222',
      time: '2:20 PM',
      date: 'May 9',
      duration: '2:05',
      isNew: false
    },
    {
      id: 5,
      name: 'Work',
      number: '+1 (555) 333-4444',
      time: '7:15 PM',
      date: 'May 8',
      duration: '0:58',
      isNew: false
    }
  ];
  
  // Handle play button press
  const handlePlay = (id) => {
    console.log(`Playing voicemail ${id}...`);
    alert(`Playing voicemail...`);
  };
  
  return (
    <div className="phone-voicemail">
      <ul className="phone-voicemail__list">
        {voicemails.map((voicemail) => (
          <li key={voicemail.id} className="phone-voicemail__item">
            <div className="phone-voicemail__icon">
              📩
            </div>
            
            <div className="phone-voicemail__details">
              <h3 className="phone-voicemail__name">
                {voicemail.name}
                {voicemail.isNew && (
                  <span className="phone-voicemail__new-badge">New</span>
                )}
              </h3>
              <p className="phone-voicemail__time">
                {voicemail.time} • {voicemail.date}
              </p>
            </div>
            
            <div className="phone-voicemail__duration">
              {voicemail.duration}
            </div>
            
            <button 
              className="phone-voicemail__play-button"
              onClick={() => handlePlay(voicemail.id)}
            >
              ▶️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Voicemail;