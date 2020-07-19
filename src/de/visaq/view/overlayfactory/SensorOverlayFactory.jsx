import React, { Fragment } from 'react';
import L, { bounds, } from 'leaflet';
import { render } from 'react-dom';

import { CircleMarker, LatLngBounds, Map, MapLayer, Popup, Marker, LayerGroup } from 'react-leaflet';
import Gradient from '../elements/theme/Gradient';

//import controller from './de/visaq/controller/Controller';

//normally data should be given instead of props
const SensorOverlayFactory = (props) => {
    const {sensors} = props;
    if (!Array.isArray(sensors)) {
        return <Fragment></Fragment>
    }

    const markers = sensors.filter((sensor, index) => {
        if (sensor.locations === undefined) {
            return false;
        }
        return true;
    }).map((sensor, index) => (
        <CircleMarker
            key={index}
            center={[sensor.locations[0].location.y, sensor.locations[0].location.x]}
            opacity='0'
            fillColor={Gradient(80, props.airQ)}
            fillOpacity='0.8'
            radius={10}
            onClick={onCircleClick.bind(sensor)}
        >
        </CircleMarker>
    ));
    return <Fragment>{markers}</Fragment>
}


export default SensorOverlayFactory;

function onCircleClick(props) {
    alert(props.name);
}