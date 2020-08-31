import React, { Component } from 'react';
import SensorOverlayFactory from './SensorOverlayFactory';
import InterpolationOverlayFactory from './InterpolationOverlayFactory';
import OverlayEnum from "./OverlayEnum";
import AirQualityData from '../elements/airquality/AirQualityData';

/**
 * The class organizes the map overlays.
 */
export default class OverlayBuilder extends Component {

    /**
     * Renders the map overlays using LayersControl
     */
    render() {
        var southWest = this.props.mapState.bounds.getSouthWest();
        var southCell = Math.floor(southWest.lat / this.props.gridSize);
        var westCell = Math.floor(southWest.lng / this.props.gridSize);

        var northEast = this.props.mapState.bounds.getNorthEast();
        var northCell = Math.floor(northEast.lat / this.props.gridSize);
        var eastCell = Math.floor(northEast.lng / this.props.gridSize);

        var xCells = eastCell - westCell;
        var yCells = northCell - southCell;

        var cellsData = [];
        var assocData = {};
        var cellsPointData = [];
        var prepPointData = [];

        let airQualityData = AirQualityData.getInstance();

        if (yCells < 30 && xCells < 30) {
            for (var y = 0; y <= yCells; y++) {
                for (var x = 0; x <= xCells; x++) {
                    var lat = (northCell - y) * this.props.gridSize;
                    var lng = (westCell + x) * this.props.gridSize;
                    if (this.props.mapState.cells.hasOwnProperty(`${this.props.time}|${airQualityData.name}|${lat}|${lng}`) || this.props.mapState.cells[`${this.props.time}|${airQualityData.name}|${lat}|${lng}`] !== undefined) {
                        cellsData.push(this.props.mapState.cells[`${this.props.time}|${airQualityData.name}|${lat}|${lng}`]);
                    }
                    if (this.props.mapState.pointDataCells.hasOwnProperty(`${this.props.time}|${airQualityData.name}|${lat}|${lng}`) || this.props.mapState.pointDataCells[`${this.props.time}|${airQualityData.name}|${lat}|${lng}`] !== undefined) {
                        cellsPointData.push(this.props.mapState.pointDataCells[`${this.props.time}|${airQualityData.name}|${lat}|${lng}`]);
                    }
                }
            }
        }

        cellsData.forEach(function (cellData) {
            if (cellData == null || cellData.things == null) {
                return;
            }

            cellData.things.forEach(function (thing, index) {
                assocData[thing.id] = [thing, cellData.observations[index]];
            })
        });

        cellsPointData.forEach(function (cellPointData) {
            if (cellPointData == null) {
                return;
            }

            prepPointData.push(cellPointData);
        });

        var data = [];

        Object.keys(assocData).forEach(function (key) {
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
                <SensorOverlayFactory data={data} openHandler={(squareCenter, thingId) => this.props.openHandler(squareCenter, thingId)}
                    overlay={OverlayEnum.sensor === this.props.overlays} />
                <InterpolationOverlayFactory pointData={prepPointData} iOpenHandler={(squareCenter, interpolatedValue) => this.props.iOpenHandler(squareCenter, interpolatedValue)}
                    overlay={OverlayEnum.interpolation === this.props.overlays} />
            </div>
        );
    }
}
