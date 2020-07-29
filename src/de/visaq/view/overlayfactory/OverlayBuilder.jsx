import React, { Fragment, Component } from 'react';
import SensorOverlayFactory from './SensorOverlayFactory';
import {L, getSouthWest,lng,LatLngBounds, toBBoxString} from 'leaflet';
import {useLeaflet } from 'react-leaflet';
import InterpolationOverlayFactory from './InterpolationOverlayFactory';
import Gradient from '../elements/theme/Gradient';
import * as data from './testOverlay.json';
import * as ipdata from './testIPOverlay.json';
import AirQualityData from '../elements/airquality/AirQualityData';


export default class OverlayBuilder extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var southWest = this.props.mapState.bounds.getSouthWest();
        var southCell = Math.floor(southWest.lat/this.props.gridSize);
        var westCell = Math.floor(southWest.lng/this.props.gridSize);

        var northEast = this.props.mapState.bounds.getNorthEast();
        var northCell = Math.floor(northEast.lat/this.props.gridSize);
        var eastCell = Math.floor(northEast.lng/this.props.gridSize);

        var xCells = eastCell - westCell;
        var yCells = northCell - southCell;

        var cellsData = [];
        var assocData = {};

        if (yCells < 30 && xCells < 30) {
            for (var y = 0; y <= yCells; y++) {
                for (var x = 0; x <= xCells; x++) {
                    var lat = (southCell + y) * this.props.gridSize;
                    var lng = (westCell + x) * this.props.gridSize;
                    if (this.props.mapState.cells.hasOwnProperty(`${lat}|${lng}`) || this.props.mapState.cells[`${lat}|${lng}`] != undefined) {
                        cellsData.push(this.props.mapState.cells[`${lat}|${lng}`]);
                    }
                }
            }
        }

        cellsData.forEach(function(cellData) {
            if (cellData == null) {
                return;
            }

            cellData.things.forEach(function(thing, index) {
                assocData[thing.id] = [thing, cellData.observations[index]];
            })
        });

        var data = [];

        Object.keys(assocData).forEach(function(key) {
            var thing = assocData[key][0];
            var observation = assocData[key][1];

            if (thing.locations === undefined) {
                return;
            } else if (observation == null) {
                return;
            }

            data.push(assocData[key]);
        });

        return (
            <div>
                <Fragment>
                    <SensorOverlayFactory data = {data} airQ = {this.props.mapState.airQualityData} openHandler={(e) => this.props.openHandler(e)}/>
                    <InterpolationOverlayFactory airQ={this.props.mapState.airQualityData} pointData={this.props.mapState.pointData}/>
                </Fragment>
            </div>
        );
    }
}
