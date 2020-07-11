import React from 'react';
import ReactDOM from 'react-dom';
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from "react-offcanvas";

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet';
import closeX from '../../../../../Black_close_x.svg'
import styles from './SensorOverview.module.css'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Figure from 'react-bootstrap/Figure'

import testDia from '../../../../../testdiagram.png'

class SensorOverview extends React.Component {

  componentWillMount() {
    // sets the initial state
    this.setState({
      isOverviewOpen: false
    });
  }

  state = {
    lat: 48.3705449,
    lng: 10.89779,
    zoom: 13,
  }



  render() {
    return (
      <OffCanvas
        width={500}
        transitionDuration={300}
        effect={"overlay"}
        isMenuOpened={this.state.isOverviewOpen}
        position={"right"}
      >
        <OffCanvasBody
          className={styles.bodyClass}
          style={{ fontSize: "30px" }}
        >
          <p>
            <a href="#" onClick={this.toggleOverview.bind(this)}>
              Open
            </a>{" "}
          </p>
          <Map
            center={[this.state.lat, this.state.lng]}
            zoom={this.state.zoom}
            style={{ width: '100%', height: '900px' }}
          >
            <TileLayer
              attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </Map>
        </OffCanvasBody>
        <OffCanvasMenu className={styles.menuClass}>
          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={this.closeToolTip}
          >
            <p>
              <a href="#" onClick={this.toggleOverview.bind(this)}>
                <img src={closeX} alt="close" width='20px' />
              </a>
            </p>
          </OverlayTrigger>
          <h1>Sensor: [...]</h1>
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
        </OffCanvasMenu>
      </OffCanvas>
    );
  }

  toggleOverview() {
    // toggles the menu opened state
    this.setState({ isOverviewOpen: !this.state.isOverviewOpen });
  }

  closeToolTip(props) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Hier klicken um die Detailansicht zu schließen
      </Tooltip>
    );
  }
}

export default SensorOverview;