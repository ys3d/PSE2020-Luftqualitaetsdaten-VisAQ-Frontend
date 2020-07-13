import React, { Fragment } from 'react';
import L, { bounds, } from 'leaflet';
import { render } from 'react-dom';
import {CircleMarker, LatLngBounds, Map, MapLayer, Popup, Marker, LayerGroup } from 'react-leaflet';

//import controller from './de/visaq/controller/Controller';

//normally data should be given instead of props
const SensorOverlaysFactory = (props) =>  {
  const {sensors} = props;
    const markers = sensors.map((sensor, index) => (
      <CircleMarker
        key = {index}
        center = {sensor.coordinates}
        opacity = '0'
        fillColor = 'red'
        fillOpacity = '0.5'
        radius = {5}
        onClick ={onCirleClick.bind(sensor.name)}
          >
        </CircleMarker>
    ));
    return <Fragment>{markers}</Fragment>
}

export default SensorOverlaysFactory;

function onCirleClick(props) {
    alert(JSON.stringify(props));
}