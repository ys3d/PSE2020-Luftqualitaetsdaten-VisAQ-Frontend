import React from 'react';
import { Navbar, NavDropdown, Form, FormCheck, FormControl, NavbarToggler, Collapse, Nav, NavItem,
   NavLink, UncontrolledDropdown, Container, Row, Col, NavbarBrand, DropdownToggle, DropdownMenu, Button, ButtonGroup, DropdownButton } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar { background-color: #FFF; }
  a, .navbar-nav, .navbar-dark .nav-link {
    color: #000;
    &:hover { color: black; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #44c2d4;
    &:hover { color: black; }
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
/* Constructs the Navigationbar with all functions */

var currentAirQuality

export default class Navigationbar extends React.Component {

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

  window
  render() {
    return (
      <Styles>
       <Navbar expand="lg" bg="light" variant="dark">
  <Navbar.Brand href="">
    <strong>VisAQ</strong>
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav" >
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
        Luftdruck
      </Nav.Link>
      <dropdown-menu>
      <NavDropdown
          renderMenuOnMount={true}
          onMouseEnter = { this.handleOpen }
          onMouseLeave = { this.handleClose }
          open={ this.state.isOpen }
          noCaret
          id="dropdown"
        >
        <NavDropdown.Item href="https://www.smartaq.net/de/participate/">
          DIY-Anleitungen
        </NavDropdown.Item>
        <NavDropdown.Item href="https://www.smartaq.net/en/dashboard/#/home">
          SmartAQNet
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">
          Gründe für Feinstaub
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">
          Folgen von Feinstaub
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <Form.Group controlId="formBasicCheckbox" inline>
          <Form.Check type="checkbox" id="1" label="Dark-Mode"/>
          <Form.Check type="checkbox" id="2" label="Farbblindheits-Modus"/>
          <Form.Check type="checkbox" id="3" label="Standard"/>
          </Form.Group>
        </NavDropdown>
        </dropdown-menu>
    </Nav>
    <Nav className="ml-auto">
      <Form inline>
      <FormCheck 
        id="switchEnabled"
        type="switch"
        //checked={}
        //onChange={}
        label="Hilfe"
      />
      </Form>
      <Nav.Link href="#home">
      <img
							src="https://picsum.photos/30/30"
							width="30"
							height="30"
							className="d-inline-block align-top"
							alt="React Bootstrap logo"
						/>
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
      </Styles>
    )
  }
}