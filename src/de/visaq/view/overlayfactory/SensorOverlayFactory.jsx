import React, { Fragment } from 'react';
import { CircleMarker } from 'react-leaflet';
import Gradient from '../elements/theme/Gradient';


const SensorOverlayFactory = (props) => {
    const data = props.data;
    function handler(id) {
        props.openHandler(id)
    };

    const markers = data.map((datum, index) => (
        <CircleMarker
            key={index}
            center={[datum[0].locations[0].location.y, datum[0].locations[0].location.x]}
            opacity='0'
            fillColor={Gradient(datum[1].result, props.airQ)}
            fillOpacity='0.8'
            radius={10}
            onClick={() => handler(datum[1].result)}
        >
        </CircleMarker>
    ));

    return <Fragment>{markers}</Fragment>
}

export default SensorOverlayFactory;

