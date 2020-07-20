import React, { Component, event } from 'react'
import { Button, Modal, ModalTitle, Popover, Tooltip, Nav, NavItem, Row, Col, FormGroup, FieldGroup, Checkbox } from 'react-bootstrap'
import i18next from 'i18next';
import {withTranslation} from 'react-i18next';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

class Timeline extends Component {
  MODAL_TYPE_REASONS = 2;

  constructor() {
    super();
    this.render.bind(this);
    this.state = {
      showModal: false,
      currentDate: new Date()
    }
  }

  close() {
    this.setState({ showModal: false });
  }

  open(modalType) {
    this.setState({ 
      showModal: true,
    });
  }

  handleSelect(eventKey) {
    event.preventDefault();
    alert(`selected ${eventKey}`);
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render () {
    const popover = (
      <Popover id="modal-popover" title="popover">
        simple popover
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        tooltip
      </Tooltip>
    );

    const { t } = this.props;
    return (
      <div>
         <DatePicker 
         selected={this.state.currentDate}
         onChange={this.handleChange}
         locale="de-De"
         showTimeInput
         fixedHeight
         popperPlacement="top-end"
         popperModifiers={{
           offset: {
             enabled: true,
             offset: "5px, 10px"
           },
           preventOverflow: {
             enabled: true,
             escapeWithReference: false,
             boundariesElement: "viewport"
           }
         }}
         />
      </div>
    )
  }
}

const timeline = withTranslation('common')(Timeline)

export default timeline