import React from 'react';
import { Button, Modal, ModalTitle, Popover, Tooltip, Nav, NavItem, Row, Col, FormGroup, FieldGroup, Checkbox } from 'react-bootstrap'
import i18next from 'i18next';
import {withTranslation} from 'react-i18next';
import DatePicker from 'react-datepicker'

class Timeline extends React.Component {
  
    constructor() {
        super();
        this.render.bind(this);
        this.state = {
          showModal: false
        }
      }

   onSave = (date, time) => {
    this.setState({date: date, time: time}, () => {
        console.log({date, time});
    })
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
      const { t } = this.props;
      return (
        <div>
          <span onClick={this.open.bind(this)}>{t('causesPM')}</span>
          <Modal size="lg" show={this.state.showModal} onHide={this.close.bind(this)}>
            <ModalTitle center>
              {t('causesPM')}
            </ModalTitle>
            <Modal.Body>
                <DatePicker 
                    selected={new Date()}
                //  onchange={date => this.setState(this.currentDate: date)}/>
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    timeCaption="time"
                    dateFormat='MMMM d, yyyy h:mm aa'
                />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close.bind(this)}>{t('close')}</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )
    }
  }
  
  const dynamicTimeline = withTranslation('common')(Timeline)
  
  export default dynamicTimeline
