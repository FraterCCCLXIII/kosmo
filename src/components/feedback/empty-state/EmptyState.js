/**
 * EmptyState Component
 * 
 * A component for displaying empty states in lists, grids, or content areas.
 * Provides visual feedback and optional actions when no content is available.
 */

import React from 'react';
import './EmptyState.css';

/**
 * EmptyState component for empty content areas
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.icon - Icon to display
 * @param {string} props.title - Title text
 * @param {string} props.message - Message text
 * @param {React.ReactNode} props.action - Action button or link
 * @param {string} props.size - Size variant ('small', 'medium', 'large')
 * @param {string} props.className - Additional CSS class
 */
const EmptyState = ({
  icon,
  title,
  message,
  action,
  size = 'medium',
  className = '',
  ...props
}) => {
  const baseClass = 'kosmo-empty-state';
  const classes = [
    baseClass,
    `${baseClass}--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {icon && (
        <div className={`${baseClass}__icon`}>
          {icon}
        </div>
      )}
      
      {title && (
        <h3 className={`${baseClass}__title`}>
          {title}
        </h3>
      )}
      
      {message && (
        <p className={`${baseClass}__message`}>
          {message}
        </p>
      )}
      
      {action && (
        <div className={`${baseClass}__action`}>
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;