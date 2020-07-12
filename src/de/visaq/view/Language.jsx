import React, { Component } from 'react';
import common_de from 'vis/translations_de.json';
import common_en from 'vis/translations_en.json';

const resources = {
        en: {
        common: common_en
        },
         de: {
        common: common_de
    }
  };

Language

  .init({
    resources,
    fallbackLng: 'de',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default Langauge;