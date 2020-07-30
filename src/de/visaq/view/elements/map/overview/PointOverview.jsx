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
        <div className="Demo__some-network__share-count">&nbsp;</div>
        <Accordion><i class="arrow down"></i>
          <DataCard
            show={true}
            cardTitle={t('airPressure')} 
            currentValue="1000hPa"
            dataRowLabel="hPa"
            dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            data={[65, 59, 80, 81, 56, 55, 40]}
            eventKey={1}
          />
          <DataCard
            show={true}
            cardTitle={t('airTemperature')}
            currentValue="30°C"
            dataRowLabel="°C"
            dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            data={[65, 59, 80, 81, 56, 55, 40]}
            eventKey={2}
          />
          <DataCard
            show={true}
            cardTitle={t('airHumidity')}
            currentValue="17%"
            dataRowLabel="%"
            dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            data={[65, 59, 80, 81, 56, 55, 40]}
            eventKey={3}
          />
          <DataCard
            show={true}
            cardTitle={t('particulateMatter')}
            currentValue="155ppm"
            dataRowLabel="ppm"
            dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            data={[65, 59, 80, 81, 56, 55, 40]}
            eventKey={4}
          />
        </Accordion>
      </>
    );
  }
}

const dynamicPointOverview = withTranslation('overview')(PointOverview);

export default dynamicPointOverview;