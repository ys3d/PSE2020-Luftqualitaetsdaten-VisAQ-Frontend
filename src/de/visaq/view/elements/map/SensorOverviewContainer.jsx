import React from 'react';
import closeX from '../../../../../Black_close_x.svg'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import SensorOverview from './SensorOverview'
import { Col } from "react-bootstrap";
import { render } from '@testing-library/react';

/**
 * Container for The SensorOverview
 * @param {*} props 
 */
function Overview(props) {
    if (!props.show) {
        return (
            <></>
        )
    }
    return (
        <>
            <Col xl={4} lg={6} md={8} sm={8} xs={10} id="sensorOverviewContainer">
                <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={closeToolTip}
                >
                    <p>
                        <a href="#" onClick={props.closeHandler}>
                            <img src={closeX} alt="close" width='20px' />
                        </a>
                    </p>
                </OverlayTrigger>
                <SensorOverview thingID={props.thingID}/>
            </Col>
        </>
    );
}
render(<Overview />);

function closeToolTip(props) {
    return (
        <Tooltip id="button-tooltip" {...props}>
            Hier klicken um die Detailansicht zu schließen
        </Tooltip>
    );
}

export default Overview;