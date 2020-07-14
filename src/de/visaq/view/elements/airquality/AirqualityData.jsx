import React from 'react';

var primaryColor;
var secondaryColor;
var name;
var average;
 
export function setHumidity() {
    name = 'Humidity';
    //blue
    primaryColor = '#286ab4';
    //yellow
    secondaryColor = '#eaa21a';
    //in percent in 2018 https://aero-check.de/luftfeuchtigkeit/deutschland/
    average = 75
}

export function setTemperature() {
    name = 'Temperature';
    //blue
    primaryColor = '#1c99d6';
    //red
    secondaryColor = '#d20000';
    //average temperature from july 2019 to july 2020: https://de.statista.com/statistik/daten/studie/5564/umfrage/monatliche-durchschnittstemperatur-in-deutschland/
    average = 16.8;
}


export function setParticulateMatter() {

    name = 'ParticulateMatter';
    //grün
    primaryColor = '#25992c';
    //red
    secondaryColor = '#d20000';
    //PM 10 in µg/m³ -limit by german government 
    average = 50
}

export function setAirPressure() {
    name = 'Airpressure';
     
    //blue
    primaryColor = '#286ab4';
    //yellow
    secondaryColor = '#eaa21a';
    //in hectopascal, average on sealevel 
    average = 1013.25
}
export function getName() {
    return name;
}

export function getSecondaryColor() {
    return secondaryColor;
}

export function getPrimaryColor() {
    return primaryColor;
}

export function getAverage() {
    return  average;
}