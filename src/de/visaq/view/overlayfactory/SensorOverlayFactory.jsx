import React, { Fragment } from 'react';
import { CircleMarker } from 'react-leaflet';
import Gradient from '../elements/theme/Gradient';

/**
 * Builds an Overlay of Circle Markers that represent the sensor data.
 *
 * @param {Object} props    The class properties
 */
const SensorOverlayFactory = (props) => {
    const data = props.data;
    function handler(center, id) {
        props.openHandler(center, id)
    };

    if (!props.overlay) {
        return <Fragment></Fragment>
    }

    const markers = data.map((datum, index) => (
        <CircleMarker
            key={index}
            center={[datum[0].locations[0].location.y, datum[0].locations[0].location.x]}
            opacity='0'
            fillColor={Gradient(datum[1].result, props.airQualityData)}
            fillOpacity='0.8'
            radius={10}
            onClick={() => handler([datum[0].locations[0].location.x, datum[0].locations[0].location.y], datum[0].id)}
        >
        </CircleMarker>
    ));

    return <Fragment>{markers}</Fragment>
}

export default SensorOverlayFactory;
