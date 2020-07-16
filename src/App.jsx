import React, { Component,Suspense } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigationbar from './de/visaq/view/elements/navbar/Navigationbar'
import MapView from './de/visaq/view/MapView';
import { Container, Row, Col } from "react-bootstrap";

import Overview from './de/visaq/view/elements/map/SensorOverviewContainer'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showOverview: false,
      thingID: "saqn:t:grimm-aerosol.com:EDM80NEPH:SN17017"
    };

    this.handleShowClick = this.handleShowClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  handleShowClick(toSetThingID) {
    this.setState({
      showOverview: true,
      thingID: toSetThingID
    });
  }

  handleCloseClick() {
    this.setState({
      showOverview: false
    });
  }


  render() {
    return (
      <Suspense fallback='loading'>
      <React.Fragment>
        <Router>
          <Navigationbar />
          <a href="#" onClick={() => this.handleShowClick("saqn:t:grimm-aerosol.com:EDM80NEPH:SN17017")}>
            <p>open</p>
          </a>
          <a href="#" onClick={() => this.handleShowClick("saqn:t:7bd2cd3")}>
            <p>open2</p>
          </a>
          <Container fluid>
            <Row>
              <Col id="map-content">
                <MapView />
              </Col>
              <Overview show={this.state.showOverview} closeHandler={this.handleCloseClick} thingID={this.state.thingID} />
            </Row>
          </Container>
        </Router>
      </React.Fragment>
      </Suspense>
    );
  }
}
export default App;