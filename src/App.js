import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Navigationbar} from './de/visaq/view/elements/navbar/Navigationbar'
import MapView from './de/visaq/view/MapView';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navigationbar />
        <MapView />
      </Router>
    </React.Fragment>
  );
}

export default App;
