import React,{ createRef, setState, Component } from 'react';
import {useLeaflet, Map, TileLayer} from 'react-leaflet';
import L from 'leaflet';
import ParticulateMatter from './elements/airquality/ParticulateMatter';
import "./MapView.css";
import OverlayBuilder from './overlayfactory/OverlayBuilder';


export default class MapView extends Component {
  //with props its possible to initalize the map with different map properties
  constructor(props) {
    super(props);
    this.mapRef = createRef();  
    this.state = {
      lat: 48.3705449,
      lng: 10.89779,
      zoom: 13,
      bounds: L.latLngBounds(L.latLng(48.29, 10.9), L.latLng(48.31, 10.8)),
      AirQualityData: new ParticulateMatter()
    };
  }

  componentDidMount() {
  }
  
  componentDidUpdate(prevState) {
      
  }
  
  onMove(event) {
    this.setState({bounds : event.target.getBounds()})

  }

  onClick(event)  {
    alert("click");
  }

  

  render() {
      return (
        <div>
        <Map 
          center={[this.state.lat, this.state.lng]} 
          zoom={this.state.zoom} 
          style={{ width: '100%', height: '900px'}}
          boundsOptions={{padding: [50, 50]}}
          ref = {this.mapRef}
          onMoveEnd={this.onMove.bind(this)}
          onClick={this.onClick.bind(this)}
        >
          <TileLayer
           attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <OverlayBuilder bounds = {this.state}
           />
       </Map> 
       </div>
      );
   }
}

