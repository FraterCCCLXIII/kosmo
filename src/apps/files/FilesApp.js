/**
 * Files App
 * 
 * File manager application for browsing and managing files.
 */

import React, { useState } from 'react';
import { 
  AppLayout, 
  AppHeader, 
  AppContent, 
  AppSidebar,
  SearchField,
  List,
  ListItem
} from '../../components/registry';
import FileList from './components/FileList';
import './FilesApp.css';

// Mock file system data
const MOCK_FOLDERS = [
  { id: 'home', name: 'Home', path: '/home', type: 'folder' },
  { id: 'documents', name: 'Documents', path: '/documents', type: 'folder' },
  { id: 'pictures', name: 'Pictures', path: '/pictures', type: 'folder' },
  { id: 'music', name: 'Music', path: '/music', type: 'folder' },
  { id: 'videos', name: 'Videos', path: '/videos', type: 'folder' },
  { id: 'downloads', name: 'Downloads', path: '/downloads', type: 'folder' },
];

const MOCK_FILES = {
  '/home': [
    { id: 'doc1', name: 'Welcome.pdf', path: '/home/Welcome.pdf', type: 'file', size: 1024 * 1024, modified: '2025-05-01T10:30:00Z' },
    { id: 'doc2', name: 'Getting Started.docx', path: '/home/Getting Started.docx', type: 'file', size: 2048 * 1024, modified: '2025-05-02T14:45:00Z' },
    { id: 'folder1', name: 'Projects', path: '/home/Projects', type: 'folder', modified: '2025-05-03T09:15:00Z' },
  ],
  '/documents': [
    { id: 'doc3', name: 'Resume.pdf', path: '/documents/Resume.pdf', type: 'file', size: 512 * 1024, modified: '2025-04-15T11:20:00Z' },
    { id: 'doc4', name: 'Budget.xlsx', path: '/documents/Budget.xlsx', type: 'file', size: 1536 * 1024, modified: '2025-04-20T16:30:00Z' },
    { id: 'doc5', name: 'Presentation.pptx', path: '/documents/Presentation.pptx', type: 'file', size: 3072 * 1024, modified: '2025-04-25T13:10:00Z' },
    { id: 'folder2', name: 'Work', path: '/documents/Work', type: 'folder', modified: '2025-04-28T10:00:00Z' },
    { id: 'folder3', name: 'Personal', path: '/documents/Personal', type: 'folder', modified: '2025-04-29T14:20:00Z' },
  ],
  '/pictures': [
    { id: 'pic1', name: 'Vacation.jpg', path: '/pictures/Vacation.jpg', type: 'file', size: 4096 * 1024, modified: '2025-03-10T09:45:00Z' },
    { id: 'pic2', name: 'Family.png', path: '/pictures/Family.png', type: 'file', size: 3584 * 1024, modified: '2025-03-15T12:30:00Z' },
    { id: 'pic3', name: 'Nature.jpg', path: '/pictures/Nature.jpg', type: 'file', size: 5120 * 1024, modified: '2025-03-20T15:15:00Z' },
    { id: 'folder4', name: 'Events', path: '/pictures/Events', type: 'folder', modified: '2025-03-25T11:40:00Z' },
  ],
  '/music': [
    { id: 'music1', name: 'Favorite Song.mp3', path: '/music/Favorite Song.mp3', type: 'file', size: 8192 * 1024, modified: '2025-02-05T10:20:00Z' },
    { id: 'music2', name: 'New Album.mp3', path: '/music/New Album.mp3', type: 'file', size: 10240 * 1024, modified: '2025-02-10T14:10:00Z' },
    { id: 'folder5', name: 'Playlists', path: '/music/Playlists', type: 'folder', modified: '2025-02-15T09:30:00Z' },
  ],
  '/videos': [
    { id: 'video1', name: 'Movie.mp4', path: '/videos/Movie.mp4', type: 'file', size: 1024 * 1024 * 1024, modified: '2025-01-10T16:45:00Z' },
    { id: 'video2', name: 'Tutorial.mp4', path: '/videos/Tutorial.mp4', type: 'file', size: 512 * 1024 * 1024, modified: '2025-01-15T11:30:00Z' },
    { id: 'folder6', name: 'Recordings', path: '/videos/Recordings', type: 'folder', modified: '2025-01-20T13:15:00Z' },
  ],
  '/downloads': [
    { id: 'dl1', name: 'Software.zip', path: '/downloads/Software.zip', type: 'file', size: 256 * 1024 * 1024, modified: '2025-05-05T09:00:00Z' },
    { id: 'dl2', name: 'E-book.pdf', path: '/downloads/E-book.pdf', type: 'file', size: 16384 * 1024, modified: '2025-05-06T14:30:00Z' },
    { id: 'dl3', name: 'Music.zip', path: '/downloads/Music.zip', type: 'file', size: 128 * 1024 * 1024, modified: '2025-05-07T11:15:00Z' },
  ],
};

