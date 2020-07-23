import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigationbar from './de/visaq/view/elements/navbar/Navigationbar'
import MapView from './de/visaq/view/MapView';
import {Button} from 'react-bootstrap'
import { Container, Row, Col } from "react-bootstrap";
import './de/visaq/view/elements/theme/LightTheme.css'

import Overview from './de/visaq/view/elements/map/overview/OverviewContainer'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showOverview: false,
      thingID: "saqn:t:grimm-aerosol.com:EDM80NEPH:SN17017",
      isSensor: false
    };

    this.handleShowSensorClick = this.handleShowSensorClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleShowPointClick = this.handleShowPointClick.bind(this);
  }

  handleShowSensorClick(toSetThingID) {
    this.setState({
      showOverview: true,
      thingID: toSetThingID,
      isSensor: true
    });
  }
  handleShowPointClick() {
    this.setState({
      showOverview: true,
      isSensor: false
    });
  }

  handleCloseClick() {
    this.setState({
      showOverview: false,
      isSensor: false
    });
  }

  render() {
    return (
      <div id='app' className="light-theme">
        <Suspense fallback='loading'>
          <React.Fragment>
            <Router>
              <Container fluid>
                <Row>
                  <Col id="map-content">
                    <Button onclick={this.replaceTheme('dark-theme')}>Change</Button>
                    <Navigationbar openHandler={(e) => this.handleShowSensorClick(e)}/>
                  </Col>
                  <Overview show={this.state.showOverview} closeHandler={this.handleCloseClick} thingID={this.state.thingID} isSensor={this.state.isSensor} />
                </Row>
              </Container>
            </Router>
          </React.Fragment>
        </Suspense>
      </div>
    );
  }
}
export default App;
