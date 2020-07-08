import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class View extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Container fluid>
          <Button color="link"><Link to="/groups">Manage JUG Tour</Link></Button>
        </Container>
      </div>
    );
  }
}

export default View;