import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Circle, LatLngBounds, Map, MapLayer, Popup, Marker, LayerGroup } from 'react-leaflet';

//import controller from './de/visaq/controller/Controller';

//normally data should be given instead of props
const InterpolationOverlaysFactory = (props) => {
    const {sensors} = props;
    if (!Array.isArray(sensors)) {
        return <Fragment></Fragment>
    }

    const imarkers = sensors.filter((sensor, index) => {
        if (sensor.locations == undefined) {
            return false;
        }
        return true;
    }).map((sensor, index) => (
        <Circle
            key={index}
            center={[sensor.locations[0].location.y, sensor.locations[0].location.x]}
            opacity='0'
            fillColor='green'
            fillOpacity='0.8'
            radius={200}
        ></Circle>
    ));
    return <Fragment>{imarkers}</Fragment>
}

export default InterpolationOverlaysFactory;
