import React, { Component } from 'react';
import SensorOverlayFactory from './SensorOverlayFactory';
import {LayersControl, LayerGroup} from 'react-leaflet';
import InterpolationOverlayFactory from './InterpolationOverlayFactory';

/**
 * The class organizes the map overlays.
 */
export default class OverlayBuilder extends Component {
    
    /**
     * Sole constructor of the class.
     * 
     * @param {Object} props    The properties
     */
    constructor(props) {
        super(props);
    }

    /**
     * Renders the map overlays using LayersControl
     */
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
        var cellsPointData =[];
        var prepPointData = [];


        if (yCells < 30 && xCells < 30) {
            for (var y = 0; y <= yCells; y++) {
                for (var x = 0; x <= xCells; x++) {
                    var lat = (northCell - y) * this.props.gridSize;
                    var lng = (westCell + x) * this.props.gridSize;
                    if (this.props.mapState.cells.hasOwnProperty(`${this.props.airQualityData.name}|${lat}|${lng}`) || this.props.mapState.cells[`${this.props.airQualityData.name}|${lat}|${lng}`] != undefined) {
                        cellsData.push(this.props.mapState.cells[`${this.props.airQualityData.name}|${lat}|${lng}`]);
                    }
                    if (this.props.mapState.pointDataCells.hasOwnProperty(`${this.props.airQualityData.name}|${lat}|${lng}`) || this.props.mapState.pointDataCells[`${this.props.airQualityData.name}|${lat}|${lng}`] != undefined) {
                        cellsPointData.push(this.props.mapState.pointDataCells[`${this.props.airQualityData.name}|${lat}|${lng}`]);
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

        cellsPointData.forEach(function(cellPointData) {
            if (cellPointData == null) {
                return;
            }
            
            prepPointData.push(cellPointData);
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
                <LayersControl position='topright'>
                <LayersControl.Overlay checked name="Sensor">
                <LayerGroup>
                <SensorOverlayFactory data = {data} airQ = {this.props.airQualityData} openHandler={(e) => this.props.openHandler(e)}/>
                </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Interpolation">
                <InterpolationOverlayFactory airQ={this.props.airQualityData} pointData={prepPointData} iopenHandler={(e, a) => this.props.iopenHandler(e, a)}/>
                </LayersControl.Overlay>
                </LayersControl>
            </div>
        );
    }
}
