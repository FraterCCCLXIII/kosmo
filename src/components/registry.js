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
// These will be implemented as needed

// Navigation Components
// These will be implemented as needed

// Display Components
// These will be implemented as needed

// Feedback Components
// These will be implemented as needed

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
  
  // Navigation Components
  
  // Display Components
  
  // Feedback Components
};

// Default export for convenience
const KosmoComponents = {
  ThemeProvider,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardMedia,
  TextField,
};

export default KosmoComponents;