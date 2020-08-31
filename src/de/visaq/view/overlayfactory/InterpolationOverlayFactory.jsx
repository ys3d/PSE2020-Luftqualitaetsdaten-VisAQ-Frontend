import React, { Component } from 'react';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import Gradient from '../elements/theme/Gradient';
import AirQualityData from '../elements/airquality/AirQualityData';

/**
 * Creates an interpolated Overlay for them Map.
 * An array of PointData is the base data for the overlay. This is an array of coordinates with an evenly distance, calculated in
 * the VisAQ backend using Barnes Interpolation.
 * The class InterpolationOverlayFactory uses bilinear iterpolation to calculate the air quality value and its matching color scheme.
 */
export default class InterpolationOverlayFactory extends Component {

    /**
     * Determines how the GeoJSON feature is depicted on the map.
     *
     * @param {Object} feature    The GeoJSON feature
     */
    mapStyle = (feature) => {
        return ({
            weight: 2,
            opacity: 0,
            dashArray: '3',
            fillOpacity: 0.3,
            fillColor: Gradient(feature.properties.value, AirQualityData.getInstance())
        });
    }

    /**
     * Adds the GeoJSON data to a Feature Group
     */
    onGeoJSON = (ref) => {
        if (ref === null) {
            return;
        }

        this.featureGroup = ref;
        let leafletFG = this.featureGroup.leafletElement;

        /*
        * clears the old Layers
        */
        leafletFG.clearLayers();

        let interpolationOverlayFactory = this;

        if (this.props.overlay) {
            let leafletGeoJSON = new L.GeoJSON(this.getGeoJson(this.props.pointData), {
                style: this.mapStyle,
                onEachFeature: function (feature, layer) {
                    layer.on({
                        click: InterpolationOverlayFactory.signalHandler.bind(interpolationOverlayFactory)
                    });
                }
            });
            leafletGeoJSON.eachLayer(layer => leafletFG.addLayer(layer));
        }
    }

    /**
     * Renders the GeoJSON Data
     */
    render() {
        return (
            <div>
                <GeoJSON ref={(reactFGref) => { this.onGeoJSON(reactFGref); }}>
                </GeoJSON>
            </div>
        );
    }

    /**
     * Gives the feature parameters to the iOpenHandler.
     *
     * @param {Object} feature  The GeoJSON feature
     */
    static signalHandler(feature) {
        this.props.iOpenHandler(feature.target.feature.geometry.center, feature.target.feature.properties.value);
    }

    /**
     * Calculates the GeoJSON Data.
     *
     * @param {Object} input An array of array of PointData
     */
    getGeoJson(input) {
        let geojson = [];

        input.forEach(function (cell) {
            let pointData = cell.pointData;

            let colNum;
            let rowNum;

            if (pointData === null || pointData === undefined || pointData.length === 0) {
                return;
            }

            /**
            * Get the length of the columns
            */
            for (let i = 0; i < pointData.length; i++) {
                if (pointData[0].location.y === pointData[i].location.y) {
                    colNum = i + 1;
                } else {
                    break;
                }
            }

            rowNum = pointData.length / colNum;

            if (!(Number.isInteger(rowNum))) {
                return false;
            }

            // Needs to be calculated from pointData
            let spacingX = Math.abs(pointData[1].location.x - pointData[0].location.x) / 2;
            let spacingY = Math.abs(pointData[colNum].location.y - pointData[0].location.y) / 2;

            for (let i = 0; i < pointData.length; i++) {
                let cur = pointData[i];

                var geojsonFeature = {
                    "type": "Feature",
                    "properties": {
                        "value": cur.datum
                    },
                    "geometry": {
                        "type": "Polygon",
                        "center" : [cur.location.x, cur.location.y],
                        "coordinates": [[[(cur.location.x - spacingX), (cur.location.y + spacingY)],
                        [(cur.location.x + spacingX), (cur.location.y + spacingY)],
                        [(cur.location.x + spacingX), (cur.location.y - spacingY)],
                        [(cur.location.x - spacingX), (cur.location.y - spacingY)],
                        [(cur.location.x - spacingX), (cur.location.y + spacingY)]]]
                    }
                };
                geojson.push(geojsonFeature);
            }
        });
        return geojson;
    }

}
