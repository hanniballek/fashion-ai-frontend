import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import arTranslation from './locales/ar/translation.json';
import enTranslation from './locales/en/translation.json';
import frTranslation from './locales/fr/translation.json';

const resources = {
  ar: {
    translation: arTranslation
  },
  en: {
    translation: enTranslation
  },
  fr: {
    translation: frTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // Default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
