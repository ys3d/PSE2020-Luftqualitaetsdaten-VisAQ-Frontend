import React, { Component, toggleClass } from 'react';
import Card from 'react-bootstrap/Card'
import {Accordion, useAccordionToggle} from 'react-bootstrap'
import Diagram from '../../diagram/Diagram'
import { withTranslation } from 'react-i18next';
import './OverviewContainer.css'


/**
 * Shows the data of one AirQualityData on the the SensorOverview.
 */
class DataCard extends Component {
    /**
     * Sole constructor of the class.
     * 
     * @param {Object} props    The properties
     */
    constructor(props) {
        super(props);
    }

    /**
     * Renders the Datacard.
     */
    render() {
        const { t } = this.props;
        if (this.props.show) {
            return (
                <Card >
                    <Card.Header >
                        <Accordion.Toggle as={Card.Header} eventKey={this.props.eventKey} className='card'>
                            <ul>
                            <p>{this.props.cardTitle}</p>
                                <li>
                                    <span class="arrow">
                                    </span>
                                </li>
                            </ul>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={this.props.eventKey}>
                        <Card.Body>
                            <p>{t('currently')}: {this.props.currentValue} {this.props.dataUnit}</p>
                            <Diagram
                                title={t('historicalDevelopment')}
                                dataRowLabel={this.props.dataUnit}
                                dataLabels={this.props.dataLabels}
                                data={this.props.data}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            );
        }
        else {
            return (
                <>
                </>
            );
        }
    }
}

const dynamicDataCard = withTranslation('overview')(DataCard);

export default dynamicDataCard;