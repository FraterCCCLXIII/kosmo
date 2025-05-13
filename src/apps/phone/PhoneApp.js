/**
 * Phone App Component
 * 
 * Main component for the Phone app interface.
 */

import React, { useState } from 'react';
import AppTemplate from '../_template/AppTemplate.js';
import { Button, Card, CardContent, TextField } from '../../components/registry';
import './styles.css';

// Tab components
import Keypad from './tabs/Keypad';
import Recents from './tabs/Recents';
import Contacts from './tabs/Contacts';
import Voicemail from './tabs/Voicemail';

const PhoneApp = ({
  appName,
  appIcon,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('keypad');
  
  // Header actions
  const headerActions = [
    <Button key="settings" variant="ghost" size="small">
      ⚙️
    </Button>
  ];
  
  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'keypad':
        return <Keypad />;
      case 'recents':
        return <Recents />;
      case 'contacts':
        return <Contacts />;
      case 'voicemail':
        return <Voicemail />;
      default:
        return <Keypad />;
    }
  };
  
  return (
    <AppTemplate
      appName={appName}
      appIcon={appIcon}
      showHeader={true}
      headerActions={headerActions}
      onClose={onClose}
      className="phone-app"
    >
      <div className="phone-app__content">
        {renderTabContent()}
      </div>
      
      <nav className="phone-app__tabs">
        <button 
          className={`phone-app__tab ${activeTab === 'keypad' ? 'phone-app__tab--active' : ''}`}
          onClick={() => setActiveTab('keypad')}
        >
          <span className="phone-app__tab-icon">⌨️</span>
          <span className="phone-app__tab-label">Keypad</span>
        </button>
        
        <button 
          className={`phone-app__tab ${activeTab === 'recents' ? 'phone-app__tab--active' : ''}`}
          onClick={() => setActiveTab('recents')}
        >
          <span className="phone-app__tab-icon">🕒</span>
          <span className="phone-app__tab-label">Recents</span>
        </button>
        
        <button 
          className={`phone-app__tab ${activeTab === 'contacts' ? 'phone-app__tab--active' : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          <span className="phone-app__tab-icon">👤</span>
          <span className="phone-app__tab-label">Contacts</span>
        </button>
        
        <button 
          className={`phone-app__tab ${activeTab === 'voicemail' ? 'phone-app__tab--active' : ''}`}
          onClick={() => setActiveTab('voicemail')}
        >
          <span className="phone-app__tab-icon">📧</span>
          <span className="phone-app__tab-label">Voicemail</span>
        </button>
      </nav>
    </AppTemplate>
  );
};

export default PhoneApp;