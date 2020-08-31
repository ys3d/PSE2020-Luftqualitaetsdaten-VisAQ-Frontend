import React, { Fragment } from 'react';
import { CircleMarker } from 'react-leaflet';
import Gradient from '../elements/theme/Gradient';
import AirQualityData from '../elements/airquality/AirQualityData';

/**
 * Builds an Overlay of Circle Markers that represent the sensor data.
 *
 * @param {Object} props    The class properties
 */
const SensorOverlayFactory = (props) => {
    const data = props.data;
    function handler(squareCenter, thingId) {
        props.openHandler(squareCenter, thingId)
    };

    if (!props.overlay) {
        return <Fragment></Fragment>
    }

    let airQualityData = AirQualityData.getInstance();

    const markers = data.map((datum, index) => (
        <CircleMarker
            key={index}
            center={[datum[0].locations[0].location.y, datum[0].locations[0].location.x]}
            opacity='0'
            fillColor={Gradient(datum[1].result, airQualityData)}
            fillOpacity='0.8'
            radius={10}
            onClick={() => handler([datum[0].locations[0].location.x, datum[0].locations[0].location.y], datum[0].id, airQualityData)}
        >
        </CircleMarker>
    ));

    return <Fragment>{markers}</Fragment>
}

export default SensorOverlayFactory;
