import React from 'react';
import ReactDOM from 'react-dom';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import './App.css';
import MapView from '../view/MapView'
//import NavigationBar from '../view/elements/navbar/Navbar';
import { getData, storeData } from '../../../helpers/localStorage';

const App = () => {
 return (
    <div>
      <MapView />
    </div>
  )
 }
export default App;
