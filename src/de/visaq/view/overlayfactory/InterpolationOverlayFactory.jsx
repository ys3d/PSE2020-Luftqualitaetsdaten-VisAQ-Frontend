import React, { Component } from 'react';
import { FeatureGroup} from 'react-leaflet';
import L from 'leaflet';
import Gradient from '../elements/theme/Gradient';


/**
 * Creates an interpolated Overlay for them Map. 
 * An array of PointData is the base data for the overlay. This is an array of coordinates with an evenly distance, calculated in 
 * the VisAQ backend using Barnes Interpolation.
 * The class InterpolationOverlayFactory uses bilinear iterpolation to calculate the air quality value and its matching color scheme.
 */
export default class InterpolationOverlayFactory extends Component {
     
    /**
     * Sole constructor of the class.
     * 
     * @param {Objects} props   The properties of the component
     */
    constructor(props)  {
        super(props);
        this.state = {
            airQualityData : props.airQ,
            pointData : props.pointData
        }
    }

  /**
   * Updates the InterpolationOverlaysFactory's state.
   * 
   * @param {Object} props  The new map properties.
   */
  componentDidUpdate(props) {
    console.log(props);
    if(JSON.stringify(this.state.airQualityData) !== JSON.stringify(props.airQ)) {
      this.setState({airQualityData : props.airQ});
    } if(JSON.stringify(this.state.pointData) !== JSON.stringify(props.pointData))   {
        this.setState({pointData : props.pointData});
    }
  }

  /**
   * Determines how the GeoJSON feature is depicted on the map.
   * 
   * @param {Object} feature    The GeoJSON feature 
   */
   mapStyle = (feature) => {
        return ({
            weight: 2,
            opacity: 0,
            dashArray: "3",
            fillOpacity: this.getFillOpacity(feature.properties.value),
            fillColor: Gradient(feature.properties.value, this.state.airQualityData)  
        });
    }

    /**
     * The method returns the opacity, 
     * values that are marked insignificant by the backend (having value -999) have an opacity of 0.
     * 
     * @param {Number} value The interpolated value of the feature
     */
    getFillOpacity(value) {
        if (value < -20) {
            return 0;
        } else {
            return 0.3;
        }
    }


    /**
     * Adds the GeoJSON data to a Feature Group
     */
    onFeatureGroupReady = (ref) => {
        if(ref===null) {
             return;
        }
        this.featureGroup = ref;
        let leafletGeoJSON = new L.GeoJSON(getGeoJson(this.state.pointData), {
            style: this.mapStyle
        });
        let leafletFG = this.featureGroup.leafletElement;
        /*
        * clears the old Layers
        */
        leafletFG.clearLayers()
        leafletGeoJSON.eachLayer( layer =>leafletFG.addLayer(layer));
    }

    /**
     * Renders the GeoJSON Data 
     */
    render()    {
    return (
        <div>
        <FeatureGroup ref={ (reactFGref) => {this.onFeatureGroupReady(reactFGref);} }>
        </FeatureGroup> 
        </div> 
    );
    }
    
}



let geojson;

/**
 * Calculates the GeoJSON Data.
 * 
 * @param {Object} pointData An array of PointData
 */
function getGeoJson(pointData)   {
    geojson = [];
    let colNum;
    let rowNum;

    if(pointData === null)  {
        console.log("pointData is null");
        return;
    }
    
    if(pointData.length === 0)  {
        console.log("PointData is empty");
        return;
    }
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
    console.log(colNum);
    rowNum = pointData.length /colNum;
      
    if (!(Number.isInteger(rowNum))) {
        return false;
    }
      
    /**
       * Formats the Point Data into squares
       */
      for (var k = 0; k < rowNum * colNum - colNum; k = k + rowNum)    {
        for(var j = k ; j < k + colNum - 1; j++) {
            var square = [];
                square.push(pointData[j]);
                square.push(pointData[j + 1]);
                square.push(pointData[colNum + j]);
                square.push(pointData[colNum + j + 1])

                writeFeatures(square);
            }
      }
    return geojson;    
}
      
/**
   * Writes the squares into smaller squares and then into GeoJSON features.
   * The number of squares is determined by INTERPOLATED_NUM.
   * 
   * @param {Object[]} squareData     
   */
  function writeFeatures(squareData)   {
   
    /**
     * Needs to be square Number.
     */
    const INTERPOLATED_NUM = 25;

    const intervalX = (squareData[1].json.location.x - squareData[0].json.location.x) / Math.sqrt(INTERPOLATED_NUM);
    const intervalY = (squareData[2].json.location.y - squareData[0].json.location.y) /Math.sqrt(INTERPOLATED_NUM)

    for(var i = 0; i < Math.sqrt(INTERPOLATED_NUM); i++)  {
        for(var j = 0; j < Math.sqrt(INTERPOLATED_NUM); j++)  {
            var coordinates = [((squareData[0].json.location.x + (i * intervalX)) + (intervalX/2)),
                                 ((squareData[0].json.location.y + (j * intervalY)) + (intervalY/2))]
            var geojsonFeature = {
                "type": "Feature",
                "properties": {
                    "value" : bilinearInterpolation(coordinates, squareData)
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[(squareData[0].location.x + (i * intervalX)), (squareData[0].location.y + (j * intervalY))],
                                    [(squareData[0].location.x + (i * intervalX)), (squareData[0].location.y + ((j + 1) * intervalY))],
                                    [(squareData[0].location.x + ((i + 1) * intervalX)), (squareData[0].location.y + ((j + 1) * intervalY))],
                                    [ (squareData[0].location.x + ((i + 1) * intervalX)), (squareData[0].location.y + (j * intervalY))],
                                    [(squareData[0].location.x + (i * intervalX)), (squareData[0].location.y + (j * intervalY))]]]     
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
    return ((1 /((x2 -x1) * (y2 - y1))) * ((squareDatum[0].json.datum * (x2 - x) * (y2 - y))
                                        + (squareDatum[1].json.datum * (x - x1) * (y2 - y))
                                        + (squareDatum[2].json.datum * (x2 - x) * (y - y1))
                                        + (squareDatum[3].json.datum * (x - x1) * (y - y1))));
}

