/**
 * Kosmo OS UI Kit - TextField Component
 * 
 * A versatile text input component with multiple variants and states.
 */

import React, { forwardRef } from 'react';
import './TextField.css';

export const TextField = forwardRef(({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  readOnly = false,
  required = false,
  error,
  helperText,
  prefix,
  suffix,
  variant = 'outlined',
  size = 'medium',
  fullWidth = false,
  multiline = false,
  rows = 3,
  maxLength,
  className = '',
  ...props
}, ref) => {
  const baseClass = 'kosmo-textfield';
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    `${baseClass}--${size}`,
    disabled ? `${baseClass}--disabled` : '',
    readOnly ? `${baseClass}--readonly` : '',
    error ? `${baseClass}--error` : '',
    fullWidth ? `${baseClass}--full-width` : '',
    multiline ? `${baseClass}--multiline` : '',
    className
  ].filter(Boolean).join(' ');

  const inputProps = {
    id,
    name,
    type,
    value,
    defaultValue,
    disabled,
    readOnly,
    required,
    placeholder,
    maxLength,
    onChange,
    onFocus,
    onBlur,
    ref,
    className: `${baseClass}__input`,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': helperText ? `${id}-helper-text` : undefined,
    ...props
  };

  return (
    <div className={classes}>
      {label && (
        <label 
          htmlFor={id} 
          className={`${baseClass}__label`}
        >
          {label}
          {required && <span className={`${baseClass}__required`}>*</span>}
        </label>
      )}
      
      <div className={`${baseClass}__input-container`}>
        {prefix && (
          <div className={`${baseClass}__prefix`}>
            {prefix}
          </div>
        )}
        
        {multiline ? (
          <textarea 
            {...inputProps} 
            rows={rows}
          />
        ) : (
          <input {...inputProps} />
        )}
        
        {suffix && (
          <div className={`${baseClass}__suffix`}>
            {suffix}
          </div>
        )}
      </div>
      
      {(helperText || error) && (
        <div 
          id={`${id}-helper-text`}
          className={`${baseClass}__helper-text ${error ? `${baseClass}__helper-text--error` : ''}`}
        >
          {error || helperText}
        </div>
      )}
    </div>
  );
});

TextField.displayName = 'TextField';

export default TextField;