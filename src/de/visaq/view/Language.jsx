import React, { Component } from 'react';
import i18n from 'i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import navbar_de from '../../../resources/de/navbar_de.json';
import navbar_en from '../../../resources/en/navbar_en.json';
import sensorOverview_de from '../../../resources/de/sensorOverview_de.json'
import sensorOverview_en from '../../../resources/en/sensorOverview_en.json'
 
const resources = {
        en: {
        common: navbar_en,
        overview: sensorOverview_en
        },
         de: {
        common: navbar_de,
        overview: sensorOverview_de
    }
  };

 
i18n
.use(initReactI18next)

.on('languageChanged', function(lng) {
  if (document.cookie.split(';').some((item) => item.trim().startsWith('Language='))) {
    document.cookie= 'Language=' + lng;
  }
})

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

i18next
  .changeLanguage('')
  .then((t) => {
    t('key'); // -> same as i18next.t
  });
export default i18n;