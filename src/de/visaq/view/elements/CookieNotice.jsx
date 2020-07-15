import React, { Component, event } from 'react'
import { Button, Modal, ModalTitle, Popover, Tooltip, Nav, NavItem, Row, Col, FormGroup, FieldGroup, Checkbox } from 'react-bootstrap'
import i18next from 'i18next';
import {withTranslation} from 'react-i18next';

class PopupReasons extends Component {
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
        <Modal size="lg" show={true} onHide={this.close.bind(this)}>
          <ModalTitle center>
            Cookies
          </ModalTitle>
          <Modal.Body>
            Wir verwenden auf dieser Website Cookies um ein besseres Nutzererlebnis zu garantieren.
            <Button onClick={this.close.bind(this)}>{t('moreInfo')}</Button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>{t('decline')}</Button>
            <Button onClick={this.close.bind(this)}>{t('accept')}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const dynamicModal = withTranslation('common')(PopupReasons)

export default dynamicModal