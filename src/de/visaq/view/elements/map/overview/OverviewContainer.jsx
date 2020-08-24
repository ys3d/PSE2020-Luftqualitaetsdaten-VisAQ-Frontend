import React from 'react';
import SensorOverview from './SensorOverview'
import PointOverview from './PointOverview'
import { Col } from "react-bootstrap";
import { render } from '@testing-library/react';
import './OverviewContainer.css'

/**
 * Container for The SensorOverview
 * @param {Object} props    The properties of Overview.
 */
function Overview(props) {
    if (!props.show) {
        return (
            <></>
        )
    }
    else {
        if (props.isSensor) {
            return (
                <>
                    <Col xl={4} lg={6} md={8} sm={8} xs={10} id="sensorOverviewContainer">
                        <p>
                            <a href="/#" onClick={props.closeHandler} className='close'> </a>
                            <br />
                            <br />
                        </p>
                        <SensorOverview squareCenter={props.squareCenter} thingId={props.thingId} expert={props.showDetails} />
                    </Col>
                </>
            );
        }
        else {
            return (
                <>
                    <Col xl={4} lg={6} md={8} sm={8} xs={10} id="pointOverviewContainer">
                        <p>
                            <a href="/#" onClick={props.closeHandler} className='close'> </a>
                            <br />
                            <br />
                        </p>
                        <PointOverview squareCenter={props.squareCenter} value={props.pointValue} airQualityData={props.airQualityData} expert={props.showDetails} />
                    </Col>
                </>
            );
        }
    }
}
render(<Overview />);

export default Overview;
