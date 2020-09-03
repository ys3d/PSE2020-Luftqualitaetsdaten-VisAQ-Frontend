import React, { Component } from 'react';
import SensorOverview from './SensorOverview'
import PointOverview from './PointOverview'
import { Col } from "react-bootstrap";
import './Overview.css'

export default class Overview extends Component {
    render() {
        let object;
        if (!this.props.show) {
            object = (<></>);
        }
        else {
            if (this.props.isSensor) {
                object = (
                    <>
                        <Col xl={4} lg={6} md={8} sm={8} xs={10} id="sensorOverviewContainer" className="overview-container">
                            <p>
                                <a href="/#" onClick={this.props.closeHandler} className='close'> </a>
                                <br />
                                <br />
                            </p>
                            <SensorOverview squareCenter={this.props.squareCenter} thingId={this.props.thingId} expert={this.props.showDetails} />
                        </Col>
                    </>
                );
            }
            else {
                object = (
                    <>
                        <Col xl={4} lg={6} md={8} sm={8} xs={10} id="pointOverviewContainer" className="overview-container">
                            <p>
                                <a href="/#" onClick={this.props.closeHandler} className='close'> </a>
                                <br />
                                <br />
                            </p>
                            <PointOverview squareCenter={this.props.squareCenter} value={this.props.pointValue} expert={this.props.showDetails} />
                        </Col>
                    </>
                );
            }
        }

        return object;
    }
}
