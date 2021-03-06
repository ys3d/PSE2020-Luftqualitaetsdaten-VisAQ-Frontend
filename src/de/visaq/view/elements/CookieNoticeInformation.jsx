
import React, { Component, event } from 'react'
import { Button, Modal, ModalTitle } from 'react-bootstrap'
import { withTranslation } from 'react-i18next';
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
    render() {
        const { t } = this.props;
        return (
            <div>
                <span onClick={this.open.bind(this)}>
                    {t('moreInfo')}
                </span>
                <Modal size="lg" show={this.state.showModal} onHide={this.close.bind(this)} className='information'>
                    <ModalTitle className={'infoTitle'}>
                        {t('moreInfo')}
                    </ModalTitle>
                    <Modal.Body className={'text'}>
                        <strong>{t('whatAreCookiesTitle')}</strong>
                        <div className="network">&nbsp;</div>
                        {t('whatAreCookiesText')}
                        <div className="network">&nbsp;</div>
                        <strong>{t('whyDoWeUseCookiesTitle')}</strong>
                        <div className="network">&nbsp;</div>
                        {t('whyDoWeUseCookiesText')}
                        <div className="network">&nbsp;</div>
                        <strong>{t('whichKindOfCookiesTitle')}</strong> <br />
                        <strong>{t('necessaryCookies')}</strong>
                        <div className="network">&nbsp;</div>
                        {t('necessaryCookiesList')}
                        <div className="network">&nbsp;</div>
                        {t('languageCookie')} <br />
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
