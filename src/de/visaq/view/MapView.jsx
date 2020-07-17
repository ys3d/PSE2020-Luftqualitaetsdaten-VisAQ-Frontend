import React,{ createRef} from 'react';
import {Map, TileLayer} from 'react-leaflet';
import L from 'leaflet';
import "./MapView.css";
import OverlayBuilder from './overlayfactory/OverlayBuilder';
import Legend from './elements/map/Legend';
import { getInitialProps } from 'react-i18next';



/**
 * Class that contains the MapView.
 */
export default class MapView extends React.Component {
  mapRef = createRef();  
  plugin = createRef();
  builder = createRef();
  legend = createRef();

  /**
   * Sole constructor of the class. Sets the starting Viewpoint on Augsburg.
   * 
   * @param {Object} props The component properties
   */
  constructor(props) {
    super(props);
    this.state = ({
      lat: 48.3705449,
      lng: 10.89779,
      zoom: 13,
      bounds: L.latLngBounds(L.latLng(48.29, 10.9), L.latLng(48.31, 10.8)),
      airQualityData: props.airQ
    });
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

  /**
   * Changes the bounds state of the component.
   * 
   * @param {Object} event 
   */
  onMove(event) {
    this.setState({bounds : event.target.getBounds()});
    console.log(this.state.bounds);
  }

  /**
   * Renders the component. Adds OverlayBuilder and Legend as Children.
   */
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
          <OverlayBuilder bounds = {this.state.bounds} airQ ={this.state.airQualityData}
           />
           <Legend airQ = {this.state.airQualityData}
           />
       </Map>
      );
   }
}
