import React, { Fragment } from 'react';
import L, { bounds, } from 'leaflet';
import { render } from 'react-dom';
import {CircleMarker, LatLngBounds, Map, MapLayer, Popup, Marker, LayerGroup } from 'react-leaflet';
import Gradient from '../elements/theme/Gradient';

//import controller from './de/visaq/controller/Controller';

//normally data should be given instead of props
const SensorOverlaysFactory = (props) =>  {
  const {sensors} = props;
    const markers = sensors.map((sensor, index) => (
      <CircleMarker
        key = {index}
        center = {sensor.coordinates}
        opacity = '0'
        fillColor = {Gradient(sensor.particulate_matter)}
        fillOpacity = '0.8'
        radius = {10}
        onClick ={onCirleClick.bind(sensor)}
        >
        </CircleMarker>
    ));
    return <Fragment>{markers}</Fragment>
}

export default SensorOverlaysFactory;

function onCirleClick(props) {
    alert(props.name);
}