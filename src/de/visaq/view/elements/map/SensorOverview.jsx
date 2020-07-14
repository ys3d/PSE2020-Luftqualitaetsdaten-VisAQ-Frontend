import React, { Component } from 'react';
import styles from './SensorOverview.module.css'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Figure from 'react-bootstrap/Figure'

import testDia from '../../../../../testdiagram.png'

class SensorOverview extends Component{

  render() {
    return (
      <>
        
        <h3>Sensor: [...]</h3>
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
        </>
    );
  }
}
export default SensorOverview;