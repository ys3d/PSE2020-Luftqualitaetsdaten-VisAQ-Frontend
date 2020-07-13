import React, { Component, useState } from 'react';
import { Modal, NavbarBrand, DropdownToggle, DropdownMenu, Button } from 'react-bootstrap';

    function handleOpen() {
      this.setState({ isOpen: true });
    };
    
    function handleClose() {
      this.setState({ isOpen: false });
    };
  
    export function showPopup(title, props) {
    return (
      <>
        <Modal onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>title</Modal.Title>
          </Modal.Header>
          <Modal.Body>props</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }