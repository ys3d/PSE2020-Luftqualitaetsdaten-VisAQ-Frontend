import React, { Fragment } from 'react';
import L, { bounds, } from 'leaflet';
import { render } from 'react-dom';
import {CircleMarker, LatLngBounds, Map, MapLayer, Popup, Marker, LayerGroup } from 'react-leaflet';
import Gradient from '../elements/theme/Gradient';
import * as data from './testOverlay.json';

//import controller from './de/visaq/controller/Controller';

//normally data should be given instead of props
const SensorOverlaysFactory = ({props , airQ}) =>  {
  const sens = data.sensors;
    const markers = sens.map((sensor, index) => (
      <CircleMarker
        key = {index}
        center = {sensor.coordinates}
        opacity = '0'
        fillColor = {Gradient(sensor.particulate_matter, airQ)}
        fillOpacity = '0.8'
        radius = {10}
        onClick ={onCirleClick.bind(this)}
        >
        </CircleMarker>
    ));
    return <Fragment>{markers}</Fragment>
}

export default SensorOverlaysFactory;

function onCirleClick(props) {
    console.log(props);
}