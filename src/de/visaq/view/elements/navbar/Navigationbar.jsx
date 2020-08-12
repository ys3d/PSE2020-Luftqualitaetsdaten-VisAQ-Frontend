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
import './Navigationbar.css';

let ov = [true, false];

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
            isOpen : false,
            airQualityData: new AirQualityData(data.particulateMatter),
            overlays : ov
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
     * Activates the Sensor Overlay.
     */
    toggleChange0 = () => {
        ov[0] = !ov[0];
        if (ov[0])  {
          ov[1] = false;
        }
        this.setState({overlays : ov});
      }
    
      /**
       * Activates the Interpolation Overlay.
       */
      toggleChange1 = () => {
        ov[1] = !ov[1];
        if(ov[1])  {
          ov[0] = false;
        }
        this.setState({overlays : ov});
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
                                    {t('mapOverlay')}
                                </Dropdown>
                                <NavDropdown variant="success" id="dropdown-basic">
                                    <Form.Group controlId='form-switch' alignRight>
                                    <label>
                                        <input  type="checkbox"
                                                checked={ov[0]}
                                                onChange={this.toggleChange0}
                                                id='expert-mode'
                                        />
                                    {t('Sensors')}
                                    </label>
                                    <label>
                                    <input  type="checkbox"
                                            checked={ov[1]}
                                            onChange={this.toggleChange1}
                                            id='expert-mode'
                                    />
                                    {t('Interpolation')}
                                    </label>
                                    </Form.Group>
                                </NavDropdown>
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
                                    {t('expert-Mode')} 
                                    <Form.Group controlId='form-switch' alignRight>
                                        <Form.Check type='checkbox' id='3' label={t('sensorOverviewExpert')} onClick={() => this.props.overviewDetailHandler()} />
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
                    <MapView airQ={this.state.airQualityData} openHandler={(e) => this.props.openHandler(e)} 
                    iopenHandler={(e, a) => this.props.iopenHandler(e, a)} overlays={this.state.overlays}/>
                </Router>
            </React.Fragment>
        )
    }
  }

const dynamicNavbar = withTranslation('common')(Navigationbar)

export default dynamicNavbar
