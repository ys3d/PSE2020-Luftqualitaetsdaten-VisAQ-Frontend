import React, { Fragment } from 'react';
import L, { bounds, } from 'leaflet';
import { render } from 'react-dom';
import {Circle, LatLngBounds, Map, MapLayer, Popup, Marker, LayerGroup } from 'react-leaflet';

//import controller from './de/visaq/controller/Controller';

//normally data should be given instead of props
const SensorOverlaysFactory = (props) =>  {
  const {sensors} = props;
    const markers = sensors.map((sensor, index) => (
      <Circle
        key = {index}
        center = {sensor.coordinates}
        opacity = '0'
        fillColor = 'red'
        fillOpacity = '0.5'
        radius = {500}>
        </Circle>
    ));
    return <Fragment>{markers}</Fragment>
}

export default SensorOverlaysFactory;