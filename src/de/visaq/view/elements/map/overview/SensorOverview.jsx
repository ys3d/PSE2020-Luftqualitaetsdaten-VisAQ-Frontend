import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import { withTranslation } from 'react-i18next';
import request from '../../../../controller/Request';
import Thing from '../../../../model/Thing';
import DataCard from './DataCard';
import ShareField from './ShareField';
import Datastream from '../../../../model/Datastream';
import ObservedProperty from '../../../../model/ObservedProperty';
import * as airQualityDataJson from '../../../../../../resources/AirQualityData.json';
import Observation from '../../../../model/Observation';
import './Overview.css';
import Help from '../../../Help';
import { Nav } from 'react-bootstrap';
import AirQualityData from '../../airquality/AirQualityData';

/**
 * Displays all the information about a specific sensor or location
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
                airHumidity: airQualityDataJson.humidity.unitOfMeasurement,
                airPressure: airQualityDataJson.airPressure.unitOfMeasurement,
                airTemperature: airQualityDataJson.temperature.unitOfMeasurement,
                particulateMatter: airQualityDataJson.particulateMatter.unitOfMeasurement
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
                "observedProperty": new ObservedProperty(airQualityDataJson.humidity.observedProperty)
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
                        let addingListData = [];
                        let addingListLabel = [];
                        newest.forEach((element) => {
                            addingListData.unshift(element.result);
                            addingListLabel.unshift(formatDate(element.phenomenonTime));
                        });
                        this.setState(({ diagram }) => ({
                            diagram: {
                                data: {
                                    ...diagram.data,
                                    airHumidity: addingListData
                                },
                                label: {
                                    ...diagram.label,
                                    airHumidity: addingListLabel
                                }
                            },
                        }));
                    });
                }
            });

            /* Temperature Datastream ####################################################################################### */
            let temperatureDatastream = request("/api/datastream/thing/observedProperty", true, {
                "thing": thing,
                "observedProperty": new ObservedProperty(airQualityDataJson.temperature.observedProperty)
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

                        let addingListData = [];
                        let addingListLabel = [];
                        newest.forEach((element) => {
                            addingListData.unshift(element.result);
                            addingListLabel.unshift(formatDate(element.phenomenonTime));
                        });
                        this.setState(({ diagram }) => ({
                            diagram: {
                                data: {
                                    ...diagram.data,
                                    airTemperature: addingListData
                                },
                                label: {
                                    ...diagram.label,
                                    airTemperature: addingListLabel
                                }
                            },
                        }));
                    });
                }
            });

            /* Air Pressure Datastream ####################################################################################### */
            let airPressureDatastream = request("/api/datastream/thing/observedProperty", true, {
                "thing": thing,
                "observedProperty": new ObservedProperty(airQualityDataJson.airPressure.observedProperty)
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

                        let addingListData = [];
                        let addingListLabel = [];
                        newest.forEach((element) => {
                            addingListData.unshift(element.result);
                            addingListLabel.unshift(formatDate(element.phenomenonTime));
                        });
                        this.setState(({ diagram }) => ({
                            diagram: {
                                data: {
                                    ...diagram.data,
                                    airPressure: addingListData
                                },
                                label: {
                                    ...diagram.label,
                                    airPressure: addingListLabel
                                }
                            },
                        }));
                    });
                }
            });

            /* Particulate Matter Datastream ####################################################################################### */
            let particulateMatterDatastream = request("/api/datastream/thing/observedProperty", true, {
                "thing": thing,
                "observedProperty": new ObservedProperty(airQualityDataJson.particulateMatter.observedProperty)
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

                        let addingListData = [];
                        let addingListLabel = [];
                        newest.forEach((element) => {
                            addingListData.unshift(element.result);
                            addingListLabel.unshift(formatDate(element.phenomenonTime));
                        });
                        this.setState(({ diagram }) => ({
                            diagram: {
                                data: {
                                    ...diagram.data,
                                    particulateMatter: addingListData
                                },
                                label: {
                                    ...diagram.label,
                                    particulateMatter: addingListLabel
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
        let airQualityData = AirQualityData.getInstance();

        switch(airQualityData.name) {
            case airQualityDataJson.airPressure.name:
                this.defaultKey = 0;
                break;
            case airQualityDataJson.temperature.name:
                this.defaultKey = 1;
                break;
            case airQualityDataJson.humidity.name:
                this.defaultKey = 2;
                break;
            case airQualityDataJson.particulateMatter.name:
                this.defaultKey = 3;
                break;
            default:
                this.defaultKey = 0;
        }

        return (
            <>
                <h5>
                    {t('sensor')} {this.state.thingName}
                </h5>
                {this.props.expert &&
                    <p className='expert'>
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

                <Accordion className='accordion' defaultActiveKey={"" + (this.defaultKey || 0)}>
                    <DataCard
                        show={this.state.show.airPressure}
                        cardTitle={t('airPressure')}
                        currentValue={this.state.value.airPressure}
                        dataUnit={this.state.unit.airPressure}
                        dataLabels={this.state.diagram.label.airPressure}
                        data={this.state.diagram.data.airPressure}
                        eventKey={0}
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
                        eventKey={1}
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
                        eventKey={2}
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
                        eventKey={3}
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
