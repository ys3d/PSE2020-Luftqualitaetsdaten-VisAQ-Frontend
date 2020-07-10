import React from 'react';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import './App.css';
import MapView from '../view/MapView'
//import Navbar from '../view/elements/navbar/Navbar';
import { getData, storeData } from '../../../helpers/localStorage';

const App = () => {
 return new MapView();
};
  //this.navbar = new Navbar.NavigationBar();


export default App;
