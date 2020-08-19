import React, { createRef, Component } from 'react';
import { Map, TileLayer, withLeaflet} from 'react-leaflet';
import L from 'leaflet';
import "./MapView.css";
import OverlayBuilder from './overlayfactory/OverlayBuilder';
import Legend from './elements/map/Legend';
import request from "../controller/Request";
import Thing from "../model/Thing";
import Observation from "../model/Observation";
import PointDatum from '../model/PointDatum';
import { ReactLeafletSearch } from 'react-leaflet-search';
import { withTranslation } from 'react-i18next';


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
            cells: {}
        };
        this.gridSize = 0.15;
        this.requestInBoundCells();
    }

    /**
     * Centers the map on the user's position if the Cookie was accepted.
     * Otherwise the map centers on Augsburg.
     */
    setPosition() {
        if(!this.state.hasLoaded) {
            if (document.cookie.split(';').some((item) => item.trim().startsWith('Language='))) {
                navigator.geolocation.watchPosition((position) => {
                    this.setState({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        hasLoaded: true,
                    }, () => {
                        this.onBoundsUpdate(this.state.bounds);
                    });
                }, (error) => {
                    this.setState({ lat: 48.3705449, lng: 10.89779 }, () => {
                        this.onBoundsUpdate(this.state.bounds);
                    })
                })
            }
        } else {
            this.setState({hasLoaded: true});
        }
    }

    /**
     * Sets the height according to the window height.
     */
    updateDimensions() {
        const height = window.innerWidth >= 992 ? window.innerHeight : 400;
        this.setState({ height: height });
      }

    /**
     * Starts the proccesses setPosition and updateDimensions when the component is mounted.
     */
    componentWillMount() {
        this.updateDimensions();
    }

    /**
     * Changes the airQualityData state of the component.
     *
     * @param {Object} airQ The AirQualityData
     */
    componentDidUpdate(prevProps) {
        if (this.props.airQ === prevProps.airQ 
            && this.props.time === prevProps.time) {
            return;
        }
        this.requestInBoundCells();
    }

    /**
     * Activates the Event Listener.
     */
    componentDidMount() {
        this.setPosition();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    /**
     * Removes the Event Listener.
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this))
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
        console.log("request");
        console.log(time);
        request("/api/thing/all/square", true, {
            "y1": lat,
            "x1": lng,
            "y2": lat + this.gridSize,
            "x2": lng + this.gridSize
        }, Thing).then(things => {
            request("/api/observation/all/things/timeframed", true, {
                "things": things,
                "millis": time,
                "range": "PT2H",
                "observedProperty": airQualityData.observedProperty
            }, Observation).then(observations => {
                this.setState({ cells: { ...this.state.cells, [`${time}|${airQualityData.name}|${lat}|${lng}`]: { things: things, observations: observations } } });
            }, error => {
                this.setState({ cells: { ...this.state.cells, [`${time}|${airQualityData.name}|${lat}|${lng}`]: undefined } });
            });
        }, error => {
            delete this.state.cells[`${time}|${airQualityData.name}|${lat}|${lng}`];
        });
        this.state.cells[`${time}|${airQualityData.name}|${lat}|${lng}`] = null;
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
        console.log("requestIP");
        console.log(time);
        request("/api/interpolation/nearestNeighbor", true, {
            "y1": lat,
            "x1": lng,
            "y2": lat + this.gridSize,
            "x2": lng + this.gridSize,
            "millis": time,
            "range": "PT2H",
            "observedProperty": this.props.airQ.observedProperty
        }, PointDatum).then(pointDatum => {
            this.setState({ pointDataCells: { ...this.state.pointDataCells, [`${time}|${airQualityData.name}|${lat}|${lng}`]: { pointData: pointDatum} } });
            }, error => {
                delete this.state.pointDataCells[`${time}|${airQualityData.name}|${lat}|${lng}`];
            });
            this.state.pointDataCells[`${time}|${airQualityData.name}|${lat}|${lng}`] = null;     
    }
    
    /**
     * Transforms the map bounds into uniform cells and requests the data for these cells.
     */
    requestInBoundCells() {
        var southWest = this.state.bounds.getSouthWest();
        var southCell = Math.floor(southWest.lat/this.gridSize);
        var westCell = Math.floor(southWest.lng/this.gridSize);

        var northEast = this.state.bounds.getNorthEast();
        var northCell = Math.floor(northEast.lat/this.gridSize);
        var eastCell = Math.floor(northEast.lng/this.gridSize);

        var xCells = eastCell - westCell;
        var yCells = northCell - southCell;

        if (yCells < 5 && xCells < 5) {
            for (var y = 0; y <= yCells; y++) {
                for (var x = 0; x <= xCells; x++) {
                    this.requestCell(this.props.time, this.props.airQ, (southCell + y) * this.gridSize, (westCell + x) * this.gridSize);
                    this.requestInterpolation(this.props.time, this.props.airQ, (southCell + y) * this.gridSize, (westCell + x) * this.gridSize)
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
        const { t } = this.props;
        const ReactLeafletSearchComponent = withLeaflet(ReactLeafletSearch)
        return (
            <div className="map-container" style={{ height: this.state.height }}>
                <Map
                    center={[this.state.lat, this.state.lng]}
                    zoom={this.state.zoom}
                    style={{ width: '100%', height: '100vh' }}
                    boundsOptions={{ padding: [50, 50] }}
                    ref={this.mapRef}
                    onMoveEnd={this.onMove.bind(this)}
                    zoomControl={false}

                >
                    <TileLayer
                        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <OverlayBuilder 
                        mapState={this.state} 
                        airQualityData={this.props.airQ}
                        time={this.props.time} 
                        gridSize={this.gridSize} 
                        openHandler={(e) => this.props.openHandler(e)} 
                        iopenHandler={(e, a) => this.props.iopenHandler(e, a)}
                        overlays={this.props.overlays}
                    />
                    <Legend airQ={this.props.airQ} className='legend' id='legend'
                    />
                    
                    <ReactLeafletSearchComponent
                        className="search-control"
                        position="topleft"
                        provider="OpenStreetMap"
                        providerOptions={{ region: "de" }}
                        inputPlaceholder={t('search')}
                        zoom={12}
                        showMarker={false}
                        showPopUp={false}
                        closeResultsOnClick={true}
                        openSearchOnLoad={true}
                    />
                </Map>
            </div>
        );
    }
}

const dynamicMapView = withTranslation('common')(MapView)

export default dynamicMapView
