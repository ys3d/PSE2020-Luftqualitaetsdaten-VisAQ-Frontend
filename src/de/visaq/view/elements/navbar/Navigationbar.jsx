import React from 'react';
import { Navbar, NavDropdown, Form, FormCheck, FormControl, NavbarToggler, Collapse, Nav, NavItem,
   NavLink, UncontrolledDropdown, Container, Row, Col, NavbarBrand, DropdownToggle, DropdownMenu, Button, ButtonGroup, DropdownButton, Accordion, Card } from 'react-bootstrap';
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
       <Accordion defaultActiveKey="0">
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0" >
    <Navbar expand="lg" bg="light" variant="tabs" defaultActiveKey="#home">
    <Navbar.Brand href="">
    <strong>VisAQ</strong>
  </Navbar.Brand>
    <Nav className="mr-auto" inline>
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
      <Nav.Link href="#hoe">
        Temperatur
      </Nav.Link>
      <Nav.Link href="#link">
        Luftdruck
      </Nav.Link>
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
    </Navbar>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
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
          <Form.Check type="checkbox" id="3" label="Standard" eventKey="enabled" enabled/>
          </Form.Group>
          </Card.Body>
    </Accordion.Collapse>
  </Card>
  </Accordion>
  </Styles>
    )
  }
}