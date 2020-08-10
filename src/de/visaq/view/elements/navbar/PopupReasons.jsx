import React, { Component, event } from 'react'
import { Button, Modal, ModalTitle, Popover, Tooltip, Nav, NavItem, Row, Col, FormGroup, FieldGroup, Checkbox } from 'react-bootstrap'
import {withTranslation} from 'react-i18next';
import './Popup.css'

/**
 * Shows the reasons for air pollution.
 */
class PopupReasons extends Component {
  MODAL_TYPE_REASONS = 2;

  /**
   * Sole constructor of the class.
   */
  constructor() {
    super();
    this.render.bind(this);
    this.state = {
      showModal: false
    }
  }

  /**
   * Closes the popup.
   */
  close() {
    this.setState({ showModal: false });
  }

  /**
   * Opens the popup.
   * 
   * @param {Object} modalType    The modal type
   */
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

  render () {
    const { t } = this.props;
    return (
      <div>
        <span onClick={this.open.bind(this, this.MODAL_TYPE_REASONS)}>{t('reasonsPM')}</span>
        <Modal size="lg" show={this.state.showModal} onHide={this.close.bind(this)}>
          <ModalTitle center className='title'>
            {t('reasonsPM')}
          </ModalTitle>
          <Modal.Body>
            {t('reasons')}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)} className='button'>{t('close')}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const dynamicModal = withTranslation('common')(PopupReasons)

export default dynamicModal