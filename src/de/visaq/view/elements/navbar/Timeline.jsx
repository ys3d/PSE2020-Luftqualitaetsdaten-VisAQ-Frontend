import React, { Component } from 'react';
import { Nav, Navbar, Form, FormControl, NavDropdown, Button } from 'react-bootstrap';

export default class extends Component {
    state = { value: 5 }

    render() {
        <Form>
            <Form.Group controlId="formBasicRange">
                <Form.Label>Range</Form.Label>
                <Form.Control type="range" />
            </Form.Group>
        </Form>
    }
}