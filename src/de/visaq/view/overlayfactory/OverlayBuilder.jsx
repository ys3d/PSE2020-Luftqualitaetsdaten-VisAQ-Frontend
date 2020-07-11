import React, { Fragment } from 'react';
import SensorOverlayFactory from './SensorOverlayFactory';
import InterpolationOverlayFactory from './InterpolationOverlayFactory';
import * as data from './testOverlay.json';
import * as ipdata from './testIPOverlay.json';

const OverlayBuilder = (bounds) =>  {
    return <Fragment>
        <SensorOverlayFactory sensors = {data.sensors}/>
        <InterpolationOverlayFactory sensors = {ipdata.sensors}/>
        </Fragment>
}
export default OverlayBuilder;