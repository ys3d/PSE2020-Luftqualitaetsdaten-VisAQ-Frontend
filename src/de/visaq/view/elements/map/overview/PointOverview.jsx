import React, { Component } from 'react';
import styles from './Overview.module.css'
import Accordion from 'react-bootstrap/Accordion'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import request from '../../../../controller/Request'
import Thing from '../../../../model/Thing'
import DataCard from './DataCard'
import ShareField from './ShareField'

/**
 * Displays all the information on a specific sensor or location
 */
class PointOverview extends Component {
    /**
     * Sole constructor of the class.
     *
     * @param {Object} props  The properties
     */
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    /**
     * Renders the PointOverview.
     */
    render() {
        const { t } = this.props;

        return (
            <>
                <h1>
                    {t('location')}
                </h1>
                {this.props.expert &&
                    <a>
                        {Number(this.props.squareCenter[1]).toFixed(4)}°N {Number(this.props.squareCenter[0]).toFixed(4)}°E
                        <div className="network">&nbsp;</div>
                    </a>
                }
                <ShareField subject={t('shareTitle')} body={t('shareBody')} />
                <div className="network">&nbsp;</div>
                {t('valueHere')} {Number(this.props.value).toFixed(2)} {this.props.airQualityData.getUnitOfMeasurement()}
                <div className="network">&nbsp;</div>
                {t('estimatedValue')}
            </>
        );
    }
}

const dynamicPointOverview = withTranslation('overview')(PointOverview);

export default dynamicPointOverview;
