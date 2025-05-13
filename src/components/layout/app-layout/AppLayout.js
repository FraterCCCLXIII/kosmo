/**
 * AppLayout Component
 * 
 * A standardized layout component for app interfaces.
 * Provides consistent structure with header, content, and footer areas.
 */

import React from 'react';
import './AppLayout.css';

/**
 * AppLayout component for standardized app interfaces
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Main content
 * @param {React.ReactNode} props.header - Header content
 * @param {React.ReactNode} props.footer - Footer content
 * @param {React.ReactNode} props.sidebar - Sidebar content
 * @param {string} props.sidebarPosition - Sidebar position ('left', 'right')
 * @param {boolean} props.sidebarCollapsible - Whether sidebar can be collapsed
 * @param {boolean} props.sidebarCollapsed - Whether sidebar is collapsed
 * @param {Function} props.onSidebarToggle - Callback when sidebar is toggled
 * @param {string} props.className - Additional CSS class
 */
const AppLayout = ({
  children,
  header,
  footer,
  sidebar,
  sidebarPosition = 'left',
  sidebarCollapsible = false,
  sidebarCollapsed = false,
  onSidebarToggle,
  className = '',
  ...props
}) => {
  const baseClass = 'kosmo-app-layout';
  const classes = [
    baseClass,
    sidebar ? `${baseClass}--with-sidebar` : '',
    sidebar && sidebarPosition === 'right' ? `${baseClass}--sidebar-right` : '',
    sidebar && sidebarCollapsed ? `${baseClass}--sidebar-collapsed` : '',
    className
  ].filter(Boolean).join(' ');

  const handleSidebarToggle = () => {
    if (sidebarCollapsible && onSidebarToggle) {
      onSidebarToggle(!sidebarCollapsed);
    }
  };

  return (
    <div className={classes} {...props}>
      {header && (
        <header className={`${baseClass}__header`}>
          {header}
        </header>
      )}
      
      <div className={`${baseClass}__body`}>
        {sidebar && sidebarPosition === 'left' && (
          <aside className={`${baseClass}__sidebar`}>
            {sidebarCollapsible && (
              <button 
                className={`${baseClass}__sidebar-toggle`}
                onClick={handleSidebarToggle}
                aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {sidebarCollapsed ? '→' : '←'}
              </button>
            )}
            <div className={`${baseClass}__sidebar-content`}>
              {sidebar}
            </div>
          </aside>
        )}
        
        <main className={`${baseClass}__content`}>
          {children}
        </main>
        
        {sidebar && sidebarPosition === 'right' && (
          <aside className={`${baseClass}__sidebar`}>
            {sidebarCollapsible && (
              <button 
                className={`${baseClass}__sidebar-toggle`}
                onClick={handleSidebarToggle}
                aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {sidebarCollapsed ? '←' : '→'}
              </button>
            )}
            <div className={`${baseClass}__sidebar-content`}>
              {sidebar}
            </div>
          </aside>
        )}
      </div>
      
      {footer && (
        <footer className={`${baseClass}__footer`}>
          {footer}
        </footer>
      )}
    </div>
  );
};

/**
 * AppHeader component for app headers
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Header content
 * @param {React.ReactNode} props.title - Header title
 * @param {React.ReactNode} props.icon - Header icon
 * @param {React.ReactNode} props.actions - Header actions
 * @param {Function} props.onBack - Back button handler
 * @param {string} props.className - Additional CSS class
 */
export const AppHeader = ({
  children,
  title,
  icon,
  actions,
  onBack,
  className = '',
  ...props
}) => {
  const baseClass = 'kosmo-app-header';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  // If children are provided, render them directly
  if (children) {
    return (
      <div className={classes} {...props}>
        {children}
      </div>
    );
  }

  // Otherwise, construct the header from props
  return (
    <div className={classes} {...props}>
      <div className={`${baseClass}__left`}>
        {onBack && (
          <button 
            className={`${baseClass}__back-button`}
            onClick={onBack}
            aria-label="Go back"
          >
            ←
          </button>
        )}
        
        {icon && (
          <div className={`${baseClass}__icon`}>
            {icon}
          </div>
        )}
        
        {title && (
          <h1 className={`${baseClass}__title`}>{title}</h1>
        )}
      </div>
      
      {actions && (
        <div className={`${baseClass}__actions`}>
          {actions}
        </div>
      )}
    </div>
  );
};

/**
 * AppContent component for app content area
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content
 * @param {boolean} props.padded - Whether to add padding
 * @param {boolean} props.scrollable - Whether content is scrollable
 * @param {string} props.className - Additional CSS class
 */
export const AppContent = ({
  children,
  padded = true,
  scrollable = true,
  className = '',
  ...props
}) => {
  const baseClass = 'kosmo-app-content';
  const classes = [
    baseClass,
    padded ? `${baseClass}--padded` : '',
    scrollable ? `${baseClass}--scrollable` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

/**
 * AppFooter component for app footers
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Footer content
 * @param {React.ReactNode} props.actions - Footer actions
 * @param {string} props.className - Additional CSS class
 */
export const AppFooter = ({
  children,
  actions,
  className = '',
  ...props
}) => {
  const baseClass = 'kosmo-app-footer';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  // If children are provided, render them directly
  if (children) {
    return (
      <div className={classes} {...props}>
        {children}
      </div>
    );
  }

  // Otherwise, construct the footer from props
  return (
    <div className={classes} {...props}>
      <div className={`${baseClass}__actions`}>
        {actions}
      </div>
    </div>
  );
};

/**
 * AppSidebar component for app sidebars
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Sidebar content
 * @param {string} props.width - Sidebar width
 * @param {string} props.className - Additional CSS class
 */
export const AppSidebar = ({
  children,
  width = '250px',
  className = '',
  ...props
}) => {
  const baseClass = 'kosmo-app-sidebar';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} style={{ width }} {...props}>
      {children}
    </div>
  );
};

export default AppLayout;