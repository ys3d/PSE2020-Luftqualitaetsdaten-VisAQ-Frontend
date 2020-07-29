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
import * as data from './overlayfactory/testPointDatum.json';
import { getInitialProps } from 'react-i18next';
import InterpolationOverlayFactory from './overlayfactory/InterpolationOverlayFactory';


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
            bounds: L.latLngBounds(L.latLng(48.31, 11.05), L.latLng(48.42, 10.741)),
            airQualityData: props.airQ,
            pointData : [],
            cells: {}
        };
        this.gridSize = 0.15;

    }

    setPosition() {
        if (document.cookie.split(';').some((item) => item.trim().startsWith('Language='))) {
            navigator.geolocation.watchPosition((position) => {
                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }, () => {
                    this.onBoundsUpdate(this.state.bounds);
                    this.requestInterpolation(this.state.bounds);
                });
            }, (error) => {
                this.setState({ lat: 48.3705449, lng: 10.89779 }, () => {
                    this.onBoundsUpdate(this.state.bounds);
                    this.requestInterpolation(this.state.bounds);
                })
            })
        }
    }

    updateDimensions() {
        const height = window.innerWidth >= 992 ? window.innerHeight : 400
        this.setState({ height: height })
      }


    componentWillMount() {
        this.setPosition();
        this.updateDimensions()
    }


    /**
     * Changes the airQualityData state of the component.
     *
     * @param {Object} airQ The AirQualityData
     */
    componentDidUpdate(airQ) {
        if (this.state.airQualityData == null && airQ.airQ == null) {
            return
        }
        if (this.state.airQualityData.name === airQ.airQ.name) {
            return;
        }
        this.setState({ airQualityData: airQ.airQ });
    
        if (document.cookie.split(';').some((item) => item.trim().startsWith('Language='))) {
            document.cookie = 'AirQuality=' + JSON.stringify(this.state.airQualityData);
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this))
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this))
    }

    requestCell(lat, lng) {
        if (this.state.cells.hasOwnProperty(`${lat}|${lng}`) || this.state.cells[`${lat}|${lng}`] != undefined) {
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
                "observedProperty": this.state.airQualityData.observedProperty
            }, Observation).then(observations => {
                this.setState({ cells: { ...this.state.cells, [`${lat}|${lng}`]: { things: things, observations: observations } } });
            }, error => {
                this.setState({ cells: { ...this.state.cells, [`${lat}|${lng}`]: undefined } });
            });
        }, error => {
            delete this.state.cells[`${lat}|${lng}`];
        });
        this.state.cells[`${lat}|${lng}`] = null;
        
    }
    
    /**
     * Sends a request to the Backend. 
     * The return value is an array of pointDatum.
     * 
     * @param {Object} newBounds  LatLng Bounds of the map
     */
    requestInterpolation(newBounds) {
        console.log(newBounds.getSouthWest().lng);
        console.log(newBounds.getNorthEast().lng);
        console.log(newBounds.getSouthWest().lat);
        console.log(newBounds.getNorthEast().lat);
        request("http://localhost:8080/api/interpolation/default", false, {
            "x1": newBounds.getSouthWest().lng,
            "x2": newBounds.getNorthEast().lng,
            "y1": newBounds.getSouthWest().lat,
            "y2": newBounds.getNorthEast().lat,
            "millis": Date.now(),
            "range": "PT12H",
            "observedProperty": this.state.airQualityData.observedProperty
        }, PointDatum).then(pointDatum => {
            console.log(pointDatum);
            this.setState({pointData : pointDatum});
            console.log(this.state.pointData);
        });       
    }
    

    onBoundsUpdate(newBounds) {

        /**
         * Requests a new Interpolation Overlay if the user leaves the viewport
         */
        if((newBounds.getSouthWest().lng > this.state.bounds.getSouthWest().lng)
            || (newBounds.getSouthWest().lat > this.state.bounds.getSouthWest().lat)
            || (newBounds.getNorthEast().lat > this.state.bounds.getNorthEast().lat)
            || (newBounds.getNorthEast().lng > this.state.bounds.getNorthEast().lng)) {
                this.requestInterpolation(newBounds);
            }

        this.setState({ bounds: newBounds }, () => {
            var southWest = newBounds.getSouthWest();
            var southCell = Math.floor(southWest.lat/this.gridSize);
            var westCell = Math.floor(southWest.lng/this.gridSize);

            var northEast = newBounds.getNorthEast();
            var northCell = Math.floor(northEast.lat/this.gridSize);
            var eastCell = Math.floor(northEast.lng/this.gridSize);

            var xCells = eastCell - westCell;
            var yCells = northCell - southCell;

            if (yCells < 5 && xCells < 5) {
                for (var y = 0; y <= yCells; y++) {
                    for (var x = 0; x <= xCells; x++) {
                        this.requestCell((southCell + y) * this.gridSize, (westCell + x) * this.gridSize);
                    }
                }
            }
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
                    <OverlayBuilder mapState={this.state} gridSize={this.gridSize} openHandler={(e) => this.props.openHandler(e)}/>
                    <Legend airQ={this.state.airQualityData} className='legend' id='legend'
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







  

  