import React, { createRef, Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import "./MapView.css";
import OverlayBuilder from './overlayfactory/OverlayBuilder';
import Legend from './elements/map/Legend';
import request from "../controller/Request";
import Thing from "../model/Thing";
import AirQualityData, { getName } from './elements/airquality/AirQualityData'

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
            airQualityData: "",
            things: []
        };
    }


    componentWillMount() {
        this.setState({ airQualityData: getName() });
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    static componentDidUpdate() {
        if (!this.state.airQualityData.localeCompare(getName())) {
            this.setState({ airQualityData: getName() });
        }
    }

    onMove(event) {
        var newBounds = event.target.getBounds();
        this.setState({ bounds: newBounds }, () => {
            request("http://localhost:8080/api/thing/all/square", false, {
                "y1": newBounds.getSouthWest().lat,
                "x1": newBounds.getSouthWest().lng,
                "y2": newBounds.getNorthEast().lat,
                "x2": newBounds.getNorthEast().lng
            }, Thing).then(things => {
                this.setState({ things: things });
            });
        });
    }

    onClick(event) {
    }

    render() {
        return (
            <div>
                <Map
                    center={[this.state.lat, this.state.lng]}
                    zoom={this.state.zoom}
                    style={{ width: '100%', height: '100vh' }}
                    boundsOptions={{ padding: [50, 50] }}
                    ref={this.mapRef}
                    onMoveEnd={this.onMove.bind(this)}
                    onClick={this.onClick.bind(this)}
                >
                    <TileLayer
                        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <OverlayBuilder mapState={this.state} />
                    <Legend />
                </Map>
            </div>
        );
    }
}
