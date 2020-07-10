import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import MapView from '../view/MapView'
import Navbar from '../view/elements/navbar/Navbar';
import { getData, storeData } from '../../../helpers/localStorage';

const App = () => {
    return (
        <div className="App">
        <Navbar/>
        <MapView/>
       </div>
    );
  };
ReactDOM.render(<App />, document.getElementById('root'));
