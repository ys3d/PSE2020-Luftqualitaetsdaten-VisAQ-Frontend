import React, { Component, event } from 'react'
import { Button, Modal, ModalTitle } from 'react-bootstrap'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import CookieNoticeInformation from './CookieNoticeInformation'
import './CookieNotice.css'
import Cookies from 'js-cookie';

/**
 * Class that creates the cookies and shows the cookie notice
 */
class CookieNotice extends Component {
    constructor() {
        super();
        this.render.bind(this);
        this.state = {
            showModal: Cookies.get("visaq_allowcookies") === undefined,
        };

        i18next.changeLanguage(Cookies.get('visaq_language') || 'de');
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
    setCookie(allow) {
        this.setState({ showModal: false }, () => {
            Cookies.set("visaq_allowcookies", allow, { expires: 365, sameSite: 'lax' });
        });
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
                        <Button eventKey={1} className={'buttonLink moreInfo'} variant="link">
                            <CookieNoticeInformation />
                        </Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.setCookie.bind(this, false)} className={'button'}>
                            {t('decline')}
                        </Button>
                        <Button onClick={this.setCookie.bind(this, true)} className={'button'}>
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
