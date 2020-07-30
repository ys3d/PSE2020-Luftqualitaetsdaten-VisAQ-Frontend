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
 * Displays all the Information on a Specifik Sensor or Location
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
        <ShareField subject={t('shareTitle')} body={t('shareBody')}/>
        <div className="network">&nbsp;</div>
        <p>{t('valueHere')} {Number(this.props.value).toFixed(2)} {this.props.airQualityData.getUnitOfMeasurement()}</p>
      </>
    );
  }
}

const dynamicPointOverview = withTranslation('overview')(PointOverview);

export default dynamicPointOverview;