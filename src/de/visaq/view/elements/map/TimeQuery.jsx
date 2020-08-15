import React from "react";
import DatePicker from "react-datepicker";
import i18next from 'i18next';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import {setMinutes, setHours} from "date-fns";
import 'react-datepicker/dist/react-datepicker-cssmodules.css'; 
import './TimeQuery.css'
//CSS Modules, react-datepicker-cssmodules.css

let startDate;
let minTime;
let maxTime;

export default class TimeQuery extends React.Component {
  constructor(props)    {
    super(props)
       
    this.state = {
      date: new Date(this.props.time)
    };
    startDate = this.state.date;
    this.setMinMaxTime(this.state.date);
  }

  handleChange = date => {
    var d = Date.parse(date);
    this.props.timeHandler(d);
    this.setState({
      date: date
    });
    this.setMinMaxTime(date);
  }; 

  /**
   * Set the minimum and maximum time of the timeselect
   * 
   * @param {Object} date The selected Date
   */
  setMinMaxTime = (date) => {
    if (date.getDay() === startDate.getDay()) {
      minTime = setHours(setMinutes(this.state.date, 0), 0);
      console.log(minTime);
      maxTime = setMinutes(this.state.date, 0);
      console.log(maxTime);
    } else {
      minTime = null;
      maxTime = null;
    }
  }
  
  render() {
    return (

      <DatePicker
        selected={this.state.date}
        excludeOutOfBoundsTimes
        disabled={!this.props.historicalMode}
        onChange={this.handleChange.bind(this)}
        shouldCloseOnSelect={false}
        minDate={Date.parse('2016-10-01T00:00:00')}
        maxDate={new Date()}
        dateFormat="dd.MM.yyyy hh:mm"
        showTimeSelect
        timeFormat= "HH:mm"
        minTime={minTime}
        maxTime={maxTime}
        timeIntervals={60}
      />
  
    );
  }
}