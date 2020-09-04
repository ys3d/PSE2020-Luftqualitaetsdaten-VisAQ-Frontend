import i18n from 'i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import navbar_de from '../../../resources/de/navbar_de.json';
import navbar_en from '../../../resources/en/navbar_en.json';
import help_en from '../../../resources/en/help_en.json';
import help_de from '../../../resources/de/help_de.json';
import sensorOverview_de from '../../../resources/de/sensorOverview_de.json';
import sensorOverview_en from '../../../resources/en/sensorOverview_en.json';
import cookie_de from '../../../resources/de/cookie_de.json';
import cookie_en from '../../../resources/en/cookie_en.json';
import popup_causes_de from '../../../resources/de/popup_causes_de.json';
import popup_causes_en from '../../../resources/en/popup_causes_en.json';
import popup_reasons_de from '../../../resources/de/pupup_reasons_de.json';
import popup_reasons_en from '../../../resources/en/popup_reasons_en.json';
import historical_de from '../../../resources/de/historical_de.json';
import historical_en from '../../../resources/en/historical_en.json';
import legend_de from '../../../resources/de/legend_de.json';
import legend_en from '../../../resources/en/legend_en.json';
import Cookies from 'js-cookie';

/**
 * The resources used to get the translations
 */
const resources = {
    en: {
        common: navbar_en,
        overview: sensorOverview_en,
        help: help_en,
        cookies: cookie_en,
        causes: popup_causes_en,
        reasons: popup_reasons_en,
        historical: historical_en,
        legend: legend_en
    },
    de: {
        common: navbar_de,
        overview: sensorOverview_de,
        help: help_de,
        cookies: cookie_de,
        causes: popup_causes_de,
        reasons: popup_reasons_de,
        historical: historical_de,
        legend: legend_de
    }
};


i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    /**
     * Desicion on what happens when language is changed
     */
    .on('languageChanged', function (lng) {
        if (Cookies.get("visaq_allowcookies") === "true") {
            Cookies.set('visaq_language', lng, { expires: 365, sameSite: 'lax' });
        }
    })

    /**
     * Initialization of the Language settings
     */
    .init({
        lng: Cookies.get('visaq_language'),
        resources,
        languages: ['de', 'en'],
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
    .changeLanguage('');
export default i18n;
