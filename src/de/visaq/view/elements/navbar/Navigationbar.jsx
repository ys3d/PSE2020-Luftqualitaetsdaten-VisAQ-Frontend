import React, { state, isOpen } from 'react';
import {
    Navbar, NavDropdown, Form, FormCheck, FormControl, NavbarToggler, Collapse, Nav, NavItem,
    NavLink, NavbarBrand, DropdownToggle, Dropdown, Button, DropdownMenu, ButtonGroup
} from 'react-bootstrap';
import styled from 'styled-components';
import PopupReasons from './PopupReasons';
import { BrowserRouter as Router } from "react-router-dom";
import PopupCauses from './PopupCauses';
import CookieNotice from '../CookieNotice';
import MapView from '../../MapView';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import AirQualityData from '../airquality/AirQualityData';
import * as data from '../../../../../resources/AirQualityData.json';
import Timeline from './Timeline'
import './Navigationbar.css'


/* Constructs the Navigationbar with all functions */
class Navigationbar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            airQualityData: new AirQualityData(data.particulateMatter)
        };
    }

    handleOpen = () => {
        this.setState({ isOpen: true })
    }

    handleClose = () => {
        this.setState({ isOpen: false })
    }

    selectOnlyThis(id) {
        for (var i = 1; i <= 3; i++) {
            document.getElementById(i).checked = false;
        }
        document.getElementById(id).checked = true;
    }

    shouldComponentUpdate(nextprops, nextState) {
        console.log(nextprops.airQ);
        if (JSON.stringify(this.state.airQualityData) !== JSON.stringify(nextprops.airQ)) {
            console.log(nextprops.airQ);
            return true;
        } else {
            return false;
        }
      }

    

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
                                    <NavDropdown.Item href='https://www.smartaq.net/de/participate/'>
                                        {t('diy')}
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className='nav-link' id='nav-link' href='https://www.smartaq.net/en/dashboard/#/home'>
                                        SmartAQNet
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href='#'>
                                        <Timeline />
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className='nav-link' id='nav-link' eventKey={2} href='#'>
                                        <PopupReasons />
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className='nav-link' id='nav-link' eventKey={1} href="#">
                                        <PopupCauses />
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <Form.Group controlId='formBasicCheckbox' label='Experten-Einstellungen' inline>
                                        {t('colorScheme')}
                                        <Form.Check type='checkbox' id='1' label='Dark-Mode' onClick={() => this.selectOnlyThis(1)} />
                                        <Form.Check type='checkbox' id='2' label={t('colorBlind')} onClick={() => this.selectOnlyThis(2)} />
                                        <Form.Check type='checkbox' id='3' label={t('standard')} checked onClick={() => this.selectOnlyThis(3)} />
                                    </Form.Group>
                                </NavDropdown>
                                <Dropdown inline id='link'>
                                    {t('expert-Mode')}
                                </Dropdown>
                                <NavDropdown variant="success" id="dropdown-basic">
                                    <Form.Group controlId='form-switch' alignRight>
                                        <Form.Check type='checkbox' id='1' label={t('officalSensor')} checked />
                                        <Form.Check type='checkbox' id='2' label={t('nonOfficalSensor')} checked />
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
                    <MapView airQ={this.state.airQualityData} openHandler={(e) => this.props.openHandler(e)}/>
                </Router>
            </React.Fragment>
        )
    }
  }
  
const dynamicNavbar = withTranslation('common')(Navigationbar)

export default dynamicNavbar
