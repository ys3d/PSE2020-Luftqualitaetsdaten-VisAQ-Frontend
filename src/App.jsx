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
    this.state = { showOverview: false };

    this.handleShowClick = this.handleShowClick.bind(this);
  }

  handleShowClick() {
    this.setState(state => ({
      showOverview: !state.showOverview
    }));
  }


  render() {
    return (
      <Suspense fallback='loading'>
      <React.Fragment>
        <Router>
          <Navigationbar />
          <a href="#" onClick={this.handleShowClick}>
            <p>open</p>
          </a>
          <Container fluid>
            <Row>
              <Col id="map-content">
                <MapView />
              </Col>
              <Overview show={this.state.showOverview} closeHandler={this.handleShowClick} />
            </Row>
          </Container>
        </Router>
      </React.Fragment>
      </Suspense>
    );
  }
}
export default App;