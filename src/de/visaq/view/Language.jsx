import i18n from 'i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import navbar_de from '../../../resources/de/navbar_de.json';
import navbar_en from '../../../resources/en/navbar_en.json';
import sensorOverview_de from '../../../resources/de/sensorOverview_de.json';
import sensorOverview_en from '../../../resources/en/sensorOverview_en.json';
import cookie_de from '../../../resources/de/cookie_de.json';
import cookie_en from '../../../resources/en/cookie_en.json';

/**
 * The resources used to get the translations
 */
const resources = {
        en: {
        common: navbar_en,
        overview: sensorOverview_en,
        cookies: cookie_en
        },
         de: {
        common: navbar_de,
        overview: sensorOverview_de,
        cookies: cookie_de
    }
  };

 
i18n
.use(initReactI18next)

/**
 * Desicion on what happens when language is changed
 */
.on('languageChanged', function(lng) {
  if (document.cookie.split(';').some((item) => item.trim().startsWith('Language='))) {
    document.cookie= 'Language=' + lng;
  }
})

/**
 * Initialization of the Language settings
 */
.init({
    lng: document.cookie.split(';').some((item) => item.trim().startsWith('Language=en')) ? 'en' : 'de',
    resources,
    languages: ['de','en'],
    fallbackLng: 'de',
    debug: true,
    load: 'current',
    
    interpolation: {
      escapeValue: false,
    },
    
});

/**
 * Method that changes the language
 */
i18next
  .changeLanguage('')
  .then((t) => {
    t('key'); // -> same as i18next.t
  });
export default i18n;