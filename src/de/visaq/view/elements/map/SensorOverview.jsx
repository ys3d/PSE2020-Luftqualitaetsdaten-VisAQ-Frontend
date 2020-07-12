import React from 'react';
import closeX from '../../../../../Black_close_x.svg'
import styles from './SensorOverview.module.css'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Figure from 'react-bootstrap/Figure'
import Popover from 'react-bootstrap/Popover'

import testDia from '../../../../../testdiagram.png'

class SensorOverview {

  showSensorOverview(position) {
    return (
      <Popover id="sensorPopover" positionLeft={position}>
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={closeToolTip}
        >
          <p>
            <a href="#" onClick={() => document.body.click()}>
              <img src={closeX} alt="close" width='20px' />
            </a>
          </p>
        </OverlayTrigger>
        <Popover.Title as="h3">Sensor: [...]</Popover.Title>
        <Popover.Content>
          <p>
            SensorTyp: [...]
          </p>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Luftdruck
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <p>Aktuell: 1000hPa</p>
                  <Figure>
                    <Figure.Image
                      width={400}
                      alt="171x180"
                      src={testDia}
                    />
                    <Figure.Caption>
                      Verlauf der Messwerte
                  </Figure.Caption>
                  </Figure>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Lufttemperatur
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <p>Aktuell: 30°C</p>
                  <Figure>
                    <Figure.Image
                      width={400}
                      alt="171x180"
                      src={testDia}
                    />
                    <Figure.Caption>
                      Verlauf der Messwerte
                  </Figure.Caption>
                  </Figure>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  Luftfeuchtigkeit
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <p>Aktuell: 17%</p>
                  <Figure>
                    <Figure.Image
                      width={400}
                      alt="171x180"
                      src={testDia}
                    />
                    <Figure.Caption>
                      Verlauf der Messwerte
                  </Figure.Caption>
                  </Figure>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Card.Header} eventKey="3">
                  Feinstaub
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <p>Aktuell: 150ppm</p>
                  <Figure>
                    <Figure.Image
                      width={400}
                      alt="171x180"
                      src={testDia}
                    />
                    <Figure.Caption>
                      Verlauf der Messwerte
                  </Figure.Caption>
                  </Figure>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Popover.Content>
      </Popover>
    );
  }
}

function closeToolTip(props) {
  return (
    <Tooltip id="button-tooltip" {...props}>
      Hier klicken um die Detailansicht zu schließen
    </Tooltip>
  );
}

export default SensorOverview;