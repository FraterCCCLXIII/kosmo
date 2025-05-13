/**
 * Tabs Component
 * 
 * A flexible tabs component that can be used for navigation within apps.
 * Supports different styles (top, bottom), orientations, and content.
 */

import React, { useState, useEffect } from 'react';
import './Tabs.css';

/**
 * Tabs component for navigation within apps
 * 
 * @param {Object} props - Component props
 * @param {Array} props.tabs - Array of tab objects with { id, label, icon, content }
 * @param {string} props.activeTab - ID of the active tab
 * @param {Function} props.onTabChange - Callback when tab changes
 * @param {string} props.position - Position of tabs ('top', 'bottom')
 * @param {string} props.variant - Visual variant ('default', 'pills', 'underline')
 * @param {boolean} props.showLabels - Whether to show tab labels
 * @param {boolean} props.showIcons - Whether to show tab icons
 * @param {string} props.className - Additional CSS class
 */
const Tabs = ({
  tabs = [],
  activeTab = null,
  onTabChange,
  position = 'top',
  variant = 'default',
  showLabels = true,
  showIcons = true,
  className = '',
  ...props
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab || (tabs.length > 0 ? tabs[0].id : null));

  // Update current tab if activeTab prop changes
  useEffect(() => {
    if (activeTab !== null && activeTab !== undefined) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  // Handle tab click
  const handleTabClick = (tabId) => {
    setCurrentTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  // Get active tab content
  const getActiveTabContent = () => {
    const activeTabObj = tabs.find(tab => tab.id === currentTab);
    return activeTabObj ? activeTabObj.content : null;
  };

  // Build class names
  const baseClass = 'kosmo-tabs';
  const classes = [
    baseClass,
    `${baseClass}--${position}`,
    `${baseClass}--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const tabsNavClasses = [
    `${baseClass}__nav`,
    `${baseClass}__nav--${position}`
  ].join(' ');

  return (
    <div className={classes} {...props}>
      {position === 'top' && (
        <nav className={tabsNavClasses}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${baseClass}__tab ${currentTab === tab.id ? `${baseClass}__tab--active` : ''}`}
              onClick={() => handleTabClick(tab.id)}
              aria-selected={currentTab === tab.id}
              role="tab"
            >
              {showIcons && tab.icon && (
                <span className={`${baseClass}__tab-icon`}>{tab.icon}</span>
              )}
              {showLabels && tab.label && (
                <span className={`${baseClass}__tab-label`}>{tab.label}</span>
              )}
            </button>
          ))}
        </nav>
      )}

      <div className={`${baseClass}__content`}>
        {getActiveTabContent()}
      </div>

      {position === 'bottom' && (
        <nav className={tabsNavClasses}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${baseClass}__tab ${currentTab === tab.id ? `${baseClass}__tab--active` : ''}`}
              onClick={() => handleTabClick(tab.id)}
              aria-selected={currentTab === tab.id}
              role="tab"
            >
              {showIcons && tab.icon && (
                <span className={`${baseClass}__tab-icon`}>{tab.icon}</span>
              )}
              {showLabels && tab.label && (
                <span className={`${baseClass}__tab-label`}>{tab.label}</span>
              )}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Tabs;

/**
 * TabPanel component for use with Tabs
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Tab panel content
 * @param {string} props.className - Additional CSS class
 */
export const TabPanel = ({
  children,
  className = '',
  ...props
}) => {
  const baseClass = 'kosmo-tab-panel';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="tabpanel" {...props}>
      {children}
    </div>
  );
};