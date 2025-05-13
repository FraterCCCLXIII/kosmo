/**
 * Kosmo OS UI Kit - App Template
 * 
 * This file serves as a base template for all app interfaces.
 * It provides common functionality and structure that all apps should follow.
 */

import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, CardContent, CardFooter } from '../../components/registry';
import './AppTemplate.css';

const AppTemplate = ({
  appName,
  appIcon,
  appDescription,
  children,
  showHeader = true,
  showFooter = false,
  headerActions = [],
  footerActions = [],
  onClose,
  className = '',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const baseClass = 'kosmo-app';
  const classes = [
    baseClass,
    isLoading ? `${baseClass}--loading` : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={classes} {...props}>
      {isLoading ? (
        <div className={`${baseClass}__loader`}>
          <div className={`${baseClass}__loader-spinner`}></div>
          <div className={`${baseClass}__loader-text`}>Loading {appName}...</div>
        </div>
      ) : (
        <>
          {showHeader && (
            <header className={`${baseClass}__header`}>
              <div className={`${baseClass}__header-left`}>
                {appIcon && (
                  <div className={`${baseClass}__header-icon`}>
                    {appIcon}
                  </div>
                )}
                <h1 className={`${baseClass}__header-title`}>{appName}</h1>
              </div>
              
              <div className={`${baseClass}__header-actions`}>
                {headerActions.map((action, index) => (
                  <React.Fragment key={index}>
                    {action}
                  </React.Fragment>
                ))}
                
                {onClose && (
                  <Button 
                    variant="ghost" 
                    size="small"
                    onClick={onClose}
                    className={`${baseClass}__close-button`}
                  >
                    ✕
                  </Button>
                )}
              </div>
            </header>
          )}
          
          <main className={`${baseClass}__content`}>
            {children}
          </main>
          
          {showFooter && (
            <footer className={`${baseClass}__footer`}>
              {footerActions.map((action, index) => (
                <React.Fragment key={index}>
                  {action}
                </React.Fragment>
              ))}
            </footer>
          )}
        </>
      )}
    </div>
  );
};

// Coming Soon Modal Component
export const ComingSoonModal = ({
  appName,
  appIcon,
  appDescription,
  onClose
}) => {
  return (
    <div className="kosmo-coming-soon-modal">
      <Card elevation={3} className="kosmo-coming-soon-modal__card">
        <CardHeader
          title={`${appName} - Coming Soon`}
          action={
            <Button 
              variant="ghost" 
              size="small"
              onClick={onClose}
            >
              ✕
            </Button>
          }
        />
        
        <CardContent className="kosmo-coming-soon-modal__content">
          <div className="kosmo-coming-soon-modal__icon">
            {appIcon || '🚀'}
          </div>
          
          <h2 className="kosmo-coming-soon-modal__title">
            {appName} is coming soon!
          </h2>
          
          <p className="kosmo-coming-soon-modal__description">
            {appDescription || `We're working hard to bring you ${appName}. Stay tuned for updates!`}
          </p>
        </CardContent>
        
        <CardFooter>
          <Button 
            variant="primary"
            onClick={onClose}
          >
            Got it
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AppTemplate;