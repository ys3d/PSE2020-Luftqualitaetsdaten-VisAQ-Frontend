import React from 'react';

var primaryColor;
var secondaryColor;
var name;

    export function setHumidity() {
        name = 'Humidity';
        //blue
        primaryColor = '#286ab4';
        //yellow
        secondaryColor = '#eaa21a';
    }

    export function setTemperature() {
        name = 'Temperature';
        //blue
        primaryColor = '#1c99d6';
        //red
        secondaryColor = '#d20000';
    }

    export function setParticulateMatter() {
        name = 'ParticulateMatter';
        //grün
        primaryColor = '#11d61e';
        //red
        secondaryColor = '#d20000';
    }

    export function setAirPressure() {
        name = 'Airpressure';
        //blue
        primaryColor = '#286ab4';
        //yellow
        secondaryColor = '#eaa21a';
    }

    export function getName() {
        return name;
    }

    export function getPrimaryColor() {
        return primaryColor;
    }

    export function getSecondaryColor() {
        return secondaryColor;
    }