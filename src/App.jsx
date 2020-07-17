import React, { Suspense } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigationbar from './de/visaq/view/elements/navbar/Navigationbar'
import MapView from './de/visaq/view/MapView';
import CookieNotice from './de/visaq/view/elements/CookieNotice'

function App() {
  return (
    <Suspense fallback='loading'>
        <Navigationbar />
    </Suspense>
  );
}

export default App;
