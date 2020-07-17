
import React, { Component, event } from 'react'
import { Button, Modal, ModalTitle, Popover, Tooltip, Nav, NavItem, Row, Col, FormGroup, FieldGroup, Checkbox } from 'react-bootstrap'
import i18next from 'i18next';
import {withTranslation} from 'react-i18next';

class CookieNoticeInformation extends Component {
  MODAL_TYPE_CAUSES = 2;

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
        <span onClick={this.open.bind(this, this.MODAL_TYPE_CAUSES)}>Mehr Informationen zu unseren Cookies</span>

        <Modal size="lg" show={this.state.showModal} onHide={this.close.bind(this)}>
          <ModalTitle center>
            Mehr Informationen zu unseren Cookies
          </ModalTitle>
          <Modal.Body>
           Beschreibung der Cookies die wir verwenden, also Geolocation und Sprache
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>{t('close')}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const dynamicModal = withTranslation('common')(CookieNoticeInformation)

export default dynamicModal