/**
 * Kosmo OS UI Kit - Button Component
 * 
 * A versatile button component with multiple variants and states.
 */

import React from 'react';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClass = 'kosmo-button';
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    `${baseClass}--${size}`,
    fullWidth ? `${baseClass}--full-width` : '',
    disabled ? `${baseClass}--disabled` : '',
    loading ? `${baseClass}--loading` : '',
    icon && !children ? `${baseClass}--icon-only` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span className={`${baseClass}__loader`}>
          <span className={`${baseClass}__loader-dot`}></span>
          <span className={`${baseClass}__loader-dot`}></span>
          <span className={`${baseClass}__loader-dot`}></span>
        </span>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className={`${baseClass}__icon ${baseClass}__icon--left`}>
          {icon}
        </span>
      )}
      
      {children && (
        <span className={`${baseClass}__text`}>{children}</span>
      )}
      
      {icon && iconPosition === 'right' && !loading && (
        <span className={`${baseClass}__icon ${baseClass}__icon--right`}>
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;