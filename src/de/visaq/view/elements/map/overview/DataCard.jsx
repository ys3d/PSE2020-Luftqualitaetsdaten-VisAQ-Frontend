import React, { Component } from 'react';
import styles from './Overview.module.css'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Diagram from '../../diagram/Diagram'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class DataCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { t } = this.props;
        return (
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Card.Header} eventKey={this.props.eventKey}>
                        {this.props.cardTitle}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={this.props.eventKey}>
                    <Card.Body>
                        <p>{t('currently')}: {this.props.currentValue}</p>
                        <Diagram
                            title={t('historicalDevelopment')}
                            dataRowLabel={this.props.dataRowLabel}
                            dataLabels={this.props.dataLabels}
                            data={this.props.data}
                        />
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );
    }
}

const dynamicDataCard = withTranslation('overview')(DataCard);

export default dynamicDataCard;