import React, { Component } from 'react';
//import ReactDOM from 'react-dom'; //DOM gives opportunity to hatch outside the react model, neccessary?
import L from 'leaflet';
import { render } from 'react-dom'
import { Map, MapLayer, Popup, TileLayer } from 'react-leaflet'


export default class SensorOverlayFactory{
    
    //Saves the coordinates
    state = {
        incidents: [],
      }
      componentDidMount() {
      
        //TODO ask Controller for data
        //const incidents = res.data;
        //this.setState({incidents: incidents });
       };
       render() {
        return (
       <MapLayer/>
        );
       }
}
