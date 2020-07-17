import React, { Component, event} from 'react'
import { Button, Modal, ModalTitle, Popover, Tooltip, Nav, NavItem, Row, Col, FormGroup, FieldGroup, Checkbox } from 'react-bootstrap'
import i18next from 'i18next';
import {withTranslation} from 'react-i18next';
import CookieNoticeInformation from './CookieNoticeInformation'

class CookieNotice extends Component {
  MODAL_TYPE_REASONS = 2;

  constructor() {
    super();
    this.render.bind(this);
    this.state = {
      showModal: document.cookie.split(';').some((item) => item.trim().startsWith('Language=')) ? false : true,
    };
  }

  getLanguage() {
      if (document.cookie.split(';').some((item) => item.trim().startsWith('Language='))) {
        return this.getCookie('Language');
      } else {
        return 'de'
      }
    }

    getCookie(name) {
      if (document.cookie.split(';').some((item) => item.trim().startsWith('Language='))) {
      var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) {
        console.log(match[2]);
        return match[2];
      }
      else{
           console.log('--something went wrong---');
      }
    }
    }

  componentWillMount() {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('Language='))) {
      i18next.changeLanguage(this.getCookie('Language'));
    } 
  }


  close() {
    this.setState({ showModal: false });
  }

  handleSelect(eventKey) {
    event.preventDefault();
    alert(`selected ${eventKey}`);
  }

  setCookie = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        document.cookie = "Latitude=" + position.coords.latitude + ';max-age='+60*60*24*365;
        document.cookie = "Longitude=" + position.coords.longitude + ';max-age='+60*60*24*365;
      });
    }
    document.cookie='Language=' + i18next.language + ';max-age='+60*60*24*365;
    this.setState({ showModal: false });
  }

  getLongitude() {
    return this.getCookie('Longitude');
  }
  
  getLatitude() {
  return this.getCookie('Latitude');
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
        <Modal size="lg" show={this.state.showModal} onHide={this.close.bind(this)}>
          <ModalTitle center>
            Cookies
          </ModalTitle>
          <Modal.Body>
            Wir verwenden auf dieser Website Cookies um ein besseres Nutzererlebnis zu garantieren.
            <Button eventKey={1}>
              <CookieNoticeInformation />
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>{t('decline')}</Button>
            <Button onClick={this.setCookie}>{t('accept')}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const cookieNotice = withTranslation('common')(CookieNotice)

export default cookieNotice