import React, { Component, event } from 'react';
import Card from 'react-bootstrap/Card'
import { Accordion } from 'react-bootstrap'
import Diagram from '../../diagram/Diagram'
import { withTranslation } from 'react-i18next';
import './Overview.css'


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
        this.state = {
            isActive: props.isActive,
        };
    }

    toggleClass = (e) => {
        this.setState({ isActive: !this.state.isActive })
    }

    handleSelect(eventKey) {
        event.preventDefault();
        this.toggleClass();
    }

    /**
     * Renders the Datacard.
     */
    render() {
        const { t } = this.props;
        if (this.props.show) {
            return (
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Card.Header} eventKey={"" + this.props.eventKey} className='card'>
                            <ul>
                                {this.props.cardTitle}
                                <div className='arrow-container'>
                                    <span className={(this.state.isActive) ? 'arrow-top' : 'arrow-down'}>
                                    </span>
                                </div>
                            </ul>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={"" + this.props.eventKey}>
                        <Card.Body >
                            {t('currently')}: {this.props.currentValue} {this.props.dataUnit}
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
