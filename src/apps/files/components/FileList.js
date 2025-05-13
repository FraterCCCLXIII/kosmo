/**
 * FileList Component
 * 
 * A component for displaying files and folders in a list view.
 */

import React from 'react';
import { List, ListItem, ListDivider, EmptyState } from '../../../components/registry';
import './FileList.css';

/**
 * FileList component for displaying files and folders
 * 
 * @param {Object} props - Component props
 * @param {Array} props.items - Files and folders to display
 * @param {Function} props.onItemClick - Item click handler
 * @param {Function} props.onItemContextMenu - Item context menu handler
 * @param {Array} props.selectedItems - Selected items
 * @param {string} props.className - Additional CSS class
 */
const FileList = ({
  items = [],
  onItemClick,
  onItemContextMenu,
  selectedItems = [],
  className = '',
  ...props
}) => {
  const baseClass = 'kosmo-file-list';
  const classes = [baseClass, className].filter(Boolean).join(' ');

  // Handle item click
  const handleItemClick = (item, event) => {
    if (onItemClick) {
      onItemClick(item, event);
    }
  };

  // Handle item context menu
  const handleItemContextMenu = (item, event) => {
    event.preventDefault();
    if (onItemContextMenu) {
      onItemContextMenu(item, event);
    }
  };

  // Get icon for file type
  const getFileIcon = (item) => {
    if (item.type === 'folder') {
      return '📁';
    }
    
    // Based on file extension
    const extension = item.name.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️';
      case 'mp3':
      case 'wav':
      case 'ogg':
        return '🎵';
      case 'mp4':
      case 'mov':
      case 'avi':
        return '🎬';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'ppt':
      case 'pptx':
        return '📊';
      case 'zip':
      case 'rar':
      case 'tar':
      case 'gz':
        return '🗜️';
      default:
        return '📄';
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // If no items, show empty state
  if (items.length === 0) {
    return (
      <div className={classes} {...props}>
        <EmptyState
          icon="📁"
          title="No Files"
          message="This folder is empty"
          size="medium"
        />
      </div>
    );
  }

  return (
    <div className={classes} {...props}>
      <List variant="default" className={`${baseClass}__list`}>
        {items.map((item, index) => {
          const isSelected = selectedItems.some(selectedItem => 
            selectedItem.id === item.id || selectedItem.path === item.path
          );
          
          return (
            <ListItem
              key={item.id || item.path || index}
              primary={item.name}
              secondary={item.type !== 'folder' ? `${formatFileSize(item.size)} • ${formatDate(item.modified)}` : null}
              startIcon={getFileIcon(item)}
              onClick={(e) => handleItemClick(item, e)}
              onContextMenu={(e) => handleItemContextMenu(item, e)}
              selected={isSelected}
              className={`${baseClass}__item ${item.type === 'folder' ? `${baseClass}__item--folder` : ''}`}
            />
          );
        })}
      </List>
    </div>
  );
};

export default FileList;