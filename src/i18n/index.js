/**
 * Internationalization
 * Language manager and string fetcher
 */

// Current language
let currentLanguage = 'en';

// Loaded translations
const translations = {};

/**
 * Initialize the i18n system
 * @param {string} language - Initial language
 * @returns {Object} i18n API
 */
export async function initI18n(language = 'en') {
  console.log(`Initializing i18n with language: ${language}`);
  
  // Set current language
  currentLanguage = language;
  
  // Load translations for current language
  await loadTranslations(language);
  
  // Return public API
  return {
    t: translate,
    setLanguage,
    getLanguage,
    getAvailableLanguages,
  };
}

/**
 * Load translations for a language
 * @param {string} language - Language code
 * @returns {Promise<Object>} Translations
 */
async function loadTranslations(language) {
  try {
    // Check if translations are already loaded
    if (translations[language]) {
      return translations[language];
    }
    
    // In a real implementation, this would load translations from a file
    // For now, we'll use hardcoded translations
    
    if (language === 'en') {
      translations.en = {
        app: {
          name: 'AI-First OS',
          loading: 'Loading OS environment...',
          error: 'Failed to start OS',
          retry: 'Retry',
        },
        common: {
          ok: 'OK',
          cancel: 'Cancel',
          save: 'Save',
          delete: 'Delete',
          edit: 'Edit',
          create: 'Create',
          search: 'Search',
          loading: 'Loading...',
          error: 'Error',
          success: 'Success',
          warning: 'Warning',
          info: 'Information',
        },
        window: {
          minimize: 'Minimize',
          maximize: 'Maximize',
          restore: 'Restore',
          close: 'Close',
        },
        file: {
          new: 'New',
          open: 'Open',
          save: 'Save',
          saveAs: 'Save As',
          import: 'Import',
          export: 'Export',
          rename: 'Rename',
          delete: 'Delete',
          properties: 'Properties',
        },
        ai: {
          assistant: 'AI Assistant',
          placeholder: 'Ask me anything...',
          thinking: 'Thinking...',
          error: 'Sorry, I encountered an error. Please try again.',
          welcome: 'Hello! I\'m your AI assistant. How can I help you today?',
        },
      };
    } else if (language === 'es') {
      translations.es = {
        app: {
          name: 'Sistema Operativo con IA',
          loading: 'Cargando entorno del SO...',
          error: 'Error al iniciar el SO',
          retry: 'Reintentar',
        },
        common: {
          ok: 'Aceptar',
          cancel: 'Cancelar',
          save: 'Guardar',
          delete: 'Eliminar',
          edit: 'Editar',
          create: 'Crear',
          search: 'Buscar',
          loading: 'Cargando...',
          error: 'Error',
          success: 'Éxito',
          warning: 'Advertencia',
          info: 'Información',
        },
        window: {
          minimize: 'Minimizar',
          maximize: 'Maximizar',
          restore: 'Restaurar',
          close: 'Cerrar',
        },
        file: {
          new: 'Nuevo',
          open: 'Abrir',
          save: 'Guardar',
          saveAs: 'Guardar como',
          import: 'Importar',
          export: 'Exportar',
          rename: 'Renombrar',
          delete: 'Eliminar',
          properties: 'Propiedades',
        },
        ai: {
          assistant: 'Asistente de IA',
          placeholder: 'Pregúntame lo que quieras...',
          thinking: 'Pensando...',
          error: 'Lo siento, encontré un error. Por favor, inténtalo de nuevo.',
          welcome: '¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?',
        },
      };
    } else {
      // Fallback to English
      return loadTranslations('en');
    }
    
    console.log(`Loaded translations for ${language}`);
    return translations[language];
  } catch (error) {
    console.error(`Error loading translations for ${language}:`, error);
    
    // Fallback to empty translations
    translations[language] = {};
    return translations[language];
  }
}

/**
 * Translate a key
 * @param {string} key - Translation key (dot notation)
 * @param {Object} params - Parameters for interpolation
 * @returns {string} Translated string
 */
function translate(key, params = {}) {
  // Get translations for current language
  const langTranslations = translations[currentLanguage] || {};
  
  // Split key by dots
  const keys = key.split('.');
  
  // Traverse translations object
  let value = langTranslations;
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) break;
  }
  
  // If translation not found, try English
  if (value === undefined && currentLanguage !== 'en') {
    const enTranslations = translations.en || {};
    value = enTranslations;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
  }
  
  // If still not found, return key
  if (value === undefined) {
    return key;
  }
  
  // Interpolate parameters
  if (typeof value === 'string' && Object.keys(params).length > 0) {
    return value.replace(/\{(\w+)\}/g, (_, paramKey) => {
      return params[paramKey] !== undefined ? params[paramKey] : `{${paramKey}}`;
    });
  }
  
  return value;
}

/**
 * Set the current language
 * @param {string} language - Language code
 * @returns {Promise<boolean>} Success
 */
async function setLanguage(language) {
  try {
    // Load translations for new language
    await loadTranslations(language);
    
    // Update current language
    currentLanguage = language;
    
    // Dispatch language change event
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language } }));
    
    console.log(`Language set to ${language}`);
    return true;
  } catch (error) {
    console.error(`Error setting language to ${language}:`, error);
    return false;
  }
}

/**
 * Get the current language
 * @returns {string} Current language code
 */
function getLanguage() {
  return currentLanguage;
}

/**
 * Get available languages
 * @returns {Array} Array of language objects
 */
function getAvailableLanguages() {
  return [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
  ];
}