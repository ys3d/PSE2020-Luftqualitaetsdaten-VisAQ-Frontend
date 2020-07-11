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
                 style={{ width: '100%', height: '900px'}}
              >
              <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
             </Map>
        </OffCanvasBody>
        <OffCanvasMenu className={styles.menuClass}>
          <p>
            <a href="#" onClick={this.toggleOverview.bind(this)}>
              <img src={closeX} alt="close" width='20px'/>
            </a>
          </p>
          <div className = {styles.sensorname}>Sensorname: [Name]</div>
          <ul>
            <li>Luftdruck: 5000mPa</li>
            <li>Lufttemperatur: 30 °C</li>
            <li>Feinstaub: alles</li>
            <li>Luftfeuchtigkeit: Ja</li>
          </ul>
          <div className={styles.diagram}>Diagram</div>


          <p>SensorTyp: [Typ]</p>
        </OffCanvasMenu>
      </OffCanvas>
    );
  }

  toggleOverview() {
    // toggles the menu opened state
    this.setState({ isOverviewOpen: !this.state.isOverviewOpen });
  }
}

export default SensorOverview;