import React, { Fragment } from 'react';
import { render } from 'react-dom';
import PointDatum from '../../model/PointDatum'
import { Circle, LatLngBounds, Map, MapLayer, Popup, Marker, LayerGroup } from 'react-leaflet';
import { point } from 'leaflet';
import * as data from './testPointDatum.json';



let featureCollection;

/**
 * 
 * 
 * @param {*} props 
 */
const InterpolationOverlayFactory = (props) => {
    const {sensors} = props;
    if (!Array.isArray(sensors)) {
        return <Fragment></Fragment>
    }
    featureCollection = {
        "type": "FeatureCollection",
        "features" : []
    };

    var pointdata = [];
    for(var i = 0; i < 8; i++)  {
        var pd1 = new PointDatum(data.json[i]);
        pointdata.push(pd1)
    } 
    console.log(featureCollection);
    getSquareData(pointdata);
    console.log(featureCollection);
    

    const imarkers = sensors.filter((sensor, index) => {
        if (sensor.locations === undefined) {
            return false;
        }
        return true;
    }).map((sensor, index) => (
        <Circle

            key={index}
            center={[sensor.locations[0].location.y, sensor.locations[0].location.x]}
            opacity='0'
            fillColor='green'
            fillOpacity='0.8'
            radius={200}
        ></Circle>
    ));
    return <Fragment>{imarkers}</Fragment>
}


/**
 * 
 * @param {*} pointData 
 */
function getSquareData(pointData) {
    let colNum;
    let rowNum
    /**
     * Get the length of the rows
     */
    for(var i = 0; i < pointData.length; i++)   {
        if(pointData[0].location.y === pointData[i].location.y)  {
            colNum = i + 1; 
        } else {
            break;
        }
    }
    
    rowNum = pointData.length /colNum;
    
    if (!(Number.isInteger(rowNum))) {
        return false;
    }
    
    /**
     * Formats the Point Data into squares
     */
    for (var k = 0; k < rowNum - 1; k++)    {
        for(var j = k; j < colNum -  1; j++) {
            var square = [];
                square.push(pointData[j]);
                square.push(pointData[j + 1]);
                square.push(pointData[colNum + j]);
                square.push(pointData[colNum + j + 1])
                console.log(square);
                writeFeatures(square);
            }
        }
    }
    


/**
 * Writes the interpolated data into features. 
 * 
 * @param {Object[]} squareData     
 */
function writeFeatures(squareData)   {
    console.log(squareData.length === 4);
    
    /**
     * Needs to be square Number.
     */
    const INTERPOLATED_NUM = 9;


    const interval = (squareData[1].location.x - squareData[0].location.x) / Math.sqrt(INTERPOLATED_NUM);
    console.log("INTERVAL" + interval);

    for(var i = 0; i < Math.sqrt(INTERPOLATED_NUM); i++)  {
        for(var j = 0; j < Math.sqrt(INTERPOLATED_NUM); j++)  {
            var coordinates = [((squareData[0].location.x + (i * interval)) + (interval/2)),
                                 ((squareData[0].location.y + (j * interval)) + (interval/2))]
            var geojsonFeature = {
                "type": "Feature",
                "properties": {
                    "value" : bilinearInterpolation(coordinates, squareData)
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": []
                        
                }
            };
            
            geojsonFeature.geometry.coordinates.push([(squareData[0].location.x + (i * interval)), (squareData[0].location.y + (j * interval))]);
            geojsonFeature.geometry.coordinates.push([(squareData[0].location.x + ((i + 1) * interval)), (squareData[0].location.y + (j * interval))]);
            geojsonFeature.geometry.coordinates.push([(squareData[0].location.x + ((i + 1) * interval)), (squareData[0].location.y + ((j + 1) * interval))]);
            geojsonFeature.geometry.coordinates.push([(squareData[0].location.x + (i * interval)) , (squareData[0].location.y + ((j + 1) * interval))]);
            geojsonFeature.geometry.coordinates.push([(squareData[0].location.x + (i * interval)) , (squareData[0].location.y + (j * interval))]);

            featureCollection.features.push(geojsonFeature);
        }
    }
    
    
}


/**
 * Interpolates the value on the coordinates, using bilinear interpolation.
 * 
 * @param {Object} coordinates      The coordinates 
 * @param {Object[]} squareData     A square of PointData
 */
function bilinearInterpolation(coordinates, squareDatum) {

    var x = coordinates[0];
    var y = coordinates[1]

    var x1 = squareDatum[0].location.x;
    var x2 = squareDatum[1].location.x;
    var y1 = squareDatum[0].location.y;
    var y2 = squareDatum[2].location.y;

    if ((x2 -x1) * (y2 - y1) === 0) {
        return false;
    }
    
    /**
     * mathematical formula from Wikipedia: https://en.wikipedia.org/wiki/Bilinear_interpolation
     */
    return ((1 /((x2 -x1) * (y2 - y1))) * ((squareDatum[0].json.datum * (x2 - x) * (y2 - y))
                                        + (squareDatum[1].json.datum * (x - x1) * (y2 - y))
                                        + (squareDatum[2].json.datum * (x2 - x) * (y - y1))
                                        + (squareDatum[3].json.datum * (x - x1) * (y - y1))));
}



export default InterpolationOverlayFactory;