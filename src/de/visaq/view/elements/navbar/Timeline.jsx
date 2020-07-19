import React, { Component, event } from 'react';
import { Nav, Navbar, Form, FormControl, NavDropdown, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './Timeline.css'
import RangeSlider from 'react-bootstrap-range-slider';

export default class Timeline extends Component {
    constructor() {
        super();
        this.render.bind(this);
        this.state = {
            show: false,
            time: new Date().toLocaleString,
            max: new Date().toLocaleString,
            min: '01.01.2000'
        };
      }

    close() {
      this.setState({ show: false });
    }


     /**
    * Decides whether the component should update. 
    * Returns true if the state of show changed in the parent component, false otherwise.
    * 
    * @param {Object} nextprops The properties
    * @param {Object} nextState The new state
    */
   shouldComponentUpdate(nextprops, nextState) {
        if(JSON.stringify(this.state.show) !== JSON.stringify(nextprops.show)){
            return true;
        } 
        else {
            return false;
        }  
    }

    /**
     * Changes the show state of the component. 
     * 
     * @param {Object} show Whether the timeline is shown or not
     */
    componentDidUpdate(show) {
        if(JSON.stringify(this.state.show) !== JSON.stringify(show.show)) {
            this.setState({show : show.show});
          }      
    }

    render() {
        return( 
        <div>
            <Form show={this.state.show} onHide={this.close.bind(this)}>
                <Form.Group controlId="formBasicRange">
                <OverlayTrigger
                        placement='bottom'
                        overlay={
                            <Tooltip id={'tooltip'}>
                            Tooltip
                            </Tooltip>
                        }
                        className='tooltip'
                    >
                        <Form.Control type="range" className='timeline' value={this.state.time}/>
                </OverlayTrigger>
                </Form.Group>
            </Form>    
      </div>
        )
    }
}