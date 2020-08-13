import React from "react";
import DatePicker from "react-datepicker";
import i18next from 'i18next';
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
export default class TimeQuery extends React.Component {
  constructor(props)    {
    super(props)
       
    this.state = {
    startDate: new Date()
  };

  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
 
  render() {
      console.log(i18next.language)
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        shouldCloseOnSelect={false}
        minDate={'2016-12-17T03:24:00'}
        maxDate={new Date()}
        showTimeSelect
        locale={de}
        dateFormat="d.MM.yyyy     h:mm"
      />
    );
  }
}