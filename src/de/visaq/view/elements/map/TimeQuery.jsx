import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import {enGB, de} from "date-fns/locale";
import i18next from 'i18next';
import "react-datepicker/dist/react-datepicker.css";
import {setMinutes, setHours} from "date-fns";
import './TimeQuery.css'

let startDate;
let minTime;
let maxTime;

/**
 * The class contains a calendar.
 */
export default class TimeQuery extends React.Component {
  /**
   * Sole constructor of the class
   * 
   * @param {Object} props  The class properies
   */
  constructor(props)    {
    super(props)
    this.state = {
      date: new Date(this.props.time)
    };
    startDate = new Date(this.props.time);
    this.setMinMaxTime(this.state.date);
    registerLocale("en", enGB); 
    registerLocale("de", de);
  }

  /**
   * Sets the calendar again to its starting configuration.
   * 
   * @param {Object} prevProps  The previous properties
   */
  componentDidUpdate(prevProps)  {
    if (prevProps.time === this.state.date) {
      return;
    }
  }

  /**
   * Passes the date to its parent class and sets a new state.
   * 
   * @param {String} date   The selected date
   */
  handleChange = date => {
    var d = Date.parse(this.state.date);
    this.props.timeHandler(d);
    this.setState({
      date: date
    });
    this.setMinMaxTime(date);
  }; 
  
  /**
   * Set the minimum and maximum time of the timeselect.
   * 
   * @param {Object} date The selected Date
   */
  setMinMaxTime = (date) => {
    if (date.getDay() === startDate.getDay()) {
      minTime = setHours(setMinutes(this.state.date, 0), 0);
      maxTime = setMinutes(this.state.date, 0);
    } else {
      minTime = null;
      maxTime = null;
    }
  }
  
  /**
   * Renders the calendar.
   */
  render() {
    return (
      <DatePicker
        selected={this.state.date}
        disabled={!this.props.historicalMode}
        onChange={this.handleChange.bind(this)}
        shouldCloseOnSelect={false}
        minDate={Date.parse('2016-10-01T00:00:00')}
        maxDate={new Date()}
        dateFormat="dd.MM.yyyy HH:mm"
        showTimeSelect
        timeFormat= "HH:mm"
        minTime={minTime}
        maxTime={maxTime}
        timeIntervals={60}
        locale={i18next.language}
      />
    );
  }
}
