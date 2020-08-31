import React, { createRef, Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import "./MapView.css";
import OverlayBuilder from './overlayfactory/OverlayBuilder';
import Legend from './elements/map/Legend';
import request from "../controller/Request";
import Thing from "../model/Thing";
import Observation from "../model/Observation";
import PointDatum from '../model/PointDatum';
import { withTranslation } from 'react-i18next';
import AirQualityData from './elements/airquality/AirQualityData';
import Searchbar from './elements/map/Searchbar';
import i18n from './Language';
import ThemeEnum from '../view/elements/theme/ThemeEnum';
import Theme from '../view/elements/theme/Theme';

/**
 * Class that contains the MapView.
 */
class MapView extends Component {
    /*with props its possible to initalize the map with different map properties*/
    constructor(props) {
        super(props);
        this.mapRef = createRef();
        this.state = {
            lat: 48.3705449,
            lng: 10.89779,
            time: this.props.time,
            zoom: 13,
            bounds: L.latLngBounds(L.latLng(48.29, 10.9), L.latLng(48.31, 10.8)),
            hasLoaded: false,
            pointDataCells: {},
            cells: {},
            windowWidth: window.innerWidth
        };
        this.gridSize = 0.15;
    }

    /**
     * Centers the map on the user's position if the Cookie was accepted.
     * Otherwise the map centers on Augsburg.
     */
    setPosition() {
        if (!this.state.hasLoaded) {
            if (i18n.language) {
                navigator.geolocation.watchPosition((position) => {
                    this.setState({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        hasLoaded: true,
                    }, () => {
                        this.onBoundsUpdate(this.state.bounds);
                    });
                }, () => {
                    this.setState({ lat: 48.3705449, lng: 10.89779 }, () => {
                        this.onBoundsUpdate(this.state.bounds);
                    })
                })
            }
        } else {
            this.setState({ hasLoaded: true });
        }
    }

    /**
     * Sets the height according to the window height.
     */
    updateDimensions() {
        this.setState({
            windowWidth: window.innerWidth
        });
    }

    /**
     * Starts the proccesses setPosition and updateDimensions when the component is mounted.
     */
    componentWillMount() {
        this.updateDimensions();
    }

    /**
     * Requests all in bound cells.
     */
    componentDidUpdate(prevProps) {
        this.requestInBoundCells();
    }

    /**
     * Activates the Event Listener.
     */
    componentDidMount() {
        this.setPosition();
        window.addEventListener('load', this.requestInBoundCells.bind(this));
    }

    /**
     * Removes the Event Listener.
     */
    componentWillUnmount() {
        window.removeEventListener('load', this.requestInBoundCells.bind(this));
    }

    /**
     * Sends a request to the Backend.
     * The return value is an array of Things and an array of Observations.
     * These data is stored in cells.
     *
     * @param {String} time             The selected time
     * @param {Object} airQualityData   The current Air Quality Data
     * @param {Number} lat              The degree of longitude
     * @param {Number} lng              The degree of latitude
     */
    requestCell(time, airQualityData, lat, lng) {
        if (this.state.cells.hasOwnProperty(`${time}|${airQualityData.name}|${lat}|${lng}`) || this.state.cells[`${time}|${airQualityData.name}|${lat}|${lng}`] !== undefined) {
            return;
        }

        this.setState({ cells: { ...this.state.cells, [`${time}|${airQualityData.name}|${lat}|${lng}`]: null } }, () => {
            request("/api/thing/all/square", true, {
                "y1": lat,
                "x1": lng,
                "y2": lat + this.gridSize,
                "x2": lng + this.gridSize
            }, Thing).then(things => {
                if (things === null) {
                    this.setState({ cells: { ...this.state.cells, [`${time}|${airQualityData.name}|${lat}|${lng}`]: { things: things, observations: null } } });
                }
                else {
                    request("/api/observation/all/things/timeframed", true, {
                        "things": things,
                        "millis": time,
                        "range": "PT2H",
                        "observedProperty": airQualityData.observedProperty,
                        "average": airQualityData.average,
                        "variance": airQualityData.variance
                    }, Observation).then(observations => {
                        this.setState({ cells: { ...this.state.cells, [`${time}|${airQualityData.name}|${lat}|${lng}`]: { things: things, observations: observations } } });
                    }, () => {
                        this.setState({ cells: { ...this.state.cells, [`${time}|${airQualityData.name}|${lat}|${lng}`]: undefined } });
                    });
                }
            }, () => {
                delete this.state.cells[`${time}|${airQualityData.name}|${lat}|${lng}`];
            });
        });
    }

    /**
     * Sends a request to the Backend.
     * The return value is an array of pointDatum.
     *
     * @param {String} time             The selected time
     * @param {Object} airQualityData   The current Air Quality Data
     * @param {Number} lat              The degree of longitude
     * @param {Number} lng              The degree of latitude
     *
     */
    requestInterpolation(time, airQualityData, lat, lng) {
        if (this.state.pointDataCells.hasOwnProperty(`${time}|${airQualityData.name}|${lat}|${lng}`)
            || this.state.pointDataCells[`${time}|${airQualityData.name}|${lat}|${lng}`] !== undefined) {
            return;
        }
        this.setState({ pointDataCells: { ...this.state.pointDataCells, [`${time}|${airQualityData.name}|${lat}|${lng}`]: null } }, () => {
            request("/api/interpolation/default", true, {
                "y1": lat,
                "x1": lng,
                "y2": lat + this.gridSize,
                "x2": lng + this.gridSize,
                "millis": time,
                "range": "PT2H",
                "observedProperty": airQualityData.observedProperty,
                "average": airQualityData.average,
                "variance": airQualityData.variance
            }, PointDatum).then(pointDatum => {
                this.setState({ pointDataCells: { ...this.state.pointDataCells, [`${time}|${airQualityData.name}|${lat}|${lng}`]: { pointData: pointDatum } } });
            }, error => {
                delete this.state.pointDataCells[`${time}|${airQualityData.name}|${lat}|${lng}`];
            });
        });
    }

    /**
     * Transforms the map bounds into uniform cells and requests the data for these cells.
     */
    requestInBoundCells() {
        var southWest = this.state.bounds.getSouthWest();
        var southCell = Math.floor(southWest.lat / this.gridSize);
        var westCell = Math.floor(southWest.lng / this.gridSize);

        var northEast = this.state.bounds.getNorthEast();
        var northCell = Math.floor(northEast.lat / this.gridSize);
        var eastCell = Math.floor(northEast.lng / this.gridSize);

        var xCells = eastCell - westCell;
        var yCells = northCell - southCell;

        let airQualityData = AirQualityData.getInstance();

        if (yCells < 5 && xCells < 5) {
            for (var y = 0; y <= yCells; y++) {
                for (var x = 0; x <= xCells; x++) {
                    this.requestCell(this.props.time, airQualityData, (southCell + y) * this.gridSize, (westCell + x) * this.gridSize);
                    this.requestInterpolation(this.props.time, airQualityData, (southCell + y) * this.gridSize, (westCell + x) * this.gridSize)
                }
            }
        }
    }

    /**
     * Sets the state of bounds with the new map bounds and request an Interpolation.
     *
     * @param {Object} newBounds The new map bounds
     */
    onBoundsUpdate(newBounds) {
        this.setState({ bounds: newBounds }, () => {
            this.requestInBoundCells();
        });
    }


    /**
     * Gives new map bounds to the method onBoundsUpdata.
     *
     * @param {Object} event The map's move event
     */
    onMove(event) {
        this.onBoundsUpdate(event.target.getBounds());
    }

    /**
     * Renders the map and all of its children.
     */
    render() {
        return (
            <div className="map-container" key="map-container">
                <Map
                    center={[this.state.lat, this.state.lng]}
                    zoom={this.state.zoom}
                    style={{ width: '100%', height: '100%' }}
                    boundsOptions={{ padding: [50, 50] }}
                    ref={this.mapRef}
                    onMoveEnd={this.onMove.bind(this)}
                    zoomControl={false}
                    key="custom-leaflet-map"
                >
                    {(Theme.getInstance().theme === ThemeEnum.light) &&
                        <TileLayer
                            attribution= '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    }
                    
                    {(Theme.getInstance().theme === ThemeEnum.dark) &&
                        <TileLayer
                            attribution= '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                            url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
                        />
                    }

                    <OverlayBuilder
                        mapState={this.state}
                        time={this.props.time}
                        gridSize={this.gridSize}
                        openHandler={(squareCenter, thingId) => this.props.openHandler(squareCenter, thingId)}
                        iOpenHandler={(squareCenter, interpolatedValue) => this.props.iOpenHandler(squareCenter, interpolatedValue)}
                        overlays={this.props.overlays}
                    />
                    
                    {(!this.props.isOverviewOpen || (this.state.windowWidth >= 576)) &&
                        <Legend
                            className='legend'
                            id='legend'
                        />
                    }

                    <Searchbar />
                </Map>
            </div>
        );
    }
}

const dynamicMapView = withTranslation('common')(MapView);

export default dynamicMapView;