import React, { Component, event } from 'react'
import { Button, Modal, ModalTitle, Popover, Tooltip, Nav, NavItem, Row, Col, FormGroup, FieldGroup, Checkbox } from 'react-bootstrap'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import CookieNoticeInformation from './CookieNoticeInformation'
import './CookieNotice.css'

/**
 * Class that creates the cookies and shows the cookie notice
 */
class CookieNotice extends Component {
  constructor() {
    super();
    this.render.bind(this);
    this.state = {
        showModal: document.cookie.split(';').some((item) => item.trim().startsWith('Language=')) ? false : true,
    };
  }

  /**
   * Gets the safed language out of the cookie
   * 
   * @param {String} name   The name 
   */
  getLanguage = (name) => {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('Language='))) {
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) {
            console.log(match[2]);
            return match[2];
        } else {
            console.log('--something went wrong---');
        }
    } else {
        return 'de'
    }
  }

  /**
   * Run when loading the site. Loads the saved language 
   */

  componentWillMount() {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('Language='))) {
        i18next.changeLanguage(this.getLanguage('Language'));
        console.log(this.getLanguage('Language'));
    }
  }

  /**
   * Closes the Modal
   */
  close() {
    this.setState({ showModal: false });
  }

  /**
   * Tells if the Event was selected
   * 
   * @param {Object} eventKey   An event
   */
  handleSelect(eventKey) {
    event.preventDefault();
    alert(`selected ${eventKey}`);
  }

  /**
   * Saves the language in the cookie
   */
  setCookie = () => {
    document.cookie = 'Language=' + i18next.language + ';max-age=' + 60 * 60 * 24 * 365;
    this.setState({ showModal: false });
  } 	

  /**
   * Returns the cookieNotice
   */
  render() {
    const { t } = this.props;
    return (
      <div>
        <Modal 
            size="lg" 
            show={this.state.showModal} 
            onHide={this.close.bind(this)}  
            backdrop="static"
            className='div'
          >
          <ModalTitle center className={'title'}>
           Cookies
          </ModalTitle>
          <Modal.Body className={'text'}>
            {t('cookieNotice')}
            <div className="network">&nbsp;</div>
            <Button eventKey={1} className={'buttonLink'} variant="link" className='moreInfo'>
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

const cookieNotice = withTranslation('cookies')(CookieNotice)

export default cookieNotice