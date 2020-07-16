import React, { Component } from 'react';
import styles from './Overview.module.css'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Diagram from '../../diagram/Diagram'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import request from '../../../../controller/Request'
import Thing from '../../../../model/Thing'


/**
 * Displays all the Information on a Specifik Sensor or Location
 */
class SensorOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thingName: "",
      thingDescription: ""
    };
  }

  componentDidMount() {
    var thing = request("/api/thing/id", true, {
      id: this.props.thingID
    }, Thing);
    console.log("Load");
    thing.then(thing => {
      this.setState({
        thingName: thing.name,
        thingDescription: thing.description
      });
    });
  }


  componentDidUpdate(prevProps) {
    if (prevProps.thingID != this.props.thingID) {
      var thing = request("/api/thing/id", true, {
        id: this.props.thingID
      }, Thing);
      console.log("Load");
      thing.then(thing => {
        this.setState({
          thingName: thing.name,
          thingDescription: thing.description
        });
      });
    }
  }

  render() {
    const { t } = this.props;

    return (
      <>
        <p>{this.props.thingID}</p>
        <h1>
          {t('sensor')} {this.state.thingName}
        </h1>
        <p>
          {t('description')} {this.state.thingDescription}
        </p>

        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                {t('airPressure')}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <p>{t('currently')}: 1000hPa</p>
                <Diagram
                  title={t('historicalDevelopment')}
                  dataRowLabel={"hPa"}
                  dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
                  data={[65, 59, 80, 81, 56, 55, 40]}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                {t('airTemperature')}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <p>{t('currently')}: 30°C</p>
                <Diagram
                  title={t('historicalDevelopment')}
                  dataRowLabel={"°C"}
                  dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
                  data={[65, 59, 80, 81, 56, 55, 40]}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                {t('airHumidity')}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <p>{t('currently')}: 17%</p>
                <Diagram
                  title={t('historicalDevelopment')}
                  dataRowLabel={"%"}
                  dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
                  data={[65, 59, 80, 81, 56, 55, 40]}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Card.Header} eventKey="3">
                {t('particulateMatter')}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                <p>{t('currently')}: 150ppm</p>
                <Diagram
                  title={t('historicalDevelopment')}
                  dataRowLabel={"ppm"}
                  dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
                  data={[65, 59, 80, 81, 56, 55, 40]}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </>
    );
  }
}

const dynamicSensorOverview = withTranslation('overview')(SensorOverview)

export default dynamicSensorOverview;