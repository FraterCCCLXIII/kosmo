/**
 * Kosmo OS UI Kit - Color Tokens
 * 
 * This file defines the color palette for the entire UI system.
 * All colors should be referenced from here to maintain consistency.
 */

export const colors = {
  // Brand colors
  brand: {
    primary: '#3366FF',
    secondary: '#6C63FF',
    tertiary: '#5E35B1',
    accent: '#00BFA5',
  },
  
  // Neutral colors
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
  },
  
  // Semantic colors
  semantic: {
    success: '#10B981',
    warning: '#FBBF24',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // App category colors
  category: {
    coreSystem: '#3366FF',
    mediaCreative: '#8B5CF6',
    productivityOffice: '#10B981',
    connectivityCommunication: '#F59E0B',
    financeUtilities: '#EC4899',
    gaming: '#6366F1',
    lifestyleInfo: '#14B8A6',
  },
  
  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #3366FF 0%, #6C63FF 100%)',
    accent: 'linear-gradient(135deg, #00BFA5 0%, #00B8D4 100%)',
    success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    warning: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
    error: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
  },
  
  // Dark mode adjustments
  dark: {
    background: '#121212',
    surface: '#1E1E1E',
    primary: '#5E81FF',
    secondary: '#8C85FF',
  }
};

export default colors;