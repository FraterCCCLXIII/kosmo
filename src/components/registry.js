/**
 * Kosmo OS UI Kit - Component Registry
 * 
 * This file serves as a central registry for all UI components.
 * It allows for easy importing of components across the application.
 */

// Core Components
import ThemeProvider, { useTheme } from './core/ThemeProvider';
import Button from './core/Button';
import Card, { CardHeader, CardContent, CardFooter, CardMedia } from './core/Card';
import TextField from './core/TextField';

// Layout Components
import AppLayout, { AppHeader, AppContent, AppFooter, AppSidebar } from './layout/app-layout/AppLayout';

// Navigation Components
import Tabs, { TabPanel } from './navigation/tabs/Tabs';

// Display Components
import List, { ListItem, ListDivider, ListSubheader } from './display/list/List';
import Calendar from './display/calendar/Calendar';

// Input Components
import SearchField from './inputs/search-field/SearchField';

// Feedback Components
import EmptyState from './feedback/empty-state/EmptyState';

// Export all components
export {
  // Core Components
  ThemeProvider,
  useTheme,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardMedia,
  TextField,
  
  // Layout Components
  AppLayout,
  AppHeader,
  AppContent,
  AppFooter,
  AppSidebar,
  
  // Navigation Components
  Tabs,
  TabPanel,
  
  // Display Components
  List,
  ListItem,
  ListDivider,
  ListSubheader,
  Calendar,
  
  // Input Components
  SearchField,
  
  // Feedback Components
  EmptyState,
};

// Default export for convenience
const KosmoComponents = {
  // Core Components
  ThemeProvider,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardMedia,
  TextField,
  
  // Layout Components
  AppLayout,
  AppHeader,
  AppContent,
  AppFooter,
  AppSidebar,
  
  // Navigation Components
  Tabs,
  TabPanel,
  
  // Display Components
  List,
  ListItem,
  ListDivider,
  ListSubheader,
  Calendar,
  
  // Input Components
  SearchField,
  
  // Feedback Components
  EmptyState,
};

export default KosmoComponents;