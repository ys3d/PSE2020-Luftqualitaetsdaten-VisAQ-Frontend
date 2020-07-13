import React, { Fragment } from 'react';
import SensorOverlayFactory from './SensorOverlayFactory';
import {L, getSouthWest,lng,LatLngBounds, toBBoxString} from 'leaflet';
import {useLeaflet } from 'react-leaflet';
import InterpolationOverlayFactory from './InterpolationOverlayFactory';
import * as data from './testOverlay.json';
import * as ipdata from './testIPOverlay.json';

const OverlayBuilder = (props) =>  {
    const bounds = props.bounds;
    
    return (
        <div>
        <Fragment>
        <SensorOverlayFactory sensors = {data.sensors}/>
        <InterpolationOverlayFactory sensors = {ipdata.sensors}/>
        </Fragment>
        </div>
        )
}
export default OverlayBuilder;
