/**
 * Settings App
 * 
 * Main application for system settings and configuration.
 */

import React, { useState } from 'react';
import { 
  AppLayout, 
  AppHeader, 
  AppContent, 
  List, 
  ListItem, 
  ListDivider,
  Tabs,
  TabPanel
} from '../../components/registry';
import SettingsPanel, { SettingsGroup, SettingsItem } from './components/SettingsPanel';
import './SettingsApp.css';

// Mock settings data
const SETTINGS_CATEGORIES = [
  { id: 'general', label: 'General', icon: '⚙️' },
  { id: 'appearance', label: 'Appearance', icon: '🎨' },
  { id: 'privacy', label: 'Privacy & Security', icon: '🔒' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'sound', label: 'Sound', icon: '🔊' },
  { id: 'network', label: 'Network', icon: '📶' },
  { id: 'storage', label: 'Storage', icon: '💾' },
  { id: 'battery', label: 'Battery', icon: '🔋' },
  { id: 'apps', label: 'Apps', icon: '📱' },
  { id: 'accessibility', label: 'Accessibility', icon: '♿' },
  { id: 'about', label: 'About', icon: 'ℹ️' },
];

// Mock settings for General category
const GENERAL_SETTINGS = [
  { 
    id: 'language', 
    label: 'Language', 
    description: 'System language and region settings',
    value: 'English (US)',
    icon: '🌐'
  },
  { 
    id: 'date-time', 
    label: 'Date & Time', 
    description: 'Time zone, format, and automatic settings',
    value: 'Automatic',
    icon: '🕒'
  },
  { 
    id: 'keyboard', 
    label: 'Keyboard', 
    description: 'Layout, shortcuts, and input methods',
    icon: '⌨️'
  },
  { 
    id: 'backup', 
    label: 'Backup & Reset', 
    description: 'Backup data and reset system settings',
    icon: '🔄'
  },
  { 
    id: 'updates', 
    label: 'System Updates', 
    description: 'Check for system updates',
    value: 'Up to date',
    icon: '📥'
  },
];

// Mock settings for Appearance category
const APPEARANCE_SETTINGS = [
  { 
    id: 'theme', 
    label: 'Theme', 
    description: 'Light, dark, or system theme',
    value: 'System',
    icon: '🌓'
  },
  { 
    id: 'colors', 
    label: 'Accent Color', 
    description: 'System accent color',
    value: 'Blue',
    icon: '🎨'
  },
  { 
    id: 'wallpaper', 
    label: 'Wallpaper', 
    description: 'Desktop and lock screen wallpaper',
    icon: '🖼️'
  },
  { 
    id: 'font', 
    label: 'Font', 
    description: 'System font and size',
    value: 'Default',
    icon: '🔤'
  },
];

/**
 * Settings App Component
 */
const SettingsApp = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedTab, setSelectedTab] = useState('general');

  // Get settings for the selected category
  const getSettingsForCategory = (categoryId) => {
    switch (categoryId) {
      case 'general':
        return GENERAL_SETTINGS;
      case 'appearance':
        return APPEARANCE_SETTINGS;
      default:
        return [];
    }
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id);
    setSelectedTab(category.id);
  };

  // Handle setting item click
  const handleSettingClick = (setting) => {
    console.log('Setting clicked:', setting);
    // In a real app, this would open a dialog or navigate to a detail view
  };

  return (
    <div className="settings-app">
      <AppLayout
        header={
          <AppHeader
            title="Settings"
            icon="⚙️"
          />
        }
      >
        <div className="settings-app__layout">
          {/* Categories sidebar */}
          <div className="settings-app__sidebar">
            <List variant="default" className="settings-app__categories">
              {SETTINGS_CATEGORIES.map((category, index) => (
                <ListItem
                  key={category.id}
                  primary={category.label}
                  startIcon={category.icon}
                  selected={selectedCategory === category.id}
                  onClick={() => handleCategorySelect(category)}
                />
              ))}
            </List>
          </div>
          
          {/* Settings content */}
          <div className="settings-app__content">
            <Tabs
              value={selectedTab}
              onChange={setSelectedTab}
              variant="underlined"
              className="settings-app__tabs"
            >
              {SETTINGS_CATEGORIES.map(category => (
                <TabPanel 
                  key={category.id} 
                  value={category.id} 
                  label={category.label}
                >
                  <div className="settings-app__panel">
                    <h2 className="settings-app__panel-title">
                      {category.icon} {category.label} Settings
                    </h2>
                    
                    {category.id === 'general' && (
                      <>
                        <SettingsGroup 
                          title="System Preferences"
                          description="Configure basic system settings"
                        >
                          {GENERAL_SETTINGS.slice(0, 3).map(setting => (
                            <SettingsItem
                              key={setting.id}
                              label={setting.label}
                              description={setting.description}
                              icon={setting.icon}
                              control={setting.value ? <span>{setting.value}</span> : <span>→</span>}
                              onClick={() => handleSettingClick(setting)}
                            />
                          ))}
                        </SettingsGroup>
                        
                        <SettingsGroup 
                          title="System Maintenance"
                          description="Backup, updates, and system reset options"
                        >
                          {GENERAL_SETTINGS.slice(3).map(setting => (
                            <SettingsItem
                              key={setting.id}
                              label={setting.label}
                              description={setting.description}
                              icon={setting.icon}
                              control={setting.value ? <span>{setting.value}</span> : <span>→</span>}
                              onClick={() => handleSettingClick(setting)}
                            />
                          ))}
                        </SettingsGroup>
                      </>
                    )}
                    
                    {category.id === 'appearance' && (
                      <SettingsGroup 
                        title="Visual Settings"
                        description="Customize the look and feel of your system"
                      >
                        {APPEARANCE_SETTINGS.map(setting => (
                          <SettingsItem
                            key={setting.id}
                            label={setting.label}
                            description={setting.description}
                            icon={setting.icon}
                            control={setting.value ? <span>{setting.value}</span> : <span>→</span>}
                            onClick={() => handleSettingClick(setting)}
                          />
                        ))}
                      </SettingsGroup>
                    )}
                    
                    {!['general', 'appearance'].includes(category.id) && (
                      <SettingsPanel
                        items={getSettingsForCategory(category.id)}
                        onItemClick={handleSettingClick}
                      />
                    )}
                  </div>
                </TabPanel>
              ))}
            </Tabs>
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default SettingsApp;