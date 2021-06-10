import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import { initReactI18next  } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

// the translations
// (tip move them in a JSON file and import them)
// const resources = {
//   en: {
//     translation: {
//       'Test Page Title': 'Test Page Title',
//     },
//   },
//   de: {
//     translation: {
//       'Test Page Title': 'Testseite',
//     },
//   },
//   fr: {
//     translation: {
//       'Test Page Title': 'Page de test',
//     },
//   },
// };

i18n
  // .use(initReactI18next) // passes i18n down to react-i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(HttpApi)
  .init({
    // resources,
    lng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: true, // react already safes from xss
    },
    fallbackLng: 'en',
    preload: ['en', 'de', 'fr'],
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: '/api/locales/{{lng}}/{{ns}}',
      requestOptions: {
        // used for fetch
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'default',
      },
      // loadPath: 'http://localhost:5000/api/locales?lng={{lng}}&ns={{ns}}'
    },
  });

export default i18n;
