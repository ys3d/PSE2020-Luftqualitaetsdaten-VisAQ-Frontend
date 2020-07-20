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
        airHumidity: "",
        airPressure: "",
        airTemperature: "",
        particulateMatter: ""
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
    thing.then(gotthing => {
      this.setState({
        thingName: gotthing.name,
        thingDescription: gotthing.description
      });
      var datastreams = request("http://localhost:8081/api/datastream/all/thing", false, {
        thing: gotthing
      }, Thing);
      this.setState({
        value: {
          airHumidity: "5",
          airPressure: "3",
          airTemperature: "1",
          particulateMatter: "8"
        },
        unit: {
          airHumidity: "%",
          airPressure: "hPa",
          airTemperature: "°C",
          particulateMatter: "ppm"
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
        show: {
          airHumidity: true,
          airPressure: true,
          airTemperature: true,
          particulateMatter: true
        }
      });
    });
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
            show={this.state.show.airPressure}
            cardTitle={t('airPressure')}
            currentValue={this.state.value.airPressure}
            dataRowLabel={this.state.unit.airPressure}
            dataLabels={this.state.diagram.label.airPressure}
            data={this.state.diagram.data.airPressure}
            eventKey={1}
          />
          <DataCard
            show={this.state.show.airTemperature}
            cardTitle={t('airTemperature')}
            currentValue={this.state.value.airTemperature}
            dataRowLabel={this.state.unit.airTemperature}
            dataLabels={this.state.diagram.label.airTemperature}
            data={this.state.diagram.data.airTemperature}
            eventKey={2}
          />
          <DataCard
            show={this.state.show.airHumidity}
            cardTitle={t('airHumidity')}
            currentValue={this.state.value.airHumidity}
            dataRowLabel={this.state.unit.airHumidity}
            dataLabels={this.state.diagram.label.airHumidity}
            data={this.state.diagram.data.airHumidity}
            eventKey={3}
          />
          <DataCard
            show={this.state.show.particulateMatter}
            cardTitle={t('particulateMatter')}
            currentValue={this.state.value.particulateMatter}
            dataRowLabel={this.state.unit.particulateMatter}
            dataLabels={this.state.diagram.label.particulateMatter}
            data={this.state.diagram.data.particulateMatter}
            eventKey={4}
          />
        </Accordion>
      </>
    );
  }
}

const dynamicSensorOverview = withTranslation('overview')(SensorOverview)

export default dynamicSensorOverview;