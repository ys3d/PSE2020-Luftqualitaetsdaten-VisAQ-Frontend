import React, { Component } from 'react';
import { Nav, Navbar, Form, FormControl, NavDropdown, Button } from 'react-bootstrap';

export default class extends Component {
    render() {
        return(
        <Form>
            <Form.Group controlId="formBasicRange">
                <Form.Label>Range</Form.Label>
                <Form.Control type="range" />
            </Form.Group>
        </Form>
        )    
    }
}