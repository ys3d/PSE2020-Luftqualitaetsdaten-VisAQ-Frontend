import React, { Component, event} from 'react'
import { Button, Modal, ModalTitle, Popover, Tooltip, Nav, NavItem, Row, Col, FormGroup, FieldGroup, Checkbox } from 'react-bootstrap'
import i18next from 'i18next';
import {withTranslation} from 'react-i18next';

class CookieNotice extends Component {
  MODAL_TYPE_REASONS = 2;

  constructor() {
    super();
    this.render.bind(this);
    this.state = {
      showModal: document.cookie.split(';').some((item) => item.trim().startsWith('Language=')) ? false : true,
      showMoreModals : false
    };
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  closeModal() {
    this.setState({ showMoreModal: false,
    showModal: true });
  }

  open() {
    this.setState({ 
      showMoreModals: true,
    });
  }

  handleSelect(eventKey) {
    event.preventDefault();
    alert(`selected ${eventKey}`);
  }

  setCookie = () => {;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        document.cookie = "Latitude=" + position.coords.latitude + ';max-age='+60*60*24*365;
        document.cookie = "Longitude=" + position.coords.longitude + ';max-age='+60*60*24*365;
      });
    }
    document.cookie='Language=' + i18next.language + ';max-age='+60*60*24*365;
    this.setState({ showModal: false });
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

    const { t} = this.props;
    return (
      <div>
        <Modal size="lg" show={this.state.showModal} onHide={this.closeModal.bind(this)}>
          <ModalTitle center>
            Cookies
          </ModalTitle>
          <Modal.Body>
            Wir verwenden auf dieser Website Cookies um ein besseres Nutzererlebnis zu garantieren.
            <Button eventKey={1}>
              <moreInfo />
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal.bind(this)}>{t('decline')}</Button>
            <Button onClick={this.setCookie}>{t('accept')}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

function moreInfo() {
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
  const { t} = this.props;
  return(
    <div>
      <span onClick={this.open.bind(this)}>{t('moreInfo')}</span>
      <Modal size="lg" show={true} onHide={this.close.bind(this)} scrollable={true}>
        <ModalTitle center>
        {t('moreInfo')}
        </ModalTitle>
        <Modal.Body>
          MOREINFOa
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close.bind(this)}>{t('close')}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

const dynamicModal = withTranslation('common')(CookieNotice)

export default dynamicModal