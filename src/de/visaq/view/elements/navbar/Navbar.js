import React, { Component } from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;

export const NavigationBar = () => (
  <Styles>
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
      <Nav.Link href="#humidity">Luftfeuchtigkeit</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Weitere Einstellungen" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">DIY-Anleitung</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">SmartAQNet</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Gründe für Feinstaub</NavDropdown.Item>
        <NavDropdown.Item href="#folgen">Folgen von Feinstaub</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    </Navbar.Collapse>
  </Navbar>
</Styles>
)

class Navbar extends Component {
  folgen() {
    onClick="window.open('your_url')";
  }

  render() {
    return<button onClick={this.folgen}>Folgen</button>;
  }
}