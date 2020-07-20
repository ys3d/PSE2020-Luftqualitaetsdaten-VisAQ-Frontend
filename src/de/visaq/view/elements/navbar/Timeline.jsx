import React, { Component, event } from 'react'
import { Button, Modal, ModalTitle, Popover, Tooltip, Nav, NavItem, Row, Col, FormGroup, FieldGroup, Checkbox } from 'react-bootstrap'
import i18next from 'i18next';
import {withTranslation} from 'react-i18next';
import Picker from 'react-datetime-slider-picker'

class Timeline extends Component {
  MODAL_TYPE_REASONS = 2;

  constructor() {
    super();
    this.render.bind(this);
    this.state = {
      showModal: false
    }
  }

  close() {
    this.setState({ showModal: false });
  }

  open(modalType) {
    this.setState({ 
      showModal: true,
      modalType: modalType
    });
  }

  handleSelect(eventKey) {
    event.preventDefault();
    alert(`selected ${eventKey}`);
  }

  onSave = (date, time) => {
    this.setState({date: date, time: time}, () => {
        console.log({date, time});
    });
    this.close()
  }

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
        <span onClick={this.open.bind(this, this.MODAL_TYPE_REASONS)}>{t('historical')}</span>

        <Modal size="lg" show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Body >
          <Picker onSave={(date, time) => this.onSave(date,time)} language='en' />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

const dynamicModal = withTranslation('common')(Timeline)

export default dynamicModal