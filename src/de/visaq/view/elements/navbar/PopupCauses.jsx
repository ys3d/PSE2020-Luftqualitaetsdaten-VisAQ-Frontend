import React, { Component, event } from 'react';
import { Button, Modal, ModalTitle, Popover, Tooltip, Nav, NavItem, Row, Col, FormGroup, FieldGroup, Checkbox } from 'react-bootstrap'
import {withTranslation} from 'react-i18next';
import './Popup.css';

/**
 * Shows the consequences for air pollution.
 */
class PopupCauses extends Component {
  MODAL_TYPE_CAUSES = 2;

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
   * @param {Object} modalType  The modal type
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
        <span onClick={this.open.bind(this, this.MODAL_TYPE_CAUSES)}>{t('consequencesPM')}</span>
        <Modal size="lg" show={this.state.showModal} onHide={this.close.bind(this)}>
          <ModalTitle center className='title'>
            {t('consequencesPM')}
          </ModalTitle>
          <Modal.Body className='text'>
            {t('consequences')}
            <div className="network">&nbsp;</div>
            {t('consequencesOnHuman')}
            <div className="network">&nbsp;</div>
            {t('furtherInformation')}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)} className='button'>{t('close')}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const dynamicModal = withTranslation('causes')(PopupCauses)

export default dynamicModal