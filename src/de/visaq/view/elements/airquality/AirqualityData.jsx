import React from 'react';

var primaryColor;
var secondaryColor;
var name;

    export function setHumidity() {
        this.name = 'Humidity';
        //blue
        this.primaryColor = '#286ab4';
        //yellow
        this.secondaryColor = '#eaa21a';
    }

    export function setTemperature() {
        this.name = 'Temperature';
        //blue
        this.primaryColor = '#1c99d6';
        //red
        this.secondaryColor = '#d20000';
    }

    export function setParticulateMatter() {
        this.name = 'ParticulateMatter';
        //grün
        this.primaryColor = '#11d61e';
        //red
        this.secondaryColor = '#d20000';
    }

    export function setAirPressure() {
        this.name = 'Airpressure';
        //blue
        this.primaryColor = '#286ab4';
        //yellow
        this.secondaryColor = '#eaa21a';
    }

    export function getName() {
        return this.name;
    }

    export function getPrimaryColor() {
        return this.primaryColor;
    }

    export function getSecondaryColor() {
        return this.secondaryColor;
    }