import React, { Component, Button, NavDropdown,t } from 'react';
import ReactDOM from 'react-dom';
import { Nav, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
//import { withTranslation } from 'react-i18next';



class Navbar extends Component {
  render(){
   return (
  <Navbar bg="dark" variant="dark">
  <Navbar fixed="top" />
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    	<Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Stadt/PLZ.</Button>
    </Form>
      <Nav.Link href="humidity">{t('Humidity')}</Nav.Link>
      <Nav.Link href="particulateMatter" onClick={window.open()}>{t('particulateMatter')}</Nav.Link>
      <Nav.Link eventKey="temperature">{t('Temperature')}</Nav.Link>
      <NavDropdown title="Weitere Einstellungen" id="basic-nav-dropdown">
        <NavDropdown.Item href="https://www.smartaq.net/de/participate/">{t('diy')}</NavDropdown.Item>
        <NavDropdown.Item href="https://www.smartaq.net/en/dashboard/#/home">SmartAQNet</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3" onClick={this.causes()}>{t('causesPM')}</NavDropdown.Item>
        <NavDropdown.Item href="#folgen">Folgen von Feinstaub</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="help">{t('help')}</Nav.Link>
      <Nav.Link href="language">{t('language')}</Nav.Link>
    </Nav>
    </Navbar.Collapse>
  </Navbar>
);
   }
}
