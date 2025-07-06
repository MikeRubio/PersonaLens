import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources
const resources = {
  en: {
    translation: {
      // Header
      appName: "PersonaLens",
      settings: "Settings",

      // Personas
      selectPersona: "Select Testing Persona",
      personas: {
        colorblind: {
          name: "Colorblind User",
          description:
            "Tests for color contrast and accessibility issues affecting users with deuteranopia",
        },
        nonNative: {
          name: "Non-Native English Speaker",
          description:
            "Evaluates language complexity and clarity for B1 level English speakers",
        },
        elderly: {
          name: "Elderly User (65+)",
          description:
            "Tests for age-related accessibility needs including larger text and simplified navigation",
        },
        motorImpaired: {
          name: "Motor Impaired User",
          description:
            "Evaluates usability for users with limited fine motor control and mobility",
        },
        lowVision: {
          name: "Low Vision User",
          description:
            "Tests for screen reader compatibility and high contrast requirements",
        },
        cognitiveImpaired: {
          name: "Cognitive Impaired User",
          description:
            "Evaluates clarity, simplicity, and cognitive load for users with learning disabilities",
        },
      },

      // Test Runner
      runTest: "Run Accessibility Test",
      apiKeyRequired: "PersonaLens API key required",
      configureApiKey: "Configure your API key in settings to run tests",
      runTestButton: "Run Test",
      analyzingPage: "Analyzing page...",
      testingFor: "Testing for {{persona}} perspective",
      analyzing: "Analyzing...",
      downloadReport: "Download Report",

      // Report Viewer
      testReport: "Test Report",
      runNewTest: "Run new test",
      issuesFound: "Issues Found ({{count}})",
      noIssues: "No accessibility issues detected for this persona!",
      suggestion: "Suggestion:",
      severity: {
        high: "High Priority",
        medium: "Medium Priority",
        low: "Low Priority",
      },

      // Settings
      settingsTitle: "Settings",
      goBack: "Go back",
      apiKeySection: "OpenAI API Key",
      apiKeyDescription:
        "PersonaLens uses OpenAI's GPT models to analyze web pages and generate accessibility reports.",
      apiKeyLabel: "API Key",
      saveApiKey: "Save API Key",
      saving: "Saving...",
      showApiKey: "Show API key",
      hideApiKey: "Hide API key",
      getApiKey: "Get Your API Key",
      apiKeySteps: {
        step1: "1. Visit the OpenAI API dashboard",
        step2: "2. Create a new secret key",
        step3: "3. Copy and paste it above",
      },
      openDashboard: "Open OpenAI Dashboard",
      privacyNote:
        "Privacy: Your API key is stored locally in your browser and never shared. Page content is sent to OpenAI for analysis only when you run tests.",

      // Language Selector
      language: "Language",
      english: "English",
      spanish: "Español",

      // Footer
      footer: "Powered by OpenAI • Made for developers",

      // Errors
      testFailed: "Test Failed",
      dismiss: "Dismiss",
    },
  },
  es: {
    translation: {
      // Header
      appName: "PersonaLens",
      settings: "Configuración",

      // Personas
      selectPersona: "Seleccionar Persona de Prueba",
      personas: {
        colorblind: {
          name: "Usuario Daltónico",
          description:
            "Prueba problemas de contraste de color y accesibilidad que afectan a usuarios con deuteranopia",
        },
        nonNative: {
          name: "Hablante No Nativo de Inglés",
          description:
            "Evalúa la complejidad del idioma y claridad para hablantes de inglés nivel B1",
        },
        elderly: {
          name: "Usuario Mayor (65+)",
          description:
            "Prueba necesidades de accesibilidad relacionadas con la edad incluyendo texto más grande y navegación simplificada",
        },
        motorImpaired: {
          name: "Usuario con Discapacidad Motora",
          description:
            "Evalúa la usabilidad para usuarios con control motor fino limitado y movilidad",
        },
        lowVision: {
          name: "Usuario con Baja Visión",
          description:
            "Prueba compatibilidad con lectores de pantalla y requisitos de alto contraste",
        },
        cognitiveImpaired: {
          name: "Usuario con Discapacidad Cognitiva",
          description:
            "Evalúa claridad, simplicidad y carga cognitiva para usuarios con discapacidades de aprendizaje",
        },
      },

      // Test Runner
      runTest: "Ejecutar Prueba de Accesibilidad",
      apiKeyRequired: "Se requiere clave API de PersonaLens",
      configureApiKey:
        "Configure su clave API en configuración para ejecutar pruebas",
      runTestButton: "Ejecutar Prueba",
      analyzingPage: "Analizando página...",
      testingFor: "Probando desde la perspectiva de {{persona}}",
      analyzing: "Analizando...",
      downloadReport: "Descargar Reporte",

      // Report Viewer
      testReport: "Reporte de Prueba",
      runNewTest: "Ejecutar nueva prueba",
      issuesFound: "Problemas Encontrados ({{count}})",
      noIssues:
        "¡No se detectaron problemas de accesibilidad para esta persona!",
      suggestion: "Sugerencia:",
      severity: {
        high: "Prioridad Alta",
        medium: "Prioridad Media",
        low: "Prioridad Baja",
      },

      // Settings
      settingsTitle: "Configuración",
      goBack: "Volver",
      apiKeySection: "Clave API de OpenAI",
      apiKeyDescription:
        "PersonaLens usa los modelos GPT de OpenAI para analizar páginas web y generar reportes de accesibilidad.",
      apiKeyLabel: "Clave API",
      saveApiKey: "Guardar Clave API",
      saving: "Guardando...",
      showApiKey: "Mostrar clave API",
      hideApiKey: "Ocultar clave API",
      getApiKey: "Obtener Su Clave API",
      apiKeySteps: {
        step1: "1. Visite el panel de OpenAI API",
        step2: "2. Cree una nueva clave secreta",
        step3: "3. Cópiela y péguela arriba",
      },
      openDashboard: "Abrir Panel de OpenAI",
      privacyNote:
        "Privacidad: Su clave API se almacena localmente en su navegador y nunca se comparte. El contenido de la página se envía a OpenAI para análisis solo cuando ejecuta pruebas.",

      // Language Selector
      language: "Idioma",
      english: "English",
      spanish: "Español",

      // Footer
      footer: "Desarrollado por OpenAI • Hecho para desarrolladores",

      // Errors
      testFailed: "Prueba Falló",
      dismiss: "Descartar",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react already does escaping
  },
});

export default i18n;
