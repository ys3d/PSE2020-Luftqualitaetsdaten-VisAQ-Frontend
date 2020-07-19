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

  getConsequencesAirQuality(data) {
    if (data >= 1100) {
      return 'overpressure'
    } else if (data < 1000) {
      return 'underpressure'
    }
    return 'normalPressure'
  }

  getConsequencesTemperature(data) {
    if (data >= 37) {
      return 'heat'
    } else if (data < -5) {
      return 'cold'
    }
    return 'normalTemperature'
  }

  getConsequencesHumidity(data) {
    if (data >= 60) {
      return 'wettness'
    } else if (data < 30) {
      return 'dry'
    }
    return 'normalHumidity'
  }
  
  getConsequencesPM(data) {
    if (data >= 1100) {
      return 'overpressure'
    } else if (data < 1000) {
      return 'underpressure'
    }
    return 'normalPM'
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
            consequences = {t(this.getConsequencesAirQuality(this.currentValue))}
            dataRowLabel="hPa"
            dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            data={[65, 59, 80, 81, 56, 55, 40]}
            eventKey={1}
          />
          <DataCard
            cardTitle={t('airTemperature')}
            currentValue="30°C"
            consequences = {t(this.getConsequencesTemperature(this.currentValue))}
            dataRowLabel="°C"
            dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            data={[65, 59, 80, 81, 56, 55, 40]}
            eventKey={2}
          />
          <DataCard
            cardTitle={t('airHumidity')}
            currentValue="17%"
            consequences = {t(this.getConsequencesHumidity(this.currentValue))}
            dataRowLabel="%"
            dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            data={[65, 59, 80, 81, 56, 55, 40]}
            eventKey={3}
          />
          <DataCard
            cardTitle={t('particulateMatter')}
            currentValue="155ppm"
            consequences = {t(this.getConsequencesPM(this.currentValue))}
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