/**
 * Kosmo OS UI Kit - Card Component
 * 
 * A versatile card component for displaying content in a contained area.
 */

import React from 'react';
import './Card.css';

export const Card = ({
  children,
  variant = 'default',
  elevation = 2,
  padding = 'medium',
  className = '',
  onClick,
  ...props
}) => {
  const baseClass = 'kosmo-card';
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    `${baseClass}--elevation-${elevation}`,
    `${baseClass}--padding-${padding}`,
    onClick ? `${baseClass}--clickable` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={classes} 
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Header Component
export const CardHeader = ({ 
  children, 
  title, 
  subtitle, 
  icon, 
  action,
  className = '',
  ...props 
}) => {
  const baseClass = 'kosmo-card__header';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {icon && <div className={`${baseClass}-icon`}>{icon}</div>}
      
      {(title || subtitle) && (
        <div className={`${baseClass}-content`}>
          {title && <h3 className={`${baseClass}-title`}>{title}</h3>}
          {subtitle && <div className={`${baseClass}-subtitle`}>{subtitle}</div>}
        </div>
      )}
      
      {children}
      
      {action && <div className={`${baseClass}-action`}>{action}</div>}
    </div>
  );
};

// Card Content Component
export const CardContent = ({ 
  children,
  className = '',
  ...props 
}) => {
  const baseClass = 'kosmo-card__content';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Card Footer Component
export const CardFooter = ({ 
  children,
  className = '',
  ...props 
}) => {
  const baseClass = 'kosmo-card__footer';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Card Media Component
export const CardMedia = ({ 
  src, 
  alt = '',
  height,
  position = 'top',
  className = '',
  ...props 
}) => {
  const baseClass = 'kosmo-card__media';
  const classes = [
    baseClass, 
    `${baseClass}--${position}`,
    className
  ].filter(Boolean).join(' ');

  const style = height ? { height } : {};

  return (
    <div className={classes} style={style} {...props}>
      <img src={src} alt={alt} className={`${baseClass}-img`} />
    </div>
  );
};

export default Card;