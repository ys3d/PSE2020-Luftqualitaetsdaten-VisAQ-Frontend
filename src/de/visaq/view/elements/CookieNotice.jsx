import React, { Component, event } from 'react'
import { Button, Modal, ModalTitle, Popover, Tooltip, Nav, NavItem, Row, Col, FormGroup, FieldGroup, Checkbox } from 'react-bootstrap'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import CookieNoticeInformation from './CookieNoticeInformation'
import './CookieNotice.css'

class CookieNotice extends Component {
  constructor() {
    super();
    this.render.bind(this);
    this.state = {
      showModal: document.cookie.split(';').some((item) => item.trim().startsWith('Language=')) ? false : true,
    };
  }

  getLanguage = (name) => {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('Language='))) {
      var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) {
        console.log(match[2]);
        return match[2];
      }
      else {
        console.log('--something went wrong---');
      }
    } else {
      return 'de'
    }
  }

  componentWillMount() {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('Language='))) {
      i18next.changeLanguage(this.getLanguage('Language'));
      console.log(this.getLanguage('Language'));
    }
  }

  close() {
    this.setState({ showModal: false });
  }

  handleSelect(eventKey) {
    event.preventDefault();
    alert(`selected ${eventKey}`);
  }
  // Saves the Language in the Cookie
  setCookie = () => {
    document.cookie = 'Language=' + i18next.language + ';max-age=' + 60 * 60 * 24 * 365;
    this.setState({ showModal: false });
  }

  render() {
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
        <Modal size="lg" show={this.state.showModal} onHide={this.close.bind(this)}  backdrop="static">
          <ModalTitle center className={'title'}>
           Cookies
          </ModalTitle>
          <Modal.Body className={'text'}>
            {t('cookieNotice')}
            <br />
            <br />
            <Button eventKey={1} className={'buttonLink'} variant="link">
              <CookieNoticeInformation />
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)} className={'button'}>
            {t('decline')}
            </Button>
            <Button onClick={this.setCookie} className={'button'}>
            {t('accept')}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const cookieNotice = withTranslation('common')(CookieNotice)

export default cookieNotice