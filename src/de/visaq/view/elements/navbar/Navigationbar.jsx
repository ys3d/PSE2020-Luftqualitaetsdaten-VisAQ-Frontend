import React from 'react';
import { Navbar, NavDropdown, Form, Nav, Dropdown } from 'react-bootstrap';
import PopupReasons from './PopupReasons';
import { BrowserRouter as Router } from "react-router-dom";
import PopupCauses from './PopupCauses';
import CookieNotice from '../CookieNotice';
import MapView from '../../MapView';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import AirQualityData from '../airquality/AirQualityData';
import * as data from '../../../../../resources/AirQualityData.json';
import './Navigationbar.css'


/**
 * Class containing the Navigationbar
 */
class Navigationbar extends React.Component {

    /**
     * Sole constructor of the class
     *
     * @param {Object} props    The properties.
     */
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            airQualityData: new AirQualityData(data.particulateMatter),
            activeAirQ : 0,
            activeLanguage: document.cookie.split(';').some((item) => item.trim().startsWith('Language=en')) ? 0 : 1,  
        }
    }

    /**
     * Opens an element of the navbar
     */
    handleOpen = () => {
        this.setState({ isOpen: true })
    }

    /**
     * Closes an element of the navbar
     */
    handleClose = () => {
        this.setState({ isOpen: false })
    }

    /**
     * Selector used for the Themes
     *
     * @param {*} id Id of the element that has to change
     */
    selectOnlyThis(id) {
        for (var i = 1; i <= 3; i++) {
            document.getElementById(i).checked = false;
        }
        document.getElementById(id).checked = true;
    }

    /**
       * Toggles the active state of the air quality buttons
       * @param {*} position position of the button
       * @param {*} lng choosen air quality
       */
    toggle(position, airQ){
        if (this.state.active === position) {
          this.setState({activeAirQ : null})
        } else {
          this.setState({activeAirQ : position})
        }
        this.setState(state => ({ airQualityData: new AirQualityData(airQ)}))
      }
    
      /**
       * Activates the button at the given position
       * @param {*} position Position of the button 
       */
      activateAirQuality(position) {
        if (this.state.activeAirQ === position) {
          return "#44c2d4";
        }
        return "";
      }

      /**
       * Activates the button at the given position
       * @param {*} position Position of the button 
       */
      activateLanguage(position) {
        if (this.state.activeLanguage === position) {
          return "#44c2d4";
        }
        return "";
      }

      /**
       * Toggles the active state of the language buttons
       * @param {*} position position of the button
       * @param {*} lng choosen language
       */
      toggleLanguage(position, lng){
        if (this.state.activeLanguage === position) {
          this.setState({activeLanguage : null})
        } else {
          this.setState({activeLanguage : position})
        }
        i18next.changeLanguage(lng)
      }

    /**
     * Returns the Navbar
     */
    render() {
        const { t } = this.props;
        return (
            <React.Fragment>
                <Router>
                    <div>
                        <CookieNotice />
                        <Navbar expand='lg' bg='light' className='navbar' id='navbar'>
                            <Navbar.Brand href=''>
                                <strong id='title'>VisAQ</strong>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls='navbar-nav' />
                            <Navbar.Collapse id='navbar-nav' >
                                <Nav className='mr-auto' justify variant='Tabs'>
                                    <Nav.Link 
                                        className='nav-link' 
                                        id='nav-link'  
                                        style={{color: this.activateAirQuality(0)}} 
                                        onClick={() => {this.toggle(0, new AirQualityData(data.particulateMatter))}}
                                        draggable="false"
                                    >
                                        {t('particulateMatter')}
                                    </Nav.Link>
                                    <Nav.Link 
                                        className='nav-link' 
                                        id='nav-link'  
                                        style={{color: this.activateAirQuality(1)}} 
                                        onClick={() => {this.toggle(1, new AirQualityData(data.humidity))}} 
                                        draggable="false"
                                    >
                                        {t('humidity')}
                                    </Nav.Link>
                                    <Nav.Link 
                                        className='nav-link' 
                                        id='nav-link' 
                                        style={{color: this.activateAirQuality(2)}} 
                                        onClick={() => {this.toggle(2, new AirQualityData(data.temperature))}} 
                                        draggable="false"
                                    >
                                        {t('temperature')}
                                    </Nav.Link>
                                    <Nav.Link 
                                        className='nav-link' 
                                        id='nav-link' 
                                        style={{color: this.activateAirQuality(3)}} 
                                        onClick={() => {this.toggle(3, new AirQualityData(data.airPressure))}} 
                                        draggable="false"
                                    >
                                        {t('airPressure')}
                                    </Nav.Link>
                                </Nav>
                                <Dropdown inline id='link'>
                                    {t('furtherFunc')}
                                </Dropdown>
                                <NavDropdown variant="success" id="dropdown-basic">
                                    <NavDropdown.Item 
                                        className='nav-link' 
                                        id='nav-link' 
                                        href='https://www.smartaq.net/de/participate/' 
                                        draggable="false"
                                    >
                                        {t('diy')}
                                    </NavDropdown.Item>
                                    <NavDropdown.Item 
                                        className='nav-link' 
                                        id='nav-link' 
                                        href='https://www.smartaq.net/en/dashboard/#/home' 
                                        draggable="false"
                                    >
                                        SmartAQNet
                                    </NavDropdown.Item>
                                    <NavDropdown.Item 
                                        className='nav-link' 
                                        id='nav-link' 
                                        eventKey={2} 
                                        href='#' 
                                        draggable="false"
                                    >
                                        <PopupReasons />
                                    </NavDropdown.Item>
                                    <NavDropdown.Item 
                                        className='nav-link' 
                                        id='nav-link' 
                                        eventKey={1} 
                                        href="#" 
                                        draggable="false"
                                    >
                                        <PopupCauses />
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <p>{t('expert-Mode')}</p>
                                    <Form.Group controlId='form-switch' alignRight>
                                        <Form.Check  
                                            type='checkbox' 
                                            id='expert-mode' 
                                            label={t('sensorOverviewExpert')} 
                                            onClick={() => this.props.overviewDetailHandler()} 
                                            draggable="false"
                                        />
                                    </Form.Group>
                                </NavDropdown>
                                <Nav className='ml-auto'>
                                    <Nav.Link 
                                        className='nav-link-lng' 
                                        id='nav-link-lng' 
                                        style={{color: this.activateLanguage(0)}} 
                                        onClick={() => {this.toggleLanguage(0, 'en')}} 
                                        draggable="false"
                                    >
                                        EN
                                    </Nav.Link>
                                    <Nav.Link 
                                        className='nav-link-lng' 
                                        id='nav-link-lng'  
                                        style={{color: this.activateLanguage(1)}} 
                                        onClick={() => {this.toggleLanguage(1, 'de')}} 
                                        draggable="false"
                                    >
                                        DE
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <MapView 
                        airQ={this.state.airQualityData} 
                        openHandler={(e) => this.props.openHandler(e)} 
                        iopenHandler={(e, a) => this.props.iopenHandler(e, a)}
                    />
                </Router>
            </React.Fragment>
        )
    }
  }

const dynamicNavbar = withTranslation('common')(Navigationbar)

export default dynamicNavbar