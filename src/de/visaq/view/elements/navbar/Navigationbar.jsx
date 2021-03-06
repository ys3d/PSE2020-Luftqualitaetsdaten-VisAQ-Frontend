import React, { Component } from 'react';
import { Button, Navbar, NavDropdown, Form, Nav } from 'react-bootstrap';
import PopupReasons from './PopupReasons';
import { BrowserRouter as Router } from "react-router-dom";
import PopupCauses from './PopupCauses';
import CookieNotice from '../CookieNotice';
import MapView from '../../MapView';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import AirQualityData from '../airquality/AirQualityData';
import TimeQuery from '../map/TimeQuery';
import * as data from '../../../../../resources/AirQualityData.json';
import './Navigationbar.css';
import Help from '../../Help';
import HelpPopover from '../../HelpPopover';
import { Row, Col } from "react-bootstrap";
import Overview from '../map/overview/Overview';
import OverlayEnum from '../../overlayfactory/OverlayEnum';
import Theme from '../theme/Theme';
import ColorblindMode from '../theme/ColorblindMode';
import Impressum from '../../Impressum';

let startTime;
let tempTime;
/**
 * Class containing the Navigationbar
 */
class Navigationbar extends Component {

    /**
     * Sole constructor of the class
     *
     * @param {Object} props    The properties.
     */
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            airQualityData: AirQualityData.getInstance(),
            activeAirQualityData: 0,
            activeLanguage: i18next.language === 'en' ? 0 : 1,
            overlays: OverlayEnum.sensor,
            theme: Theme.getTheme(),
            colorblindMode: ColorblindMode.getMode(),
            historicalMode: false,
            time: Date.now()
        }
        startTime = this.state.time;
        tempTime = this.state.time;
    }

    componentDidMount() {
        this.activateTheme(this.state.theme);
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
    activateSensors = () => {
        this.setState({ overlays: OverlayEnum.sensor });
        this.props.closeHandler();
    }

    /**
     * Activates the Interpolation Overlay.
     */
    activateInterpolation = () => {
        this.setState({ overlays: OverlayEnum.interpolation });
        this.props.closeHandler();
    }

    activateTheme(newTheme) {
        Theme.setTheme(newTheme);
        this.setState({ theme: newTheme });
    }

    activateColorblindMode(newMode) {
        ColorblindMode.setMode(newMode);
        this.setState({ colorblindMode: newMode });
    }

    /**
       * Toggles the active state of the air quality buttons
       * @param {Number} position position of the button
       * @param {String} lng choosen air quality
       */
    toggle(position, airQualityData) {
        if (this.state.active === position) {
            this.setState({ activeAirQualityData: null })
        } else {
            this.setState({ activeAirQualityData: position })
        }
        AirQualityData.setInstance(new AirQualityData(airQualityData));
        this.setState(() => ({ airQualityData: AirQualityData.getInstance() }))
    }

    /**
     * Activates the button at the given position
     * @param {Number} position Position of the button
     */
    activateAirQuality(position) {
        if (this.state.activeAirQualityData === position) {
            return window.getComputedStyle(document.body).getPropertyValue("--main-page-color");
        }
        return "";
    }

    /**
     * Activates the button at the given position
     * @param {Number} position Position of the button
     */
    activateLanguage(position) {
        if (this.state.activeLanguage === position) {
            return window.getComputedStyle(document.body).getPropertyValue("--main-page-color");
        }
        return "";
    }

    /**
     * Toggles the active state of the language buttons
     * @param {Number} position position of the button
     * @param {String} lng choosen language
     */
    toggleLanguage(position, lng) {
        if (this.state.activeLanguage === position) {
            this.setState({ activeLanguage: null })
        } else {
            this.setState({ activeLanguage: position })
        }
        i18next.changeLanguage(lng)
    }

    /**
     * Activates and deactivates the historicalMode
     */
    toggleHistoricalMode() {
        if (!this.state.historicalMode) {
            this.setState({ historicalMode: true });
        } else {
            this.setState({ time: startTime, historicalMode: false });
        }
    }

    /**
     * Saves the temporal the time.
     *
     * @param {String} time     The selected time
     */
    setTime(time) {
        tempTime = time;
    }

    /**
     * Sets the time.
     */
    startTimeQuery() {
        this.setState({ time: tempTime });
    }


    /**
     * Returns the Navbar
     */
    render() {
        const { t } = this.props;
        return (
            <React.Fragment>
                <Router>
                    <div className="navbar-main">
                        <CookieNotice />
                        <Navbar expand='lg' className='navbar' id='navbar'>
                            <Navbar.Brand href=''>
                                <strong id='title'>VisAQ</strong>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls='navbar-nav' />
                            <Navbar.Collapse id='navbar-nav' >
                                <Nav className='mr-auto' justify variant='Tabs'>
                                    <Nav.Link
                                        className='nav-link'
                                        id='nav-link'
                                        style={{ color: this.activateAirQuality(0) }}
                                        onClick={() => { this.toggle(0, data.particulateMatter) }}
                                        draggable="false"
                                    >
                                        {t('particulateMatter')}
                                    </Nav.Link>
                                    <Nav.Link
                                        className='nav-link'
                                        id='nav-link'
                                        style={{ color: this.activateAirQuality(1) }}
                                        onClick={() => { this.toggle(1, data.humidity) }}
                                        draggable="false"
                                    >
                                        {t('humidity')}
                                    </Nav.Link>
                                    <Nav.Link
                                        className='nav-link'
                                        id='nav-link'
                                        style={{ color: this.activateAirQuality(2) }}
                                        onClick={() => { this.toggle(2, data.temperature) }}
                                        draggable="false"
                                    >
                                        {t('temperature')}
                                    </Nav.Link>
                                    <Nav.Link
                                        className='nav-link'
                                        id='nav-link'
                                        style={{ color: this.activateAirQuality(3) }}
                                        onClick={() => { this.toggle(3, data.airPressure) }}
                                        draggable="false"
                                    >
                                        {t('airPressure')}
                                    </Nav.Link>
                                </Nav>
                                <Nav>
                                    <NavDropdown title={t('mapOverlay')} variant="success" id="dropdown-basic">
                                        <p className='dropdown-header'>{t('mapOverlay')} <HelpPopover placement="auto" title={t('mapOverlay')} content={t('popoverMapOverlay')} /></p>
                                        <Form.Group controlId='form-switch'>
                                            <Form.Check
                                                type='radio'
                                                id='sensor-overlay'
                                                checked={OverlayEnum.sensor === this.state.overlays}
                                                label={t('sensors')}
                                                onChange={() => this.activateSensors()}
                                                draggable="false"
                                            />
                                            <Form.Check
                                                type='radio'
                                                id='interpolation-overlay'
                                                checked={OverlayEnum.interpolation === this.state.overlays}
                                                label={t('interpolation')}
                                                onChange={() => this.activateInterpolation()}
                                                draggable="false"
                                            />
                                        </Form.Group>
                                    </NavDropdown>
                                    <NavDropdown title={t('furtherFunctions')} variant="success" id="dropdown-basic">
                                        <p className='dropdown-header'>{t('expertMode')} <HelpPopover placement="auto" title={t('expertMode')} content={t('popoverExpertMode')} /></p>
                                        <Form.Group controlId='form-switch'>
                                            <Form.Check
                                                type='switch'
                                                id='expert-mode'
                                                label={t('sensorOverviewExpert')}
                                                onClick={() => this.props.overviewDetailHandler()}
                                                draggable="false"
                                            />
                                        </Form.Group>
                                        <NavDropdown.Divider />
                                        <p className='dropdown-header'>{t('historicalMode')} <HelpPopover placement="auto" title={t('historicalMode')} content={t('popoverHistoricalMode')} /></p>
                                        <Form.Group controlId='form-switch'>
                                            <Form.Check
                                                type='switch'
                                                id='historical-mode'
                                                label={t('historicalView')}
                                                draggable="false"
                                                onClick={() => this.toggleHistoricalMode()}
                                            />
                                        </Form.Group>
                                        <Form inline id='form-timequery'>
                                            <TimeQuery
                                                timeHandler={(e) => this.setTime(e)}
                                                time={this.state.time}
                                                historicalMode={this.state.historicalMode}
                                                className='query-historical'
                                                id='query-historical'
                                            />
                                            <Button
                                                size="sm"
                                                disabled={!this.state.historicalMode}
                                                onClick={() => this.startTimeQuery()}
                                                className='button-historical'
                                                id='button-historical'
                                            >
                                                {t('start')}
                                            </Button>
                                        </Form>
                                        <NavDropdown.Divider />
                                        <p className='dropdown-header'>{t('information')}</p>
                                        <NavDropdown.Item
                                            className='drop-link'
                                            id='drop-link'
                                            eventKey={2}
                                            href='#'
                                            draggable="false"
                                        >
                                            <PopupReasons />
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            className='drop-link'
                                            id='drop-link'
                                            eventKey={1}
                                            href="#"
                                            draggable="false"
                                        >
                                            <PopupCauses />
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <p className='dropdown-header'>{t('seeAlso')}</p>
                                        <NavDropdown.Item
                                            className='drop-link'
                                            id='drop-link'
                                            href='https://www.smartaq.net/de/participate/'
                                            draggable="false"
                                        >
                                            {t('participate')}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            className='drop-link'
                                            id='drop-link'
                                            href='https://www.smartaq.net/en/dashboard/#/home'
                                            draggable="false"
                                        >
                                            SmartAQNet
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            className='drop-link'
                                            id='drop-link'
                                            href='https://github.com/users/ys3d/projects/1'
                                            draggable="false"
                                        >
                                            Github Repository
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            className='drop-link'
                                            id='drop-link'
                                            href='#'
                                            draggable="false"
                                        >
                                            <Impressum />
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                <Nav className='ml-auto'>
                                    <NavDropdown title={t('colorTheme')} variant="success" id="dropdown-basic">
                                        <p className='dropdown-header'>{t('colorTheme')} <HelpPopover placement="auto" title={t('colorTheme')} content={t('popoverColorTheme')} /></p>
                                        <Form.Group controlId='form-switch'>
                                            <Form.Check
                                                type='radio'
                                                id='light-theme'
                                                checked={Theme.Mode.light === this.state.theme}
                                                label={t('lightTheme')}
                                                onChange={() => this.activateTheme(Theme.Mode.light)}
                                                draggable="false"
                                            />
                                            <Form.Check
                                                type='radio'
                                                id='dark-theme'
                                                checked={Theme.Mode.dark === this.state.theme}
                                                label={t('darkTheme')}
                                                onChange={() => this.activateTheme(Theme.Mode.dark)}
                                                draggable="false"
                                            />
                                        </Form.Group>
                                        <NavDropdown.Divider />
                                        <p className='dropdown-header'>{t('colorblindMode')} <HelpPopover placement="auto" title={t('colorblindMode')} content={t('popoverColorblindMode')} /></p>
                                        <Form.Group controlId='form-switch'>
                                            <Form.Check
                                                type='radio'
                                                id={ColorblindMode.Mode.none}
                                                checked={ColorblindMode.Mode.none === this.state.colorblindMode}
                                                label={t('colorblindModeNone')}
                                                onChange={() => this.activateColorblindMode(ColorblindMode.Mode.none)}
                                                draggable="false"
                                            />
                                            <Form.Check
                                                type='radio'
                                                id={ColorblindMode.Mode.deuteranomaly}
                                                checked={ColorblindMode.Mode.deuteranomaly === this.state.colorblindMode}
                                                label={t('colorblindModeDeuteranomaly')}
                                                onChange={() => this.activateColorblindMode(ColorblindMode.Mode.deuteranomaly)}
                                                draggable="false"
                                            />
                                            <Form.Check
                                                type='radio'
                                                id={ColorblindMode.Mode.protanomaly}
                                                checked={ColorblindMode.Mode.protanomaly === this.state.colorblindMode}
                                                label={t('colorblindModeProtanomaly')}
                                                onChange={() => this.activateColorblindMode(ColorblindMode.Mode.protanomaly)}
                                                draggable="false"
                                            />
                                            <Form.Check
                                                type='radio'
                                                id={ColorblindMode.Mode.tritanomaly}
                                                checked={ColorblindMode.Mode.tritanomaly === this.state.colorblindMode}
                                                label={t('colorblindModeTritanomaly')}
                                                onChange={() => this.activateColorblindMode(ColorblindMode.Mode.tritanomaly)}
                                                draggable="false"
                                            />
                                            <Form.Check
                                                type='radio'
                                                id={ColorblindMode.Mode.monochromacy}
                                                checked={ColorblindMode.Mode.monochromacy === this.state.colorblindMode}
                                                label={t('colorblindModeMonochromacy')}
                                                onChange={() => this.activateColorblindMode(ColorblindMode.Mode.monochromacy)}
                                                draggable="false"
                                            />
                                        </Form.Group>
                                    </NavDropdown>
                                    <Nav.Link
                                        className='help'
                                        id='help'
                                        draggable="false"
                                    >
                                        <Help helpText={t('navbarHelp')} />
                                    </Nav.Link>
                                    <Nav.Link
                                        className='nav-link-lng'
                                        id='nav-link-lng'
                                        style={{ color: this.activateLanguage(0) }}
                                        onClick={() => { this.toggleLanguage(0, 'en') }}
                                        draggable="false"
                                    >
                                        English
                                    </Nav.Link>
                                    <Nav.Link
                                        className='nav-link-lng'
                                        id='nav-link-lng'
                                        style={{ color: this.activateLanguage(1) }}
                                        onClick={() => { this.toggleLanguage(1, 'de') }}
                                        draggable="false"
                                    >
                                        Deutsch
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <Row id='map-row' className='row'>
                        <Col id="map-content">
                            <MapView
                                openHandler={(squareCenter, thingId) => this.props.openHandler(squareCenter, thingId)}
                                iOpenHandler={(squareCenter, interpolatedValue) => this.props.iOpenHandler(squareCenter, interpolatedValue)}
                                overlays={this.state.overlays}
                                historicalMode={this.state.historicalMode}
                                time={this.state.time}
                                isOverviewOpen={this.props.show}
                            />
                        </Col>
                        <Overview
                            show={this.props.show}
                            closeHandler={this.props.closeHandler}
                            thingId={this.props.thingId}
                            isSensor={this.props.isSensor}
                            showDetails={this.props.showDetails}
                            id='map-overview'
                            className='map'
                            squareCenter={this.props.squareCenter}
                            pointValue={this.props.pointValue}
                        />
                    </Row>
                </Router>
            </React.Fragment >
        )
    }
}

const dynamicNavbar = withTranslation('common')(Navigationbar)

export default dynamicNavbar
