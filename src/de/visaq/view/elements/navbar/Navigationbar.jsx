import React from 'react';
import { Navbar, NavDropdown, Form, FormCheck, FormControl, NavbarToggler, Collapse, Nav, NavItem,
   NavLink, UncontrolledDropdown, Container, Row, Col, NavbarBrand, DropdownToggle, DropdownMenu, Button, ButtonGroup, DropdownButton } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar { background-color: #FFF; }
  a, .navbar-nav, .navbar-dark .nav-link {
    color: #000;
    &:hover { color: #001; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #44c2d4;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }

  .nav-item:hover .dropdown-menu{
  display:block!important;
  width: 100%;
}
`;
/* Constructs the Navigationbar with all functions */

export const Navigationbar = ({ t }) => (
  <Styles>
    <Navbar collapseOnSelect expand="lg" bg="light" variant="dark">
  <Navbar.Brand href="">
    <strong>VisAQ</strong>
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav" >
    <Nav className="mr-auto">
    <Form inline>
      <FormControl type="text" placeholder="Search" className="search" />
      <Button variant="outline-success">
        Search
      </Button>
    </Form>
      <Nav.Link href="#home">
        Feinstaub
      </Nav.Link>
      <Nav.Link href="#link">
        Luftfeuchtigkeit
      </Nav.Link>
      <Nav.Link href="#home">
        Temperatur
      </Nav.Link>
      <Nav.Link href="#link">
        Link
      </Nav.Link>
      <DropdownButton title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="https://www.smartaq.net/de/participate/">
          DIY-Anleitungen
        </NavDropdown.Item>
        <NavDropdown.Item href="https://www.smartaq.net/en/dashboard/#/home">
          Another action
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">
          Something
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">
          Something
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">
          Something
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">
          Something
        </NavDropdown.Item>
      </DropdownButton>
    </Nav>
    <Nav className="ml-auto">
      <Form inline>
  <Form.Check 
    type="switch"
    id="custom-switch"
    label="Hilfe"/>
      </Form>
      <Nav.Link href="#home">
        Sprache
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  </Styles> 
)