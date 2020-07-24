import React, { Component } from 'react';
import styles from './Overview.module.css'
import Accordion from 'react-bootstrap/Accordion'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import request from '../../../../controller/Request'
import Thing from '../../../../model/Thing'
import DataCard from './DataCard'
import ShareField from './ShareField'
import Datastream from '../../../../model/Datastream'
import ObservedProperty from '../../../../model/ObservedProperty';
import * as observedPropertiesId from '../../../../../../resources/observedPropertyId.json'
import * as airQualityData from '../../../../../../resources/AirQualityData.json'
import Observation from '../../../../model/Observation';


/**
 * Displays all the Information on a Specifik Sensor or Location
 */
class SensorOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thingName: "",
      thingDescription: "",
      show: {
        airHumidity: false,
        airPressure: false,
        airTemperature: false,
        particulateMatter: false
      },
      value: {
        airHumidity: "",
        airPressure: "",
        airTemperature: "",
        particulateMatter: ""
      },
      unit: {
        airHumidity: airQualityData.humidity.unitOfMeasurement,
        airPressure: airQualityData.airPressure.unitOfMeasurement,
        airTemperature: airQualityData.temperature.unitOfMeasurement,
        particulateMatter: airQualityData.particulateMatter.unitOfMeasurement
      },
      diagram: {
        label: {
          airHumidity: [],
          airPressure: [],
          airTemperature: [],
          particulateMatter: []
        },
        data: {
          airHumidity: [],
          airPressure: [],
          airTemperature: [],
          particulateMatter: []
        }
      }
    };
  }

  componentDidMount() {
    this.update();
  }


  componentDidUpdate(prevProps) {
    if (prevProps.thingID != this.props.thingID) {
      this.update();
    }
  }

  update() {
    this.setState({
      show: {
        airHumidity: false,
        airPressure: false,
        airTemperature: false,
        particulateMatter: false
      }
    })
    var thing = request("/api/thing/id", true, {
      id: this.props.thingID
    }, Thing);
    console.log("Load");
    thing.then(thing => {
      this.setState({
        thingName: thing.name,
        thingDescription: thing.description
      });

      /* Humidity Datastream ####################################################################################### */
      var datastreams = request("/api/datastream/thing/observedProperty", true, {
        "thing": thing,
        "observedProperty": new ObservedProperty(airQualityData.humidity.observedProperty)
      }, Datastream);
      datastreams.then(datastream => {
        if (datastream != null) {
          this.setState(({ show }) => ({
            show: {
              ...show,
              airHumidity: true,
            },
          }));
        }
      });

      /* Temperature Datastream ####################################################################################### */
      var datastreams = request("/api/datastream/thing/observedProperty", true, {
        "thing": thing,
        "observedProperty": new ObservedProperty(airQualityData.temperature.observedProperty)
      }, Datastream);
      datastreams.then(datastream => {
        if (datastream != null) {
          this.setState(({ show }) => ({
            show: {
              ...show,
              airTemperature: true,
            }
          }));
        }
      });

      /* Air Pressure Datastream ####################################################################################### */
      var datastreams = request("/api/datastream/thing/observedProperty", true, {
        "thing": thing,
        "observedProperty": new ObservedProperty(airQualityData.airPressure.observedProperty)
      }, Datastream);
      datastreams.then(datastream => {
        if (datastream != null) {
          this.setState(({ show }) => ({
            show: {
              ...show,
              airPressure: true,
            }
          }));
        }
      });

      /* Particulate Matter Datastream ####################################################################################### */
      var datastreams = request("/api/datastream/thing/observedProperty", true, {
        "thing": thing,
        "observedProperty": new ObservedProperty(airQualityData.particulateMatter.observedProperty)
      }, Datastream);
      datastreams.then(datastream => {
        if (datastream != null) {
          this.setState(({ show }) => ({
            show: {
              ...show,
              particulateMatter: true,
            }
          }));
        }
      });







      this.setState({
        value: {
          airHumidity: "5",
          airPressure: "3",
          airTemperature: "1",
          particulateMatter: "8"
        },
        diagram: {
          label: {
            airHumidity: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            airPressure: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            airTemperature: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            particulateMatter: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
          },
          data: {
            airHumidity: [65, 59, 80, 81, 56, 55, 40],
            airPressure: [65, 59, 80, 81, 56, 55, 40],
            airTemperature: [65, 59, 80, 81, 56, 55, 40],
            particulateMatter: [65, 59, 80, 81, 56, 55, 40]
          }
        },
      });
    });
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
        <ShareField subject={t('shareTitle')} body={t('shareBody')} />
        <div className="network">&nbsp;</div>

        <Accordion className='accordion'>
          <DataCard
            show={this.state.show.airPressure}
            cardTitle={t('airPressure')}
            currentValue={this.state.value.airPressure}
            dataRowLabel={this.state.unit.airPressure}
            dataLabels={this.state.diagram.label.airPressure}
            data={this.state.diagram.data.airPressure}
            eventKey={1}
            className='datacard'
          />
          <DataCard
            show={this.state.show.airTemperature}
            cardTitle={t('airTemperature')}
            currentValue={this.state.value.airTemperature}
            dataRowLabel={this.state.unit.airTemperature}
            dataLabels={this.state.diagram.label.airTemperature}
            data={this.state.diagram.data.airTemperature}
            eventKey={2}
            className='datacard'
          />
          <DataCard
            show={this.state.show.airHumidity}
            cardTitle={t('airHumidity')}
            currentValue={this.state.value.airHumidity}
            dataRowLabel={this.state.unit.airHumidity}
            dataLabels={this.state.diagram.label.airHumidity}
            data={this.state.diagram.data.airHumidity}
            eventKey={3}
            className='datacard'
          />
          <DataCard
            show={this.state.show.particulateMatter}
            cardTitle={t('particulateMatter')}
            currentValue={this.state.value.particulateMatter}
            dataRowLabel={this.state.unit.particulateMatter}
            dataLabels={this.state.diagram.label.particulateMatter}
            data={this.state.diagram.data.particulateMatter}
            eventKey={4}
            className='datacard'
          />
        </Accordion>
      </>
    );
  }
}

const dynamicSensorOverview = withTranslation('overview')(SensorOverview)

export default dynamicSensorOverview;