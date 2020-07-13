import React, { Component, useState } from 'react';
import { Modal, NavbarBrand, DropdownToggle, DropdownMenu, Button } from 'react-bootstrap';

   export default class Popup extends React.Component {

    constructor(props) {
        super(props)
        this.state = { isOpen: false }
    }

   handleOpen = () => {
      this.setState({ isOpen: true });
    };
    
    handleClose = () => {
      this.setState({ isOpen: false });
    };
  
    showPopup(title, props) {
    return (
      <>
        <Modal onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>title</Modal.Title>
          </Modal.Header>
          <Modal.Body>props</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}