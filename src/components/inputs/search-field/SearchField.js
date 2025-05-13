/**
 * SearchField Component
 * 
 * A search input component with optional autocomplete functionality.
 * Can be used for searching contacts, files, apps, etc.
 */

import React, { useState, useRef, useEffect } from 'react';
import './SearchField.css';

/**
 * SearchField component for search inputs
 * 
 * @param {Object} props - Component props
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {Function} props.onSearch - Search handler
 * @param {string} props.placeholder - Input placeholder
 * @param {Array} props.suggestions - Autocomplete suggestions
 * @param {Function} props.onSuggestionSelect - Suggestion selection handler
 * @param {boolean} props.loading - Whether search is loading
 * @param {boolean} props.autoFocus - Whether to autofocus the input
 * @param {string} props.className - Additional CSS class
 */
const SearchField = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search...',
  suggestions = [],
  onSuggestionSelect,
  loading = false,
  autoFocus = false,
  className = '',
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedSuggestion, setFocusedSuggestion] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Update internal state when value prop changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Handle input change
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
    
    // Show suggestions if there are any and input has value
    setShowSuggestions(newValue.length > 0 && suggestions.length > 0);
    setFocusedSuggestion(-1);
  };

  // Handle input focus
  const handleFocus = () => {
    if (inputValue.length > 0 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Handle input blur
  const handleBlur = (e) => {
    // Delay hiding suggestions to allow for suggestion clicks
    setTimeout(() => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(document.activeElement)) {
        setShowSuggestions(false);
      }
    }, 200);
  };

  // Handle key down events
  const handleKeyDown = (e) => {
    // Enter key
    if (e.key === 'Enter') {
      if (focusedSuggestion >= 0 && focusedSuggestion < suggestions.length) {
        // Select the focused suggestion
        handleSuggestionSelect(suggestions[focusedSuggestion]);
      } else if (onSearch) {
        // Perform search
        onSearch(inputValue);
      }
      setShowSuggestions(false);
    }
    // Escape key
    else if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current.blur();
    }
    // Arrow down
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (showSuggestions) {
        setFocusedSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else if (suggestions.length > 0) {
        setShowSuggestions(true);
      }
    }
    // Arrow up
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (showSuggestions) {
        setFocusedSuggestion(prev => 
          prev > 0 ? prev - 1 : -1
        );
      }
    }
  };

  // Handle suggestion click
  const handleSuggestionSelect = (suggestion) => {
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    } else {
      setInputValue(typeof suggestion === 'string' ? suggestion : suggestion.label || '');
      if (onChange) {
        onChange(typeof suggestion === 'string' ? suggestion : suggestion.label || '');
      }
    }
    setShowSuggestions(false);
    inputRef.current.focus();
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
    setShowSuggestions(false);
  };

  // Handle clear button click
  const handleClearClick = () => {
    setInputValue('');
    if (onChange) {
      onChange('');
    }
    setShowSuggestions(false);
    inputRef.current.focus();
  };

  const baseClass = 'kosmo-search-field';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className={`${baseClass}__input-container`}>
        <span className={`${baseClass}__search-icon`}>🔍</span>
        
        <input
          ref={inputRef}
          type="text"
          className={`${baseClass}__input`}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          {...props}
        />
        
        {loading && (
          <span className={`${baseClass}__loading-indicator`}></span>
        )}
        
        {inputValue && (
          <button
            type="button"
            className={`${baseClass}__clear-button`}
            onClick={handleClearClick}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        
        <button
          type="button"
          className={`${baseClass}__search-button`}
          onClick={handleSearchClick}
          aria-label="Search"
        >
          Search
        </button>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <ul 
          ref={suggestionsRef}
          className={`${baseClass}__suggestions`}
          role="listbox"
        >
          {suggestions.map((suggestion, index) => {
            const suggestionText = typeof suggestion === 'string' 
              ? suggestion 
              : suggestion.label || '';
              
            return (
              <li
                key={index}
                className={`${baseClass}__suggestion ${focusedSuggestion === index ? `${baseClass}__suggestion--focused` : ''}`}
                onClick={() => handleSuggestionSelect(suggestion)}
                onMouseEnter={() => setFocusedSuggestion(index)}
                role="option"
                aria-selected={focusedSuggestion === index}
              >
                {typeof suggestion === 'object' && suggestion.icon && (
                  <span className={`${baseClass}__suggestion-icon`}>
                    {suggestion.icon}
                  </span>
                )}
                <span className={`${baseClass}__suggestion-text`}>
                  {suggestionText}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchField;