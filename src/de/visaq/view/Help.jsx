import React, { Component, event } from 'react';
import { Button, Modal, ModalTitle } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import './elements/navbar/Popup.css';
import { MdHelpOutline } from 'react-icons/md';

class Help extends Component {
    constructor(props) {
        super(props);
        this.render.bind(this);
        this.state = {
            showModal: false
        }
    }

    MODAL_TYPE_HELP = 2;

    /**
     * Closes the popup.
     */
    close() {
        this.setState({ showModal: false });
    }

    /**
     * Opens the popup.
     *
     * @param {Object} modalType    The modal type
     */
    open(modalType) {
        this.setState({
            showModal: true,
            modalType: modalType
        });
    }

    handleSelect() {
        event.preventDefault();
    }

    render() {
        const { t } = this.props;
        return (
            <div>
                <span onClick={this.open.bind(this, this.MODAL_TYPE_HELP)}>{t('help')} <MdHelpOutline className='help-button'/></span>
                <Modal size="lg" show={this.state.showModal} onHide={this.close.bind(this)}>
                    <ModalTitle center className='title'>
                        {t('help')}
                    </ModalTitle>
                    <Modal.Body className='text'>
                        {this.props.helpText}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)} className='button'>{t('close')}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const dynamicHelp = withTranslation('help')(Help)

export default dynamicHelp;
