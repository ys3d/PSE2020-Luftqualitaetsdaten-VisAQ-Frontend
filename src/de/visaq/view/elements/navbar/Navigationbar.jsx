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
            airQualityData: new AirQualityData(data.particulateMatter)
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
     * Returns the Navbar
     */
    render() {
        const { t } = this.props;
        return (
            <React.Fragment>
                <Router>
                    <div>
                        <CookieNotice />
                        <Navbar expand='lg' bg='light' style={{ width: '100%', height: '20%' }} >
                            <Navbar.Brand href=''>
                                <strong id='title'>VisAQ</strong>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls='navbar-nav' />
                            <Navbar.Collapse id='navbar-nav' >
                                <Nav className='mr-auto' justify variant='Tabs'>
                                    <Nav.Link className='nav-link' id='nav-link' onClick={() => this.setState(state => ({ airQualityData: new AirQualityData(data.particulateMatter) }))}>
                                        {t('particulateMatter')}
                                    </Nav.Link>
                                    <Nav.Link className='nav-link' id='nav-link' onClick={() => this.setState(state => ({ airQualityData: new AirQualityData(data.humidity) }))}>
                                        {t('humidity')}
                                    </Nav.Link>
                                    <Nav.Link className='nav-link' id='nav-link' onClick={() => this.setState(state => ({ airQualityData: new AirQualityData(data.temperature) }))}>
                                        {t('temperature')}
                                    </Nav.Link>
                                    <Nav.Link className='nav-link' id='nav-link' onClick={() => this.setState(state => ({ airQualityData: new AirQualityData(data.airPressure) }))}>
                                        {t('airPressure')}
                                    </Nav.Link>
                                </Nav>
                                <Dropdown inline id='link'>
                                    {t('furtherFunc')}
                                </Dropdown>
                                <NavDropdown variant="success" id="dropdown-basic">
                                    <NavDropdown.Item className='nav-link' id='nav-link' href='https://www.smartaq.net/de/participate/'>
                                        {t('diy')}
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className='nav-link' id='nav-link' href='https://www.smartaq.net/en/dashboard/#/home'>
                                        SmartAQNet
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className='nav-link' id='nav-link' eventKey={2} href='#'>
                                        <PopupReasons />
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className='nav-link' id='nav-link' eventKey={1} href="#">
                                        <PopupCauses />
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <Form.Group controlId='form-switch' alignRight>
                                        <Form.Check  type='checkbox' id='expert-mode' label={t('sensorOverviewExpert')} onClick={() => this.props.overviewDetailHandler()} />
                                    </Form.Group>
                                </NavDropdown>
                                <Nav className='ml-auto'>
                                    <Nav.Link className='nav-link-lng' id='nav-link-lng' onClick={() => { i18next.changeLanguage('en') }}>
                                        en
                                    </Nav.Link>
                                    <Nav.Link className='nav-link-lng' id='nav-link-lng' onClick={() => { i18next.changeLanguage('de') }}>
                                        de
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <MapView airQ={this.state.airQualityData} openHandler={(e) => this.props.openHandler(e)} iopenHandler={(e, a) => this.props.iopenHandler(e, a)}/>
                </Router>
            </React.Fragment>
        )
    }
  }

const dynamicNavbar = withTranslation('common')(Navigationbar)

export default dynamicNavbar
