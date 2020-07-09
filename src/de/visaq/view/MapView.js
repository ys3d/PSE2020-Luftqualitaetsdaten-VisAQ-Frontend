import React, { Component } from 'react';
//import ReactDOM from 'react-dom'; //DOM gives opportunity to hatch outside the react model, neccessary?
import L from 'leaflet';
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import "./MapView.css";

export default function MapView() {
  return (
    <Map center={[45.4, -75.7]} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </Map>
  );
}