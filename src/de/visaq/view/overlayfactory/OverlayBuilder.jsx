import React, { Fragment } from 'react';
import SensorOverlayFactory from './SensorOverlayFactory';
import InterpolationOverlayFactory from './InterpolationOverlayFactory';
import { Component } from 'react';

export default class OverlayBuilder extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Fragment>
                    <SensorOverlayFactory sensors={this.props.mapState.things} />
                    <InterpolationOverlayFactory sensors={this.props.mapState.things} />
                </Fragment>
            </div>
        );
    }
}
