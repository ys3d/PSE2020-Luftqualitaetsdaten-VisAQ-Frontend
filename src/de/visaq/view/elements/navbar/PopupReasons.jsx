import React, { Component, event } from 'react';
import { Button, Modal, ModalTitle, Popover, Tooltip, Nav, NavItem, Row, Col, FormGroup, FieldGroup, Checkbox } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { PieChart } from 'react-minimal-pie-chart';
import { Container } from 'react-bootstrap';
import './Popup.css';

/**
 * Shows the reasons for air pollution.
 */
class PopupReasons extends Component {
  MODAL_TYPE_REASONS = 2;

  /**
   * Sole constructor of the class.
   */
  constructor() {
    super();
    this.render.bind(this);
    this.state = {
      showModal: false,
      width: window.innerWidth
    }
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }
  
  /**
   * Handles stateChange on window-resizing
   */
  handleWindowSizeChange() {
    this.setState({ width: window.innerWidth });
  };

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

  handleSelect(eventKey) {
    event.preventDefault();
    alert(`selected ${eventKey}`);
  }

  render() {
    const { t } = this.props;

    const isDesktop = this.state.width > 500;

    return (
      <div>
        <span onClick={this.open.bind(this, this.MODAL_TYPE_REASONS)}>{t('reasonsPM')}</span>
        <Modal size="lg" show={this.state.showModal} onHide={this.close.bind(this)}>
          <ModalTitle center className='title'>
            {t('reasonsPM')}
          </ModalTitle>
          <Modal.Body className='text'>
            {t('intro')}
            <div className="network">&nbsp;</div>
            {t('descriptionNaturalReasons')}
            <div className="network">&nbsp;</div>
            {t('descriptionHumanmadeReasons')}
            <div className="network">&nbsp;</div>

            <div className="network">&nbsp;</div>
            {t('procentualIndustry')}
            <div className="network">&nbsp;</div>
            {t('procentualCars')}
            <div className="network">&nbsp;</div>
            {t('procentualRubble')}
            <div className="network">&nbsp;</div>
            {t('procentualOther')}
            {isDesktop &&
              <PieChart
                data={[
                  { title: t('nameOther'), value: 1, color: '#4281a4' },
                  { title: t('nameCars'), value: 33, color: '#48a9a6' },
                  { title: t('nameIndustry'), value: 45, color: '#e4dfda' },
                  { title: t('nameRubble'), value: 21, color: '#d4b483' }
                ]}
                label={({ dataEntry }) => dataEntry.title}
                className='piechart'
                labelStyle={{
                  fontSize: '5px',
                  fontFamily: 'sans-serif'
                }}
                radius={42}
                labelPosition={112}
              />
            }

            {t('end')}
            <div className="network">&nbsp;</div>
            {t('furtherInformation')}

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)} className='button'>{t('close')}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const dynamicModal = withTranslation('reasons')(PopupReasons)

export default dynamicModal