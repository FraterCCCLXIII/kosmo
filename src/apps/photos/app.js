/**
 * Photos App
 * A simple photo viewer and organizer
 */

import { getWindowManager } from '../../ui/WindowManager.js';

// Define icon SVG paths
const ICONS = {
  photos: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" /></svg>',
  import: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" /></svg>',
  albums: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" /></svg>',
  share: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clip-rule="evenodd" /></svg>',
  edit: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" /><path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" /></svg>'
};

/**
 * Launch the photos app
 * @returns {Promise<Object>} Window instance
 */
export async function launch() {
  console.log('Launching photos app...');
  
  // Create window
  const windowManager = await getWindowManager();
  
  // Create window
  const window = windowManager.createWindow({
    title: 'Photos',
    width: 900,
    height: 700,
    minWidth: 400,
    minHeight: 300,
    resizable: true,
    maximizable: true,
    minimizable: true,
    closable: true,
  });
  
  // Create photos UI
  createPhotosUI(window.content);
  
  // Return window instance
  return window;
}
}

/**
 * Create photos UI
 * @param {HTMLElement} containerEl - Container element
 */
function createPhotosUI(containerEl) {
  // Create toolbar
  const toolbarEl = document.createElement('div');
  toolbarEl.className = 'photos-toolbar';
  toolbarEl.style.display = 'flex';
  toolbarEl.style.alignItems = 'center';
  toolbarEl.style.padding = 'var(--spacing-sm) var(--spacing-md)';
  toolbarEl.style.borderBottom = 'var(--border-width) solid var(--border-color)';
  toolbarEl.style.backgroundColor = 'var(--color-bg-secondary)';
  
  // Add toolbar buttons
  const importButton = createToolbarButton('Import', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
    <path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
  </svg>`);
  
  const albumsButton = createToolbarButton('Albums', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
    <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
  </svg>`);
  
  const shareButton = createToolbarButton('Share', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
    <path fill-rule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clip-rule="evenodd" />
  </svg>`);
  
  const editButton = createToolbarButton('Edit', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
  </svg>`);
  
  toolbarEl.appendChild(importButton);
  toolbarEl.appendChild(albumsButton);
  toolbarEl.appendChild(shareButton);
  toolbarEl.appendChild(editButton);
  
  // Add search input
  const searchContainer = document.createElement('div');
  searchContainer.style.flex = '1';
  searchContainer.style.display = 'flex';
  searchContainer.style.justifyContent = 'flex-end';
  searchContainer.style.marginLeft = 'var(--spacing-md)';
  
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search photos...';
  searchInput.style.padding = 'var(--spacing-xs) var(--spacing-sm)';
  searchInput.style.border = 'var(--border-width) solid var(--border-color)';
  searchInput.style.borderRadius = 'var(--border-radius-md)';
  searchInput.style.width = '200px';
  
  searchContainer.appendChild(searchInput);
  toolbarEl.appendChild(searchContainer);
  
  containerEl.appendChild(toolbarEl);
  
  // Create sidebar and content container
  const mainContainer = document.createElement('div');
  mainContainer.className = 'photos-main-container';
  mainContainer.style.display = 'flex';
  mainContainer.style.flex = '1';
  mainContainer.style.overflow = 'hidden';
  
  // Create sidebar
  const sidebarEl = document.createElement('div');
  sidebarEl.className = 'photos-sidebar';
  sidebarEl.style.width = '180px';
  sidebarEl.style.borderRight = 'var(--border-width) solid var(--border-color)';
  sidebarEl.style.backgroundColor = 'var(--color-bg-secondary)';
  sidebarEl.style.padding = 'var(--spacing-md)';
  sidebarEl.style.overflowY = 'auto';
  
  // Add sidebar sections
  const sections = [
    { name: 'Library', items: ['All Photos', 'Favorites', 'Recently Added', 'People'] },
    { name: 'Albums', items: ['Vacation', 'Family', 'Nature', 'Work'] },
    { name: 'Media Types', items: ['Videos', 'Selfies', 'Panoramas', 'Screenshots'] }
  ];
  
  sections.forEach(section => {
    const sectionTitle = document.createElement('h3');
    sectionTitle.textContent = section.name;
    sectionTitle.style.fontSize = 'var(--font-size-sm)';
    sectionTitle.style.fontWeight = 'var(--font-weight-medium)';
    sectionTitle.style.textTransform = 'uppercase';
    sectionTitle.style.color = 'var(--color-text-secondary)';
    sectionTitle.style.marginBottom = 'var(--spacing-sm)';
    sectionTitle.style.marginTop = 'var(--spacing-md)';
    sidebarEl.appendChild(sectionTitle);
    
    const sectionList = document.createElement('ul');
    sectionList.style.listStyle = 'none';
    sectionList.style.padding = '0';
    sectionList.style.margin = '0 0 var(--spacing-md) 0';
    
    section.items.forEach(item => {
      const listItem = document.createElement('li');
      listItem.style.marginBottom = 'var(--spacing-xs)';
      
      const itemLink = document.createElement('a');
      itemLink.href = '#';
      itemLink.textContent = item;
      itemLink.style.display = 'block';
      itemLink.style.padding = 'var(--spacing-xs) var(--spacing-sm)';
      itemLink.style.borderRadius = 'var(--border-radius-sm)';
      itemLink.style.textDecoration = 'none';
      itemLink.style.color = 'var(--color-text-primary)';
      
      // Add hover effect
      itemLink.addEventListener('mouseenter', () => {
        itemLink.style.backgroundColor = 'var(--color-bg-tertiary)';
      });
      
      itemLink.addEventListener('mouseleave', () => {
        itemLink.style.backgroundColor = 'transparent';
      });
      
      // Add click handler
      itemLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Highlight selected item
        document.querySelectorAll('.photos-sidebar a').forEach(link => {
          link.style.backgroundColor = 'transparent';
          link.style.fontWeight = 'normal';
        });
        itemLink.style.backgroundColor = 'var(--color-bg-tertiary)';
        itemLink.style.fontWeight = 'var(--font-weight-medium)';
      });
      
      listItem.appendChild(itemLink);
      sectionList.appendChild(listItem);
    });
    
    sidebarEl.appendChild(sectionList);
  });
  
  mainContainer.appendChild(sidebarEl);
  
  // Create content area
  const contentAreaEl = document.createElement('div');
  contentAreaEl.className = 'photos-content';
  contentAreaEl.style.flex = '1';
  contentAreaEl.style.padding = 'var(--spacing-md)';
  contentAreaEl.style.overflowY = 'auto';
  contentAreaEl.style.backgroundColor = 'var(--color-bg-primary)';
  
  // Create photo grid
  const photoGridEl = document.createElement('div');
  photoGridEl.className = 'photos-grid';
  photoGridEl.style.display = 'grid';
  photoGridEl.style.gridTemplateColumns = 'repeat(auto-fill, minmax(160px, 1fr))';
  photoGridEl.style.gap = 'var(--spacing-md)';
  
  // Add sample photos
  const samplePhotos = [
    { id: 1, color: '#4F46E5', name: 'Mountain View' },
    { id: 2, color: '#10B981', name: 'Beach Sunset' },
    { id: 3, color: '#F59E0B', name: 'City Skyline' },
    { id: 4, color: '#EC4899', name: 'Forest Trail' },
    { id: 5, color: '#8B5CF6', name: 'Desert Landscape' },
    { id: 6, color: '#EF4444', name: 'Lake Reflection' },
    { id: 7, color: '#3B82F6', name: 'Snowy Mountains' },
    { id: 8, color: '#14B8A6', name: 'Tropical Island' },
    { id: 9, color: '#F97316', name: 'Autumn Leaves' },
    { id: 10, color: '#6366F1', name: 'Waterfall' },
    { id: 11, color: '#84CC16', name: 'Northern Lights' },
    { id: 12, color: '#A855F7', name: 'Starry Night' }
  ];
  
  samplePhotos.forEach(photo => {
    const photoEl = document.createElement('div');
    photoEl.className = 'photo-item';
    photoEl.style.borderRadius = 'var(--border-radius-md)';
    photoEl.style.overflow = 'hidden';
    photoEl.style.cursor = 'pointer';
    photoEl.style.position = 'relative';
    photoEl.style.aspectRatio = '1 / 1';
    
    // Create photo placeholder
    const photoPlaceholder = document.createElement('div');
    photoPlaceholder.style.backgroundColor = photo.color;
    photoPlaceholder.style.width = '100%';
    photoPlaceholder.style.height = '100%';
    photoPlaceholder.style.display = 'flex';
    photoPlaceholder.style.alignItems = 'center';
    photoPlaceholder.style.justifyContent = 'center';
    
    // Add photo icon
    photoPlaceholder.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style="width: 40px; height: 40px; opacity: 0.7;">
      <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
    </svg>`;
    
    photoEl.appendChild(photoPlaceholder);
    
    // Add photo name
    const photoNameEl = document.createElement('div');
    photoNameEl.className = 'photo-name';
    photoNameEl.textContent = photo.name;
    photoNameEl.style.position = 'absolute';
    photoNameEl.style.bottom = '0';
    photoNameEl.style.left = '0';
    photoNameEl.style.right = '0';
    photoNameEl.style.padding = 'var(--spacing-xs) var(--spacing-sm)';
    photoNameEl.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    photoNameEl.style.color = 'white';
    photoNameEl.style.fontSize = 'var(--font-size-sm)';
    photoNameEl.style.whiteSpace = 'nowrap';
    photoNameEl.style.overflow = 'hidden';
    photoNameEl.style.textOverflow = 'ellipsis';
    
    photoEl.appendChild(photoNameEl);
    
    // Add click handler
    photoEl.addEventListener('click', () => {
      openPhotoViewer(photo);
    });
    
    photoGridEl.appendChild(photoEl);
  });
  
  contentAreaEl.appendChild(photoGridEl);
  mainContainer.appendChild(contentAreaEl);
  
  containerEl.appendChild(mainContainer);
  
  /**
   * Open photo viewer
   * @param {Object} photo - Photo object
   */
  function openPhotoViewer(photo) {
    // Create photo viewer overlay
    const overlayEl = document.createElement('div');
    overlayEl.className = 'photo-viewer-overlay';
    overlayEl.style.position = 'absolute';
    overlayEl.style.top = '0';
    overlayEl.style.left = '0';
    overlayEl.style.right = '0';
    overlayEl.style.bottom = '0';
    overlayEl.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    overlayEl.style.display = 'flex';
    overlayEl.style.flexDirection = 'column';
    overlayEl.style.zIndex = '1000';
    
    // Create viewer header
    const headerEl = document.createElement('div');
    headerEl.className = 'photo-viewer-header';
    headerEl.style.display = 'flex';
    headerEl.style.alignItems = 'center';
    headerEl.style.justifyContent = 'space-between';
    headerEl.style.padding = 'var(--spacing-md)';
    
    // Add photo name
    const nameEl = document.createElement('div');
    nameEl.textContent = photo.name;
    nameEl.style.color = 'white';
    nameEl.style.fontSize = 'var(--font-size-lg)';
    headerEl.appendChild(nameEl);
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style="width: 24px; height: 24px;">
      <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
    </svg>`;
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.style.padding = 'var(--spacing-sm)';
    closeButton.style.borderRadius = 'var(--border-radius-full)';
    
    // Add hover effect
    closeButton.addEventListener('mouseenter', () => {
      closeButton.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
    
    closeButton.addEventListener('mouseleave', () => {
      closeButton.style.backgroundColor = 'transparent';
    });
    
    // Add click handler
    closeButton.addEventListener('click', () => {
      containerEl.removeChild(overlayEl);
    });
    
    headerEl.appendChild(closeButton);
    overlayEl.appendChild(headerEl);
    
    // Create photo container
    const photoContainerEl = document.createElement('div');
    photoContainerEl.className = 'photo-viewer-container';
    photoContainerEl.style.flex = '1';
    photoContainerEl.style.display = 'flex';
    photoContainerEl.style.alignItems = 'center';
    photoContainerEl.style.justifyContent = 'center';
    photoContainerEl.style.padding = 'var(--spacing-md)';
    
    // Create photo element
    const photoEl = document.createElement('div');
    photoEl.style.backgroundColor = photo.color;
    photoEl.style.width = '80%';
    photoEl.style.height = '80%';
    photoEl.style.display = 'flex';
    photoEl.style.alignItems = 'center';
    photoEl.style.justifyContent = 'center';
    photoEl.style.borderRadius = 'var(--border-radius-md)';
    
    // Add photo icon
    photoEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style="width: 80px; height: 80px; opacity: 0.7;">
      <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
    </svg>`;
    
    photoContainerEl.appendChild(photoEl);
    overlayEl.appendChild(photoContainerEl);
    
    // Create footer
    const footerEl = document.createElement('div');
    footerEl.className = 'photo-viewer-footer';
    footerEl.style.display = 'flex';
    footerEl.style.alignItems = 'center';
    footerEl.style.justifyContent = 'center';
    footerEl.style.padding = 'var(--spacing-md)';
    footerEl.style.gap = 'var(--spacing-md)';
    
    // Add navigation buttons
    const prevButton = createViewerButton('Previous', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style="width: 24px; height: 24px;">
      <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
    </svg>`);
    
    const nextButton = createViewerButton('Next', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style="width: 24px; height: 24px;">
      <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
    </svg>`);
    
    footerEl.appendChild(prevButton);
    footerEl.appendChild(nextButton);
    
    overlayEl.appendChild(footerEl);
    
    // Add overlay to container
    containerEl.appendChild(overlayEl);
  }
}

/**
 * Create a toolbar button
 * @param {string} label - Button label
 * @param {string} icon - Button icon SVG
 * @returns {HTMLElement} Button element
 */
function createToolbarButton(label, icon) {
  const button = document.createElement('button');
  button.className = 'photos-toolbar-button';
  button.setAttribute('aria-label', label);
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.width = '32px';
  button.style.height = '32px';
  button.style.borderRadius = 'var(--border-radius-md)';
  button.style.border = 'none';
  button.style.backgroundColor = 'transparent';
  button.style.cursor = 'pointer';
  button.style.color = 'var(--color-text-primary)';
  button.style.marginRight = 'var(--spacing-sm)';
  
  // Add hover effect
  button.addEventListener('mouseenter', () => {
    button.style.backgroundColor = 'var(--color-bg-tertiary)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.backgroundColor = 'transparent';
  });
  
  // Add icon
  button.innerHTML = icon;
  
  return button;
}

/**
 * Create a viewer button
 * @param {string} label - Button label
 * @param {string} icon - Button icon SVG
 * @returns {HTMLElement} Button element
 */
function createViewerButton(label, icon) {
  const button = document.createElement('button');
  button.className = 'photo-viewer-button';
  button.setAttribute('aria-label', label);
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.width = '40px';
  button.style.height = '40px';
  button.style.borderRadius = 'var(--border-radius-full)';
  button.style.border = 'none';
  button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  button.style.cursor = 'pointer';
  
  // Add hover effect
  button.addEventListener('mouseenter', () => {
    button.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  });
  
  // Add icon
  button.innerHTML = icon;
  
  return button;
}