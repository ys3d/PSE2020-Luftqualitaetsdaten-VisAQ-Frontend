import React, { createRef, Component } from 'react';
import { Map, TileLayer, withLeaflet } from 'react-leaflet';
import L from 'leaflet';
import "./MapView.css";
import OverlayBuilder from './overlayfactory/OverlayBuilder';
import Legend from './elements/map/Legend';
import request from "../controller/Request";
import Thing from "../model/Thing";
import Observation from "../model/Observation";
import ObservedProperty from "../model/ObservedProperty";
import { ReactLeafletSearch } from 'react-leaflet-search';
import { getInitialProps } from 'react-i18next';


/**
 * Class that contains the MapView.
 */
export default class MapView extends Component {
    /*with props its possible to initalize the map with different map properties*/
    constructor(props) {
        super(props);
        this.mapRef = createRef();
        this.state = {
            lat: 48.3705449,
            lng: 10.89779,
            zoom: 13,
            bounds: L.latLngBounds(L.latLng(48.29, 10.9), L.latLng(48.31, 10.8)),
            cells: {}
        };
        this.gridSize = 0.15;
        this.requestInBoundCells();
    }

    setPosition() {
        if (document.cookie.split(';').some((item) => item.trim().startsWith('Language='))) {
            navigator.geolocation.watchPosition((position) => {
                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }, () => {
                    this.onBoundsUpdate(this.state.bounds);
                });
            }, (error) => {
                this.setState({ lat: 48.3705449, lng: 10.89779 }, () => {
                    this.onBoundsUpdate(this.state.bounds);
                })
            })
        }
    }

    updateDimensions() {
        const height = window.innerWidth >= 992 ? window.innerHeight : 400;
        this.setState({ height: height });
      }

    componentWillMount() {
        this.setPosition();
        this.updateDimensions();
    }

    /**
     * Changes the airQualityData state of the component.
     *
     * @param {Object} airQ The AirQualityData
     */
    componentDidUpdate(prevProps) {
        if (this.props.airQ === prevProps.airQ) {
            return;
        }

        this.requestInBoundCells();

        if (document.cookie.split(';').some((item) => item.trim().startsWith('Language='))) {
            document.cookie = 'AirQuality=' + JSON.stringify(this.props.airQ);
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this))
    }

    requestCell(airQualityData, lat, lng) {
        if (this.state.cells.hasOwnProperty(`${airQualityData.name}|${lat}|${lng}`) || this.state.cells[`${airQualityData.name}|${lat}|${lng}`] != undefined) {
            return;
        }

        request("/api/thing/all/square", true, {
            "y1": lat,
            "x1": lng,
            "y2": lat + this.gridSize,
            "x2": lng + this.gridSize
        }, Thing).then(things => {
            request("/api/observation/all/things/timeframed", true, {
                "things": things,
                "millis": Date.now(),
                "range": "PT12H",
                "observedProperty": airQualityData.observedProperty
            }, Observation).then(observations => {
                this.setState({ cells: { ...this.state.cells, [`${airQualityData.name}|${lat}|${lng}`]: { things: things, observations: observations } } });
            }, error => {
                this.setState({ cells: { ...this.state.cells, [`${airQualityData.name}|${lat}|${lng}`]: undefined } });
            });
        }, error => {
            delete this.state.cells[`${airQualityData.name}|${lat}|${lng}`];
        });
        this.state.cells[`${airQualityData.name}|${lat}|${lng}`] = null;
    }

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
                    this.requestCell(this.props.airQ, (southCell + y) * this.gridSize, (westCell + x) * this.gridSize);
                }
            }
        }
    }

    onBoundsUpdate(newBounds) {
        this.setState({ bounds: newBounds }, () => {
            this.requestInBoundCells();
        });
    }

    onMove(event) {
        this.onBoundsUpdate(event.target.getBounds());
    }

    render() {
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
                    <OverlayBuilder mapState={this.state} airQualityData={this.props.airQ} gridSize={this.gridSize} openHandler={(e) => this.props.openHandler(e)}/>
                    <Legend airQ={this.props.airQ} className='legend' id='legend'
                    />
                    <ReactLeafletSearchComponent
                        className="custom-style"
                        position="topleft"
                        provider="OpenStreetMap"
                        providerOptions={{ region: "de" }}
                        inputPlaceholder="Search"
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
