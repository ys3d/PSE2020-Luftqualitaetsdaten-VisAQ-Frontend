import React, { Fragment } from 'react';
import L, { bounds, } from 'leaflet';
import { render } from 'react-dom';

import { CircleMarker, LatLngBounds, Map, MapLayer, Popup, Marker, LayerGroup } from 'react-leaflet';
import Gradient from '../elements/theme/Gradient';

//import controller from './de/visaq/controller/Controller';

//normally data should be given instead of props
const SensorOverlayFactory = (props) => {
    const things = props.things;
    const observations = props.observations;

    if (!Array.isArray(things) || !Array.isArray(observations)) {
        return <Fragment></Fragment>
    }
    
    const data = [];

    things.forEach((thing, index) => {
        data[index] = { thing: thing, observation: observations[index] };
    });

    const markers = data.filter((datum) => {
        if (datum.thing.locations === undefined) {
            return false;
        } else if (datum.observation == null) {
            return false;
        }
        return true;
    }).map((datum, index) => (
        <CircleMarker
            key={index}
            center={[datum.thing.locations[0].location.y, datum.thing.locations[0].location.x]}
            opacity='0'
            fillColor={Gradient(datum.observation.result, props.airQ)}
            fillOpacity='0.8'
            radius={10}
            onClick={onCircleClick.bind(datum.thing)}
        >
        </CircleMarker>
    ));
    return <Fragment>{markers}</Fragment>
}


export default SensorOverlayFactory;

function onCircleClick(props) {
    alert(props.name);
}
