import React, { Fragment } from 'react';
import SensorOverlayFactory from './SensorOverlayFactory';
import {L, getSouthWest,lng,LatLngBounds, toBBoxString} from 'leaflet';
import {useLeaflet } from 'react-leaflet';
import InterpolationOverlayFactory from './InterpolationOverlayFactory';
import Gradient from '../elements/theme/Gradient';
import * as data from './testOverlay.json';
import * as ipdata from './testIPOverlay.json';
import AirQualityData from '../elements/airquality/AirQualityData';

const OverlayBuilder = ({bounds, airQ}) =>  {
    let airQualityData = airQ;
    return (
        <div>
        <Fragment>
        <SensorOverlayFactory props = {data} airQ = {airQ}/>
        </Fragment>
        </div>
        )
}
export default OverlayBuilder;
