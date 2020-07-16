import React, { Component } from 'react';
import styles from './Overview.module.css'
import Accordion from 'react-bootstrap/Accordion'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import request from '../../../../controller/Request'
import Thing from '../../../../model/Thing'
import DataCard from './DataCard'


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
          <DataCard
            cardTitle={t('airPressure')}
            currentValue="1000hPa"
            dataRowLabel="hPa"
            dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            data={[65, 59, 80, 81, 56, 55, 40]}
            eventKey={1}
          />
          <DataCard
            cardTitle={t('airTemperature')}
            currentValue="30°C"
            dataRowLabel="°C"
            dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            data={[65, 59, 80, 81, 56, 55, 40]}
            eventKey={2}
          />
          <DataCard
            cardTitle={t('airHumidity')}
            currentValue="17%"
            dataRowLabel="%"
            dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            data={[65, 59, 80, 81, 56, 55, 40]}
            eventKey={3}
          />
          <DataCard
            cardTitle={t('particulateMatter')}
            currentValue="155ppm"
            dataRowLabel="ppm"
            dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            data={[65, 59, 80, 81, 56, 55, 40]}
            eventKey={4}
          />
        </Accordion>
      </>
    );
  }
}

const dynamicSensorOverview = withTranslation('overview')(SensorOverview)

export default dynamicSensorOverview;