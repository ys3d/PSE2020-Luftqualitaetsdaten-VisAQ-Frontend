import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigationbar from './de/visaq/view/elements/navbar/Navigationbar'
import { Container, Row, Col } from "react-bootstrap";
import './de/visaq/view/elements/theme/LightTheme.css'

import Overview from './de/visaq/view/elements/map/overview/OverviewContainer'

/**
 * The main class of the Project.
 */
class VisAQ extends Component {

  /**
   * Sole constructor of the class
   * 
   * @param {Object} props  The class properties
   */
  constructor(props) {
    super(props);
    this.state = {
      showOverview: false,
      thingID: "saqn:t:grimm-aerosol.com:EDM80NEPH:SN17017",
      isSensor: false,
      overviewDetails: false
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    
    this.handleShowSensorClick = this.handleShowSensorClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleShowPointClick = this.handleShowPointClick.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  /**
   * Stores the window size, activates an event listener.
   */
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  /**
   * Removes the event listener.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  /**
   * Updates the window when the screen size changes.
   */
  updateWindowDimensions() {
    this.setState({ width: window.outerWidth, height: window.innerHeight });
  }

  /**
   * Handels the click on a sensor.
   * 
   * @param {Object} toSetThingID   	 The thing id
   */
  handleShowSensorClick(toSetThingID) {
    this.setState({
      showOverview: true,
      thingID: toSetThingID,
      isSensor: true
    });
  }

  /**
   * Handels the click on a place.
   * 
   * @param {Object} interpolatedValue    The interpolated value
   */
  handleShowPointClick(interpolatedValue) {
    this.setState({
      showOverview: true,
      interpolatedValue: interpolatedValue,
      isSensor: false
    });
  }

  /**
   * Handels the closing of the SensorOverview.
   */
  handleCloseClick() {
    this.setState({
      showOverview: false,
      isSensor: false
    });
  }

  /**
   * Handels the SensorOverview.
   */
  toggleDetails() {
    this.setState({
      overviewDetails: !this.state.overviewDetails
    });
  }

  /**
   * Renders the Project.
   */
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
                    <Navigationbar openHandler={(e) => this.handleShowSensorClick(e)} overviewDetailHandler={() => this.toggleDetails()} 
                    iopenHandler={(e) => this.handleShowPointClick(e)}/>
                  </Col>
                  <Overview 
                    show={this.state.showOverview}
                    closeHandler={this.handleCloseClick}
                    thingID={this.state.thingID}
                    isSensor={this.state.isSensor}
                    showDetails={this.state.overviewDetails}
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
export default VisAQ;
