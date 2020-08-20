import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import { withTranslation } from 'react-i18next';
import request from '../../../../controller/Request';
import Thing from '../../../../model/Thing';
import DataCard from './DataCard';
import ShareField from './ShareField';
import Datastream from '../../../../model/Datastream';
import ObservedProperty from '../../../../model/ObservedProperty';
import * as airQualityData from '../../../../../../resources/AirQualityData.json'
import Observation from '../../../../model/Observation';
import './OverviewContainer.css'
import Help from '../../../Help';
import { Nav } from 'react-bootstrap';

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

    /**
     * Starts the SensorOverview.
     */
    componentDidMount() {
        this.update();
    }

    /**
     * Opens a new Sensor Overview.
     *
     * @param {Object} prevProps  Contains the ThingId.
     */
    componentDidUpdate(prevProps) {
        if (prevProps.thingId !== this.props.thingId) {
            this.update();
        }
    }

    /**
     * Updates the Sensor Overview.
     */
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
            id: this.props.thingId
        }, Thing);
        thing.then(thing => {
            this.setState({
                thingName: thing.name,
                thingDescription: thing.description
            });
            /* Humidity Datastream ####################################################################################### */
            let humidityDatastream = request("/api/datastream/thing/observedProperty", true, {
                "thing": thing,
                "observedProperty": new ObservedProperty(airQualityData.humidity.observedProperty)
            }, Datastream);
            humidityDatastream.then(datastream => {
                if (datastream != null) {
                    this.setState(({ show }) => ({
                        show: {
                            ...show,
                            airHumidity: true,
                        },
                    }));
                    var newestObservations = request("/api/observation/all/newest", true, {
                        "datastreamId": datastream.id,
                        "topNumber": 20
                    }, Observation);
                    newestObservations.then(newest => {
                        this.setState(({ value }) => ({
                            value: {
                                ...value,
                                airHumidity: newest[0].result,
                            },
                        }));
                        let adding_list_data = [];
                        let adding_list_label = [];
                        newest.forEach((element) => {
                            adding_list_data.unshift(element.result);
                            adding_list_label.unshift(formatDate(element.phenomenonTime));
                        });
                        this.setState(({ diagram }) => ({
                            diagram: {
                                data: {
                                    ...diagram.data,
                                    airHumidity: adding_list_data
                                },
                                label: {
                                    ...diagram.label,
                                    airHumidity: adding_list_label
                                }
                            },
                        }));
                    });
                }
            });

            /* Temperature Datastream ####################################################################################### */
            let temperatureDatastream = request("/api/datastream/thing/observedProperty", true, {
                "thing": thing,
                "observedProperty": new ObservedProperty(airQualityData.temperature.observedProperty)
            }, Datastream);
            temperatureDatastream.then(datastream => {
                if (datastream != null) {
                    this.setState(({ show }) => ({
                        show: {
                            ...show,
                            airTemperature: true,
                        }
                    }));
                    var newestObservations = request("/api/observation/all/newest", true, {
                        "datastreamId": datastream.id,
                        "topNumber": 20
                    }, Observation);
                    newestObservations.then(newest => {
                        this.setState(({ value }) => ({
                            value: {
                                ...value,
                                airTemperature: newest[0].result,
                            },
                        }));

                        let adding_list_data = [];
                        let adding_list_label = [];
                        newest.forEach((element) => {
                            adding_list_data.unshift(element.result);
                            adding_list_label.unshift(formatDate(element.phenomenonTime));
                        });
                        this.setState(({ diagram }) => ({
                            diagram: {
                                data: {
                                    ...diagram.data,
                                    airTemperature: adding_list_data
                                },
                                label: {
                                    ...diagram.label,
                                    airTemperature: adding_list_label
                                }
                            },
                        }));
                    });
                }
            });

            /* Air Pressure Datastream ####################################################################################### */
            let airPressureDatastream = request("/api/datastream/thing/observedProperty", true, {
                "thing": thing,
                "observedProperty": new ObservedProperty(airQualityData.airPressure.observedProperty)
            }, Datastream);
            airPressureDatastream.then(datastream => {
                if (datastream != null) {
                    this.setState(({ show }) => ({
                        show: {
                            ...show,
                            airPressure: true,
                        }
                    }));
                    var newestObservations = request("/api/observation/all/newest", true, {
                        "datastreamId": datastream.id,
                        "topNumber": 20
                    }, Observation);
                    newestObservations.then(newest => {
                        this.setState(({ value }) => ({
                            value: {
                                ...value,
                                airPressure: newest[0].result,
                            },
                        }));

                        let adding_list_data = [];
                        let adding_list_label = [];
                        newest.forEach((element) => {
                            adding_list_data.unshift(element.result);
                            adding_list_label.unshift(formatDate(element.phenomenonTime));
                        });
                        this.setState(({ diagram }) => ({
                            diagram: {
                                data: {
                                    ...diagram.data,
                                    airPressure: adding_list_data
                                },
                                label: {
                                    ...diagram.label,
                                    airPressure: adding_list_label
                                }
                            },
                        }));
                    });
                }
            });

            /* Particulate Matter Datastream ####################################################################################### */
            let particulateMatterDatastream = request("/api/datastream/thing/observedProperty", true, {
                "thing": thing,
                "observedProperty": new ObservedProperty(airQualityData.particulateMatter.observedProperty)
            }, Datastream);
            particulateMatterDatastream.then(datastream => {
                if (datastream != null) {
                    this.setState(({ show }) => ({
                        show: {
                            ...show,
                            particulateMatter: true,
                        }
                    }));
                    var newestObservations = request("/api/observation/all/newest", true, {
                        "datastreamId": datastream.id,
                        "topNumber": 20
                    }, Observation);
                    newestObservations.then(newest => {
                        this.setState(({ value }) => ({
                            value: {
                                ...value,
                                particulateMatter: newest[0].result,
                            },
                        }));

                        let adding_list_data = [];
                        let adding_list_label = [];
                        newest.forEach((element) => {
                            adding_list_data.unshift(element.result);
                            adding_list_label.unshift(formatDate(element.phenomenonTime));
                        });
                        this.setState(({ diagram }) => ({
                            diagram: {
                                data: {
                                    ...diagram.data,
                                    particulateMatter: adding_list_data
                                },
                                label: {
                                    ...diagram.label,
                                    particulateMatter: adding_list_label
                                }
                            },
                        }));
                    });
                }
            });
        });
    }

    /**
     * Renders the SensorOverview.
     */
    render() {
        const { t } = this.props;

        return (
            <>
                <h1>
                    {t('sensor')} {this.state.thingName}
                </h1>
                {this.props.expert &&
                    <p>
                        {Number(this.props.squareCenter[1]).toFixed(4)}°N {Number(this.props.squareCenter[0]).toFixed(4)}°E <br />
                        {t('description')} {this.state.thingDescription}
                    </p>
                }
                <Nav.Link
                    className='help'
                    id='help'
                    draggable="false"
                >
                    <Help helpText={t('helpSensor')} />
                </Nav.Link>
                <ShareField subject={t('shareTitle')} body={t('shareBody')} />
                <div className="network">&nbsp;</div>

                <Accordion className='accordion'>
                    <DataCard
                        show={this.state.show.airPressure}
                        cardTitle={t('airPressure')}
                        currentValue={this.state.value.airPressure}
                        dataUnit={this.state.unit.airPressure}
                        dataLabels={this.state.diagram.label.airPressure}
                        data={this.state.diagram.data.airPressure}
                        eventKey={1}
                        className='datacard'
                        isActice={false}
                    />
                    <DataCard
                        show={this.state.show.airTemperature}
                        cardTitle={t('airTemperature')}
                        currentValue={this.state.value.airTemperature}
                        dataUnit={this.state.unit.airTemperature}
                        dataLabels={this.state.diagram.label.airTemperature}
                        data={this.state.diagram.data.airTemperature}
                        eventKey={2}
                        className='datacard'
                        isActice={false}
                    />
                    <DataCard
                        show={this.state.show.airHumidity}
                        cardTitle={t('airHumidity')}
                        currentValue={this.state.value.airHumidity}
                        dataUnit={this.state.unit.airHumidity}
                        dataLabels={this.state.diagram.label.airHumidity}
                        data={this.state.diagram.data.airHumidity}
                        eventKey={3}
                        className='datacard'
                        isActice={false}
                    />
                    <DataCard
                        show={this.state.show.particulateMatter}
                        cardTitle={t('particulateMatter')}
                        currentValue={this.state.value.particulateMatter}
                        dataUnit={this.state.unit.particulateMatter}
                        dataLabels={this.state.diagram.label.particulateMatter}
                        data={this.state.diagram.data.particulateMatter}
                        eventKey={4}
                        className='datacard'
                        isActice={false}
                    />
                </Accordion>
            </>
        );
    }
}

const dynamicSensorOverview = withTranslation('overview')(SensorOverview)

export default dynamicSensorOverview;

/**
 * Formats the Date.
 *
 * @param {Number} dateIS8601   The date
 */
function formatDate(dateIS8601) {
    var d = new Date(dateIS8601);
    var options = { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return d.toLocaleString('de-DE', options);
}
