import React,{ createRef, Component } from 'react';
import {Map, TileLayer} from 'react-leaflet';
import L from 'leaflet';
import "./MapView.css";
import OverlayBuilder from './overlayfactory/OverlayBuilder';
import Legend from './elements/map/Legend';
import {getLongitude, getLatitude} from '../view/elements/CookieNotice'
import AirQualityData, { getName } from './elements/airquality/AirQualityData'
import cookieNotice from './elements/CookieNotice'

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
      airQualityData: ""
    };
    this.setlat();
  }

  setlat() {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('Language='))) {
      navigator.geolocation.watchPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }, (error) => {
      this.setState({ lat: 48.3705449, lng: 10.89779})
    })
    }
  }

  componentWillMount() {
    this.setState({airQualityData : getName()});
    this.setlat();
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  static componentDidUpdate() {
    if(!this.state.airQualityData.localeCompare(getName())) {
      this.setState({airQualityData : getName()});
    }
  }

  onMove(event) {
    this.setState({bounds : event.target.getBounds()});
  }

  onClick(event)  {
  }

  render() {
      return (
        <div>
        <Map 
          center={[this.state.lat, this.state.lng]} 
          zoom={this.state.zoom} 
          style={{ width: '100%', height: '100vh'}}
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
          <Legend/>
       </Map> 
       </div>
      );
   }
}

