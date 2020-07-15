import React from 'react';

var primaryColor;
var secondaryColor;
var name;
var average;
var variance;
var unitOfMeasurement;
 
export function setHumidity() {
    name = 'Humidity';
    /*blue*/
    primaryColor = '#286ab4';
    /*yellow*/
    secondaryColor = '#eaa21a';
    /*in percent in 2018 https://aero-check.de/luftfeuchtigkeit/deutschland/*/
    average = 75;

    variance = 25;

    unitOfMeasurement = "percent";
}

export function setTemperature() {
    name = 'Temperature';
    /*blue*/
    primaryColor = '#1c99d6';
    /*red*/    
    secondaryColor = '#d20000';
    /*average temperature from july 2019 to july 2020: https://de.statista.com/statistik/daten/studie/5564/umfrage/monatliche-durchschnittstemperatur-in-deutschland/*/
    average = 16.8;
    
    variance = 30;
    

    unitOfMeasurement = "centigrade";
}


export function setParticulateMatter() {

    name = 'ParticulateMatter';
    /*grün*/
    primaryColor = '#25992c';
    /*red*/
    secondaryColor = '#d20000';
    /*PM 10 in µg/m³, yearly average is 40µg/m³ -limit by german government is 50 µg/m³*/
    average = 40;

    variance = 10;

    unitOfMeasurement = "µg/m³";
}

export function setAirPressure() {
    name = 'Airpressure';  
    //blue
    primaryColor = '#286ab4';
    //yellow
    secondaryColor = '#eaa21a';
    //in hectopascal, average on sealevel 
    average = 1013.25
    //https://en.wikipedia.org/wiki/List_of_atmospheric_pressure_records_in_Europe#Germany
    variance = 40;

    unitOfMeasurement = "Hectopascal";
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

export function getVariance()   {
    return variance;
}

export function getUnitOfMeasurement() {
    return unitOfMeasurement;
}
