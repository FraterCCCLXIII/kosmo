/**
 * Phone App - Keypad Tab
 */

import React, { useState } from 'react';
import { Button } from '../../../components/registry';

const Keypad = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Handle keypad button press
  const handleKeyPress = (key) => {
    setPhoneNumber(prev => prev + key);
  };
  
  // Handle backspace
  const handleBackspace = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };
  
  // Handle call button press
  const handleCall = () => {
    if (phoneNumber) {
      console.log(`Calling ${phoneNumber}...`);
      // In a real app, this would initiate a call
      alert(`Calling ${phoneNumber}...`);
    }
  };
  
  // Keypad configuration
  const keypadButtons = [
    { number: '1', letters: '' },
    { number: '2', letters: 'ABC' },
    { number: '3', letters: 'DEF' },
    { number: '4', letters: 'GHI' },
    { number: '5', letters: 'JKL' },
    { number: '6', letters: 'MNO' },
    { number: '7', letters: 'PQRS' },
    { number: '8', letters: 'TUV' },
    { number: '9', letters: 'WXYZ' },
    { number: '*', letters: '' },
    { number: '0', letters: '+' },
    { number: '#', letters: '' },
  ];
  
  return (
    <div className="phone-keypad">
      <div className="phone-keypad__display">
        <h2 className="phone-keypad__number">
          {phoneNumber || 'Enter number'}
        </h2>
      </div>
      
      <div className="phone-keypad__grid">
        {keypadButtons.map((button) => (
          <button
            key={button.number}
            className="phone-keypad__key"
            onClick={() => handleKeyPress(button.number)}
          >
            <span className="phone-keypad__key-number">{button.number}</span>
            {button.letters && (
              <span className="phone-keypad__key-letters">{button.letters}</span>
            )}
          </button>
        ))}
      </div>
      
      <div className="phone-keypad__actions">
        <Button
          variant="primary"
          fullWidth
          onClick={handleCall}
          disabled={!phoneNumber}
          className="phone-keypad__call-button"
        >
          Call
        </Button>
      </div>
    </div>
  );
};

export default Keypad;