/**
 * Files App Component
 */
const FilesApp = () => {
  const [currentPath, setCurrentPath] = useState('/home');
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Get files for current path
  const getCurrentFiles = () => {
    return MOCK_FILES[currentPath] || [];
  };

  // Handle folder click
  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      setCurrentPath(item.path);
      setSelectedItems([]);
    } else {
      // In a real app, this would open the file
      console.log('Opening file:', item);
    }
  };

  // Handle sidebar folder click
  const handleSidebarFolderClick = (folder) => {
    setCurrentPath(folder.path);
    setSelectedItems([]);
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    // In a real app, this would filter files or perform a search
  };

  // Get path segments for breadcrumb
  const getPathSegments = () => {
    const segments = currentPath.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = '/' + segments.slice(0, index + 1).join('/');
      return { name: segment, path };
    });
  };

  // Navigate to parent folder
  const navigateToParent = () => {
    const segments = currentPath.split('/').filter(Boolean);
    if (segments.length > 1) {
      const parentPath = '/' + segments.slice(0, segments.length - 1).join('/');
      setCurrentPath(parentPath);
      setSelectedItems([]);
    }
  };

  return (
    <div className="files-app">
      <AppLayout
        header={
          <AppHeader
            title="Files"
            icon="📁"
            actions={
              <SearchField
                placeholder="Search files..."
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                className="files-app__search"
              />
            }
          />
        }
        sidebar={
          <div className="files-app__sidebar-content">
            <h3 className="files-app__sidebar-title">Locations</h3>
            <List className="files-app__folders">
              {MOCK_FOLDERS.map(folder => (
                <ListItem
                  key={folder.id}
                  primary={folder.name}
                  startIcon="📁"
                  selected={currentPath === folder.path}
                  onClick={() => handleSidebarFolderClick(folder)}
                />
              ))}
            </List>
          </div>
        }
      >
        <div className="files-app__content">
          {/* Breadcrumb navigation */}
          <div className="files-app__breadcrumb">
            <button 
              className="files-app__back-button"
              onClick={navigateToParent}
              disabled={currentPath === '/home'}
            >
              ←
            </button>
            
            <div className="files-app__path">
              <span 
                className="files-app__path-segment files-app__path-segment--root"
                onClick={() => setCurrentPath('/home')}
              >
                Home
              </span>
              
              {getPathSegments().slice(1).map((segment, index) => (
                <React.Fragment key={segment.path}>
                  <span className="files-app__path-separator">/</span>
                  <span 
                    className="files-app__path-segment"
                    onClick={() => setCurrentPath(segment.path)}
                  >
                    {segment.name}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {/* File list */}
          <div className="files-app__file-container">
            <FileList
              items={getCurrentFiles()}
              onItemClick={handleItemClick}
              selectedItems={selectedItems}
              className="files-app__file-list"
            />
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default FilesApp;