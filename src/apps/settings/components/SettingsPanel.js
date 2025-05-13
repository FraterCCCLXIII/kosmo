/**
 * Settings Panel Component
 * 
 * A component for displaying settings categories and items.
 */

import React from 'react';
import { List, ListItem, ListDivider } from '../../../components/registry';
import './SettingsPanel.css';

/**
 * SettingsPanel component for displaying settings categories
 * 
 * @param {Object} props - Component props
 * @param {Array} props.items - Settings items
 * @param {Function} props.onItemClick - Item click handler
 * @param {string} props.className - Additional CSS class
 */
const SettingsPanel = ({
  items = [],
  onItemClick,
  className = '',
  ...props
}) => {
  const baseClass = 'kosmo-settings-panel';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <List variant="divided" className={`${baseClass}__list`}>
        {items.map((item, index) => (
          <React.Fragment key={item.id || index}>
            <ListItem
              primary={item.label}
              secondary={item.description}
              startIcon={item.icon}
              endIcon={item.value || '→'}
              onClick={() => onItemClick && onItemClick(item)}
              className={`${baseClass}__item`}
            />
            {index < items.length - 1 && <ListDivider />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

/**
 * SettingsGroup component for grouping related settings
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Group title
 * @param {string} props.description - Group description
 * @param {React.ReactNode} props.children - Group content
 * @param {string} props.className - Additional CSS class
 */
export const SettingsGroup = ({
  title,
  description,
  children,
  className = '',
  ...props
}) => {
  const baseClass = 'kosmo-settings-group';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {title && (
        <div className={`${baseClass}__header`}>
          <h3 className={`${baseClass}__title`}>{title}</h3>
          {description && (
            <p className={`${baseClass}__description`}>{description}</p>
          )}
        </div>
      )}
      <div className={`${baseClass}__content`}>
        {children}
      </div>
    </div>
  );
};

/**
 * SettingsItem component for individual settings
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Setting label
 * @param {string} props.description - Setting description
 * @param {React.ReactNode} props.icon - Setting icon
 * @param {React.ReactNode} props.control - Setting control (switch, select, etc.)
 * @param {string} props.className - Additional CSS class
 */
export const SettingsItem = ({
  label,
  description,
  icon,
  control,
  className = '',
  ...props
}) => {
  const baseClass = 'kosmo-settings-item';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className={`${baseClass}__content`}>
        {icon && (
          <div className={`${baseClass}__icon`}>
            {icon}
          </div>
        )}
        <div className={`${baseClass}__text`}>
          <div className={`${baseClass}__label`}>{label}</div>
          {description && (
            <div className={`${baseClass}__description`}>{description}</div>
          )}
        </div>
      </div>
      {control && (
        <div className={`${baseClass}__control`}>
          {control}
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;