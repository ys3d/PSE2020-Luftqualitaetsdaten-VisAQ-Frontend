import React, { createRef, Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import "./MapView.css";
import OverlayBuilder from './overlayfactory/OverlayBuilder';
import Legend from './elements/map/Legend';
import Request from "../controller/Request";
import Thing from "../model/Thing";
import Observation from "../model/Observation";
import PointDatum from '../model/PointDatum';
import { withTranslation } from 'react-i18next';
import AirQualityData from './elements/airquality/AirQualityData';
import Searchbar from './elements/map/Searchbar';
import Theme from '../view/elements/theme/Theme';
import Cookies from 'js-cookie';

/**
 * Class that contains the MapView.
 */
class MapView extends Component {
    /*with props its possible to initalize the map with different map properties*/
    constructor(props) {
        super(props);
        this.mapRef = createRef();
        this.startLocation = (this.formatLocation(Cookies.get('visaq_location')) || [ 48.3705449, 10.89779 ]);
        this.state = {
            time: this.props.time,
            zoom: 13,
            bounds: L.latLngBounds(L.latLng(48.29, 10.9), L.latLng(48.31, 10.8)),
            pointDataCells: {},
            cells: {},
            windowWidth: window.innerWidth
        };
        this.gridSize = 0.15;
    }

    setPosition() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.mapRef.current.leafletElement.setView([position.coords.latitude, position.coords.longitude], 13);
            this.onBoundsUpdate(this.state.bounds);
        }, () => {}, {
            enableHighAccuracy: false,
            timeout: 2000,
            maximumAge: Infinity,
        });
    }

    /**
     * Converts the String from the Cookies into a location.
     *
     * @param {String} location The location
     */
    formatLocation(location)    {
        if (location !== undefined) {
            var stringLatLng = location.split('/');
            return [parseFloat(stringLatLng[0]), parseFloat(stringLatLng[1])]
        } else {
            return false;
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
     * Requests all in bound cells.
     */
    componentDidUpdate() {
        this.requestInBoundCells();
        if (Cookies.get("visaq_allowcookies") === "true") {
            Cookies.set('visaq_location',
                this.mapRef.current.leafletElement.getCenter().lat + "/" + this.mapRef.current.leafletElement.getCenter().lng ,
                { expires: 365, sameSite: 'lax' });
        }
    }

    /**
     * Activates the Event Listener.
     */
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
        window.addEventListener('load', this.requestInBoundCells.bind(this));
        this.updateDimensions();
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
            Request.post("/api/thing/all/square", true, {
                "y1": lat,
                "x1": lng,
                "y2": lat + this.gridSize,
                "x2": lng + this.gridSize
            }, Thing).then(things => {
                if (things === null) {
                    this.setState({ cells: { ...this.state.cells, [`${time}|${airQualityData.name}|${lat}|${lng}`]: { things: things, observations: null } } });
                }
                else {
                    Request.post("/api/observation/all/things/timeframed", true, {
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
            Request.post("/api/interpolation/default", true, {
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
            }, () => {
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
                    center={this.startLocation}
                    zoom={this.state.zoom}
                    style={{ width: '100%', height: '100%' }}
                    boundsOptions={{ padding: [50, 50] }}
                    ref={this.mapRef}
                    onMoveEnd={this.onMove.bind(this)}
                    zoomControl={false}
                    key="custom-leaflet-map"
                >
                    {(Theme.getTheme() === Theme.Mode.light) &&
                        <TileLayer
                            attribution= '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    }

                    {(Theme.getTheme() === Theme.Mode.dark) &&
                        <TileLayer
                            attribution= '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                            url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
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

                    <Searchbar setPosition={() => this.setPosition()} />
                </Map>
            </div>
        );
    }
}

const dynamicMapView = withTranslation('common')(MapView);

export default dynamicMapView;
