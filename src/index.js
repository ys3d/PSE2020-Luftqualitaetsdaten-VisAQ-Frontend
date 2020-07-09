import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Navbar}  from 'src/de/visaq/view/elements/navbar';
import App from './App';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import common_de from "vis/translations_de.json";
import common_en from "vis/translations_en.json";
import 'bootstrap/dist/css/bootstrap.min.css';

{/* Initializies the language*/}
    i18next.init({
        interpolation: { escapeValue: false },  // React already does escaping
        lng: 'de',                              // language to use
        resources: {
            en: {
                common: common_en               // 'common' is our custom namespace
            },
            de: {
                common: common_de
            },
        },
    });

class Main extends React.Component {
    render() {
      return (
          <Navbar>
          </Navbar>
      );
    }
  }
  
  // ========================================
      {/* Needed for the Language*/}
ReactDOM.render(
  <React.StrictMode>
      <I18nextProvider i18n={i18next}>
          <App/>
      </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);