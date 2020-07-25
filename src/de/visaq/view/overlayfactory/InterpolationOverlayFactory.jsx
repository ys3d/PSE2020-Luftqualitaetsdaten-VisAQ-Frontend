import React, { Fragment, Component } from 'react';
import { render } from 'react-dom';
import PointDatum from '../../model/PointDatum'
import { FeatureGroup, CircleMarker, LatLngBounds, Map, MapLayer, Popup, Marker, LayerGroup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import Choropleth from 'react-leaflet-choropleth';
import Gradient from '../elements/theme/Gradient';
import { point } from 'leaflet';
import * as data from './testPointDatum.json';


let geojson;

/**
 * 
 * 
 * @param {*} props 
 */
export default class InterpolationOverlayFactory extends Component {
     
    constructor(props)  {
        super(props);
        this.state = {
            airQualityData : props.airQ
        }
    }
  /**
   * Decides whether the component should update. 
   * Returns true if the state of AirQualityData changed in the parent component, false otherwise.
   * 
   * @param {Object} nextprops The properties
   * @param {Object} nextState The new state
   */
  shouldComponentUpdate(nextprops, nextState) {
    if(JSON.stringify(this.state.airQualityData) !== JSON.stringify(nextprops.airQ)){
      return true;
    } else {
       return false;
     }
  }

  /**
   * Updates the Legend's state.
   * 
   * @param {Object} airQ The new AirQuality Data.
   */
  componentDidUpdate(airQ) {
    if(JSON.stringify(this.state.airQualityData) !== JSON.stringify(airQ.airq)) {
      this.setState({airQualityData : airQ.airQ});
    }      
  }
    /*
    const {sensors} = props;
    if (!Array.isArray(sensors)) {
        return <Fragment></Fragment>
    }
    */

   mapStyle = (feature) => {
    console.log(feature);
        return ({
            weight: 2,
            opacity: 0,
            color: "white",
            dashArray: "3",
            fillOpacity: 0.5,
            fillColor: Gradient(feature.properties.value, this.state.airQualityData)
        });
    }


    onFeatureGroupReady = (ref) => {

        if(ref===null) {
             return;
        }
        
        this.featureGroup = ref; 
       
        let leafletGeoJSON = new L.GeoJSON(getGeoJson(), {
            style: this.mapStyle
        });
        
        let leafletFG = this.featureGroup.leafletElement;
        /*
        * clears the old Layers
        */
        leafletFG.clearLayers()
        leafletGeoJSON.eachLayer( layer =>leafletFG.addLayer(layer));

    }

    render()    {
    return (
        <div>
        <FeatureGroup ref={ (reactFGref) => {this.onFeatureGroupReady(reactFGref);} }>
        </FeatureGroup> 
        </div> 
    );
    }
    
}

function getGeoJson()   {
      
      var pointdata = [];
      for(var i = 0; i < 8; i++)  {
          var pd1 = new PointDatum(data.json[i]);
          pointdata.push(pd1)
      } 
  
      geojson = [];
      console.log(geojson);
      getSquareData(pointdata);
      
      return geojson; 
  }
  
  
  /**
   * 
   * @param {*} pointData 
   */
  function getSquareData(pointData) {
      console.log(pointData);
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
   
      /**
       * Needs to be square Number.
       */
      const INTERPOLATED_NUM = 36;
  
      const interval = (squareData[1].json.location.x - squareData[0].json.location.x) / Math.sqrt(INTERPOLATED_NUM);

      for(var i = 0; i < Math.sqrt(INTERPOLATED_NUM); i++)  {
          for(var j = 0; j < Math.sqrt(INTERPOLATED_NUM); j++)  {
              var coordinates = [((squareData[0].json.location.x + (i * interval)) + (interval/2)),
                                   ((squareData[0].json.location.y + (j * interval)) + (interval/2))]
              var geojsonFeature = {
                  "type": "Feature",
                  "properties": {
                      "value" : bilinearInterpolation(coordinates, squareData)
                  },
                  "geometry": {
                      "type": "Polygon",
                      "coordinates": [[[(squareData[0].location.y + (j * interval)), (squareData[0].location.x + (i * interval))],
                                      [(squareData[0].location.y + (j * interval)), (squareData[0].location.x + ((i + 1) * interval))],
                                      [(squareData[0].location.y + ((j + 1) * interval)), (squareData[0].location.x + ((i + 1) * interval))],
                                      [(squareData[0].location.y + ((j + 1) * interval)), (squareData[0].location.x + (i * interval))],
                                      [(squareData[0].location.y + (j * interval)), (squareData[0].location.x + (i * interval))]]]
                          
                  }
              };
              geojson.push(geojsonFeature);
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
      return ((1 /((x2 -x1) * (y2 - y1))) * ((squareDatum[0].json.value * (x2 - x) * (y2 - y))
                                          + (squareDatum[1].json.value * (x - x1) * (y2 - y))
                                          + (squareDatum[2].json.value * (x2 - x) * (y - y1))
                                          + (squareDatum[3].json.value * (x - x1) * (y - y1))));
  }

