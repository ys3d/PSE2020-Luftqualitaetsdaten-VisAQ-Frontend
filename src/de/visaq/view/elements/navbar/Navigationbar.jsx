import React from 'react';
import { Nav, Navbar, Form, FormControl, NavDropdown, Button } from 'react-bootstrap';
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
  display:block!important
}
`;

/* Constructs the Navigationbar with all functions */

export const Navigationbar = () => (
  <Styles>
    <Navbar collapseOnSelect expand="lg" bg="light" variant="dark">
  <Navbar.Brand href="#home">
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
        Home
      </Nav.Link>
      <Nav.Link href="#link">
        Link
      </Nav.Link>
      <Nav.Link href="#home">
        Home
      </Nav.Link>
      <Nav.Link href="#link">
        Link
      </Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown" >
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
      </NavDropdown>
    </Nav>
    <Nav className="ml-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  </Styles>
)