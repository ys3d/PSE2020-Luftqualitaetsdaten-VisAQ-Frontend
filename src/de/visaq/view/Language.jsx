import React, { Component } from 'react';
import i18n from 'i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import navbar_de from '../../../resources/de/navbar_de.json';
import navbar_en from '../../../resources/en/navbar_en.json';

const resources = {
        en: {
        common: navbar_en
        },
         de: {
        common: navbar_de
    }
  };

i18n
.init({
    resources,
    languages: ['de','en'],
    fallbackLng: 'de',
    debug: true,
    load: 'current',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
 
});

i18next
  .changeLanguage('de')
  .then((t) => {
    t('key'); // -> same as i18next.t
  });

export default i18n;