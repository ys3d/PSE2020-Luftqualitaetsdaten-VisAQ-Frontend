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
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    
    this.handleShowSensorClick = this.handleShowSensorClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleShowPointClick = this.handleShowPointClick.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.outerWidth, height: window.innerHeight });
  }


  handleShowSensorClick(toSetThingID) {
    this.setState({
      showOverview: true,
      thingID: toSetThingID,
      isSensor: true
    });
  }
  handleShowPointClick(interpolatedValue) {
    this.setState({
      showOverview: true,
      interpolatedValue: interpolatedValue,
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
    document.body.style.overflow = "hidden"
    return (
      <div id='app' className="app">
        <Suspense fallback='loading'>
          <React.Fragment>
            <Router>
              <Container fluid>
                <Row className='row'>
                  <Col id="map-content">
                    <Navigationbar openHandler={(e) => this.handleShowSensorClick(e)} iopenHandler={(e) => this.handleShowPointClick(e)}/>
                  </Col>
                  <Overview 
                    show={this.state.showOverview}
                    closeHandler={this.handleCloseClick}
                    thingID={this.state.thingID}
                    isSensor={this.state.isSensor} 
                    id='map'
                    className='map'
                  />
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
