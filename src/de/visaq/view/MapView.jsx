import React, { Component } from 'react';
//import ReactDOM from 'react-dom'; //DOM gives opportunity to hatch outside the react model, neccessary?
import L from 'leaflet';
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import "./MapView.css";

export default class MapView extends Component {
  
  //Coordinates of the beginning state
  state = {
      lat: 48.3705449,
      lng: 10.89779,
      zoom: 13,
  }
  render() {
      return (
        //this.props.incidents ?
              <Map 
                 center={[this.state.lat, this.state.lng]} 
                 zoom={this.state.zoom} 
                 style={{ width: '100%', height: '900px'}}
              >
              <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
             </Map>
               //:
               //'Data is loading...'  
        )
   }
}