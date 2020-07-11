import React, { Component } from 'react';
import { Map, TileLayer} from 'react-leaflet'
import "./MapView.css";
import OverlayBuilder from './overlayfactory/OverlayBuilder'

var bounds;

export default class MapView extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 48.3705449,
      lng: 10.89779,
      zoom: 13,
    };

  }

  componentDidMount() {
    console.log(this.refs.map.leafletElement.getBounds());
    bounds = this.refs.map.leafletElement.getBounds();
  }

  componentDidUpdate() {
    
  }

  render() {
      return (
        <Map 
          center={[this.state.lat, this.state.lng]} 
          zoom={this.state.zoom} 
          style={{ width: '100%', height: '900px'}}
          ref = 'map'
        >
          <TileLayer
           attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <OverlayBuilder mapbounds = {bounds}/>
       </Map> 
      );
   }
}