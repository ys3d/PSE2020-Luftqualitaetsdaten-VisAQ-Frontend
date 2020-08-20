
import React, { Component, event } from 'react'
import { Button, Modal, ModalTitle, Popover, Tooltip, Nav, NavItem, Row, Col, FormGroup, FieldGroup, Checkbox } from 'react-bootstrap'
import {withTranslation} from 'react-i18next';
import './CookieNotice.css'

/**
 * Class that shows more cookie informations
 */
class CookieNoticeInformation extends Component {

  /**
   * Sole constructor of the class
   */
  constructor() {
    super();
    this.render.bind(this);
    this.state = {
      showModal: false
    }
  }

  /**
   * Closes the Modal
   */
  close() {
    this.setState({ showModal: false });
  }

  /**
   * Opens the cookie Informations
   * 
   * @param {Object} modalType    The modal type
   */
  open(modalType) {
    this.setState({ 
      showModal: true,
      modalType: modalType
    });
  }

  /**
   * Tells if the Event was selected
   * 
   * @param {Object} eventKey   The event key
   */
  handleSelect(eventKey) {
    event.preventDefault();
    alert(`selected ${eventKey}`);
  }

  /**
   * Returns the Modal containing the cookie informations
   */
  render () {
    const { t } = this.props;
    return (
        <div>
            <span onClick={this.open.bind(this)}>
                {t('moreInfoCookies')}
            </span>
            <Modal size="lg" show={this.state.showModal} onHide={this.close.bind(this)} className='information'>
                <ModalTitle className={'infoTitle'}>
                 {t('moreInfoCookies')}
                </ModalTitle>
                <Modal.Body className={'text'}>
                    <strong>{t('cookie1')}</strong> 
                    <div className="network">&nbsp;</div>
                    {t('cookie2')}
                    <div className="network">&nbsp;</div>
                    <strong>{t('cookie3')}</strong>
                    <div className="network">&nbsp;</div>
                    {t('cookie4')} 
                    <div className="network">&nbsp;</div>
                    <strong>{t('cookie5')}</strong> <br />
                    <strong>{t('cookie6')}</strong>
                    <div className="network">&nbsp;</div>
                    {t('cookie7')}
                    <div className="network">&nbsp;</div>
                    {t('cookie8')} <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close.bind(this)} className={'button'}>
                    {t('close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
  }
}

const dynamicModal = withTranslation('cookies')(CookieNoticeInformation)

export default dynamicModal