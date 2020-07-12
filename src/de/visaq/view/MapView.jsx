import React, { Component } from 'react';
//import ReactDOM from 'react-dom'; //DOM gives opportunity to hatch outside the react model, neccessary?
import L from 'leaflet';
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import "./MapView.css";

import Popover from 'react-bootstrap/Popover'
import PopoverContent from 'react-bootstrap/PopoverContent'
import PopoverTitle from 'react-bootstrap/PopoverTitle'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import SensorOverview from './elements/map/SensorOverview';

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
      <div>
        <OverlayTrigger 
        trigger="click"
        placement="right"
        overlay={openOverlay()}
        rootClose={true}
        >
          <Button variant="success">Click me to see</Button>
        </OverlayTrigger>
        <Map
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
          style={{ width: '100%', height: '900px' }}
        >
          <TileLayer
            attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
      //:
      //'Data is loading...'  
    )
  }

  
}

function openOverlay(sensorID) {
  return new SensorOverview().showSensorOverview()
}
