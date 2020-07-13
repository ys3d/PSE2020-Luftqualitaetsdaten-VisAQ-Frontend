import React, { state, isOpen, setState } from 'react';
import { Navbar, NavDropdown, Form, FormCheck, FormControl, NavbarToggler, Collapse, Nav, NavItem,
   NavLink, NavbarBrand, DropdownToggle, DropdownMenu, Button} from 'react-bootstrap';
import styled from 'styled-components';
import Popup, {showPopup} from './Popup';
import i18next from 'i18next';
import AirQualityData, {setTemperature, setHumidity, setAirPressure, setParticulateMatter, getName } from '../airquality/AirQualityData';
import { useTranslation, withTranslation} from 'react-i18next';

const Styles = styled.div`
  .navbar { background-color: #FFF; }
  a, .navbar-nav, .navbar-dark .nav-link {
    color: #000;
    &:hover { color: #44c2d4; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #44c2d4;
    &:hover { color: #44c2d4; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }

  .dropdown:hover>.dropdown-menu {
  display: block;
  }

`;

//const { t, i18n } = useTranslation('common');

/* Constructs the Navigationbar with all functions */

class Navigationbar extends React.Component {

  constructor(props) {
    super(props)
    this.state = { isOpen: false }
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleClose = () => {
     this.setState({ isOpen: false })
  }

  selectOnlyThis(id) {
      for (var i = 1;i <= 3; i++)
      {
          document.getElementById(i).checked = false;
      }
      document.getElementById(id).checked = true;
  }


  render() {
    const { t } = this.props;

    return (
      <Styles>
       <Navbar expand='lg' bg='light' variant='blue'>
  <Navbar.Brand href=''>
    <strong>VisAQ</strong>
  </Navbar.Brand>
  <Navbar.Toggle aria-controls='basic-navbar-nav' />
  <Navbar.Collapse id='basic-navbar-nav' >
    <Nav className='mr-auto'>
    <Form inline>
      <FormControl type='text' placeholder={t('search')} className='search' />
      <Button variant='outline-success'>
        Search
      </Button>
    </Form>
      <Nav.Link onClick={setParticulateMatter}>
      {t('particulateMatter')}
      </Nav.Link>
      <Nav.Link onClick={setHumidity}>
        {t('humidity')}
      </Nav.Link>
      <Nav.Link onClick={setTemperature}>
      {t('temperature')}
      </Nav.Link>
      <Nav.Link onClick={setAirPressure}>
      {t('airPressure')}
      </Nav.Link>
      <NavDropdown
          renderMenuOnMount={true}
         // open={ state.isOpen }
          noCaret
          id='dropdown'
          name='Weitere Features'
          label='Weitere Features'
        >
        <NavDropdown.Item href='https://www.smartaq.net/de/participate/'>
        {t('diy')}
        </NavDropdown.Item>
        <NavDropdown.Item href='https://www.smartaq.net/en/dashboard/#/home'>
          SmartAQNet
        </NavDropdown.Item>
        <NavDropdown.Item onClick={showPopup('hi', 'test')}>
        {t('causesPM')}
        </NavDropdown.Item>
        <NavDropdown.Item onClick={showPopup('hi', 'test')}>
        {t('reasonsPM')}
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <Form.Group controlId='formBasicCheckbox' label='Experten-Einstellungen' inline>
          <Form.Check type='checkbox' id='1' label='Dark-Mode'/>
          <Form.Check type='checkbox' id='2' label={t('colorBlind')}/>
          <Form.Check type='checkbox' id='3' label={t('standard')} checked/>
          </Form.Group>
        </NavDropdown>
    </Nav>
      <NavDropdown
      renderMenuOnMount={true}
         //open={ this.state.isOpen }
          noCaret
          id='Expert dropdown'
          disabled>
      <Form.Group controlId='formBasicCheckbox' alignRight>
          <Form.Check type='checkbox' id='1' label='Offizielle Sensoren'/>
          <Form.Check type='checkbox' id='2' label='Weniger offizeille Sensoren'/>
          </Form.Group>
      </NavDropdown>
    <Nav className='ml-auto'>
      <Form inline>
      <FormCheck 
        id='switchEnabled'
        type='switch'
        //checked={}
        //onChange={}
        label={t('expert-Mode')}
      />
      </Form>
      <Nav.Link onClick={ () => {i18next.changeLanguage('en')}}>
        en
      </Nav.Link>
      <Nav.Link onClick={ () => {i18next.changeLanguage('de')}}>
        de
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
      </Styles>
    )
}
}

const MyComponent = withTranslation('common')(Navigationbar)

export default MyComponent