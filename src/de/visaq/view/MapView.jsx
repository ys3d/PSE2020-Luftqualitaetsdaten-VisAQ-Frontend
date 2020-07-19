
import React, { createRef, Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import "./MapView.css";
import OverlayBuilder from './overlayfactory/OverlayBuilder';
import Legend from './elements/map/Legend';
import request from "../controller/Request";
import Thing from "../model/Thing";
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
            airQualityData: props.airQ,
            things: [],
            time: new Date().toLocaleString,
            historical: false
        };
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
      } 
      else if(this.state.bounds !== nextState.bounds){
        return true;
      }
      else {
        return false;
      }  
    }

    /**
     * Changes the airQualityData state of the component. 
     * 
     * @param {Object} airQ The AirQualityData
     */
    componentDidUpdate(airQ) {
      if(JSON.stringify(this.state.airQualityData) !== JSON.stringify(airQ.airq)) {
        console.log(airQ.airQ);
        this.setState({airQualityData : airQ.airQ});
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
    render() {
        return (
          <Map 
            center={[this.state.lat, this.state.lng]} 
            zoom={this.state.zoom} 
            style={{ width: '100%', height: '100vh'}}
            boundsOptions={{padding: [50, 50]}}
            ref = {this.mapRef}
            onMoveEnd={this.onMove.bind(this)}
          >
            <TileLayer
             attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <OverlayBuilder mapState={this.state} />
             <Legend airQ = {this.state.airQualityData}
             />
         </Map>
        );
     }
}
