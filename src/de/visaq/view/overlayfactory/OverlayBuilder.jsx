import React, { Fragment, Component } from 'react';
import SensorOverlayFactory from './SensorOverlayFactory';
import {L, getSouthWest,lng,LatLngBounds, toBBoxString} from 'leaflet';
import {useLeaflet } from 'react-leaflet';
import InterpolationOverlayFactory from './InterpolationOverlayFactory';
import Gradient from '../elements/theme/Gradient';
import * as data from './testOverlay.json';
import * as ipdata from './testIPOverlay.json';
import AirQualityData from '../elements/airquality/AirQualityData';


export default class OverlayBuilder extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Fragment>
                    <SensorOverlayFactory sensors={this.props.mapState.things} airQ = {this.props.mapState.airQualityData} />
                    <InterpolationOverlayFactory sensors={this.props.mapState.things} />
                </Fragment>
            </div>
        );
    }
}
