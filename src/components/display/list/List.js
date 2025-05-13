/**
 * List Component
 * 
 * A flexible list component for displaying collections of items.
 * Can be used for contacts, messages, files, settings, etc.
 */

import React from 'react';
import './List.css';

/**
 * List component for displaying collections of items
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - List items
 * @param {string} props.variant - Visual variant ('default', 'divided', 'card')
 * @param {boolean} props.dense - Whether to use compact spacing
 * @param {string} props.className - Additional CSS class
 */
const List = ({
  children,
  variant = 'default',
  dense = false,
  className = '',
  ...props
}) => {
  const baseClass = 'kosmo-list';
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    dense ? `${baseClass}--dense` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <ul className={classes} role="list" {...props}>
      {children}
    </ul>
  );
};

/**
 * ListItem component for individual items in a List
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Item content
 * @param {React.ReactNode} props.startIcon - Icon/element to display at start
 * @param {React.ReactNode} props.endIcon - Icon/element to display at end
 * @param {React.ReactNode} props.avatar - Avatar element
 * @param {string} props.primary - Primary text
 * @param {string} props.secondary - Secondary text
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.selected - Whether item is selected
 * @param {boolean} props.disabled - Whether item is disabled
 * @param {string} props.className - Additional CSS class
 */
export const ListItem = ({
  children,
  startIcon,
  endIcon,
  avatar,
  primary,
  secondary,
  onClick,
  selected = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseClass = 'kosmo-list-item';
  const classes = [
    baseClass,
    selected ? `${baseClass}--selected` : '',
    disabled ? `${baseClass}--disabled` : '',
    onClick ? `${baseClass}--clickable` : '',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  // If children are provided, render them directly
  if (children) {
    return (
      <li 
        className={classes}
        onClick={handleClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick && !disabled ? 0 : undefined}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </li>
    );
  }

  // Otherwise, construct the list item from props
  return (
    <li 
      className={classes}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-disabled={disabled}
      {...props}
    >
      {startIcon && (
        <div className={`${baseClass}__start-icon`}>
          {startIcon}
        </div>
      )}
      
      {avatar && (
        <div className={`${baseClass}__avatar`}>
          {avatar}
        </div>
      )}
      
      <div className={`${baseClass}__content`}>
        {primary && (
          <div className={`${baseClass}__primary`}>{primary}</div>
        )}
        {secondary && (
          <div className={`${baseClass}__secondary`}>{secondary}</div>
        )}
      </div>
      
      {endIcon && (
        <div className={`${baseClass}__end-icon`}>
          {endIcon}
        </div>
      )}
    </li>
  );
};

/**
 * ListDivider component for separating list items
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.inset - Whether to inset the divider
 * @param {string} props.className - Additional CSS class
 */
export const ListDivider = ({
  inset = false,
  className = '',
  ...props
}) => {
  const baseClass = 'kosmo-list-divider';
  const classes = [
    baseClass,
    inset ? `${baseClass}--inset` : '',
    className
  ].filter(Boolean).join(' ');

  return <li className={classes} role="separator" {...props} />;
};

/**
 * ListSubheader component for section headers in lists
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Subheader content
 * @param {boolean} props.sticky - Whether the subheader should stick to the top
 * @param {string} props.className - Additional CSS class
 */
export const ListSubheader = ({
  children,
  sticky = false,
  className = '',
  ...props
}) => {
  const baseClass = 'kosmo-list-subheader';
  const classes = [
    baseClass,
    sticky ? `${baseClass}--sticky` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <li className={classes} {...props}>
      {children}
    </li>
  );
};

export default List;