import React, { Fragment } from 'react';
import { CircleMarker } from 'react-leaflet';
import Gradient from '../elements/theme/Gradient';
import AirQualityData from '../elements/airquality/AirQualityData';
import ColorblindMode from '../elements/theme/ColorblindMode';

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

    let opacity;
    let fillOpacity;
    if (ColorblindMode.getMode() === ColorblindMode.Mode.none) {
        opacity = '0';
        fillOpacity = '0.8';
    }
    else {
        opacity = '1';
        fillOpacity = '1';
    }

    const markers = data.map((datum, index) => (
        <CircleMarker
            key={index}
            center={[datum[0].locations[0].location.y, datum[0].locations[0].location.x]}
            opacity={opacity}
            weight='1.5'
            color={window.getComputedStyle(document.body).getPropertyValue("--border")}
            fillColor={Gradient.interpolate(datum[1].result)}
            fillOpacity={fillOpacity}
            radius={10}
            onClick={() => handler([datum[0].locations[0].location.x, datum[0].locations[0].location.y], datum[0].id, airQualityData)}
        />
    ));

    return <Fragment>{markers}</Fragment>
}

export default SensorOverlayFactory;
