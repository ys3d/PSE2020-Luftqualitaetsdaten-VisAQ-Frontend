import React, { Fragment } from 'react';
import L, { bounds, } from 'leaflet';
import { render } from 'react-dom';
import {Circle, LatLngBounds, Map, MapLayer, Popup, Marker, LayerGroup } from 'react-leaflet';

//import controller from './de/visaq/controller/Controller';

//normally data should be given instead of props
const InterpolationOverlaysFactory = (props) =>  {
  const {sensors} = props;
    const imarkers = sensors.map((sensor, index) => (
      <Circle
        key = {index}
        center = {sensor.coordinates}
        opacity = '0'
        fillColor = 'green'
        fillOpacity = '0.8'
        radius = {200}
      ></Circle>
    ));
    return <Fragment>{imarkers}</Fragment>
}

export default InterpolationOverlaysFactory;