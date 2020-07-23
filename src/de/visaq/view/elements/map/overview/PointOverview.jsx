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
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getConsequencesAirQuality(data) {
    if (data >= 1100) {
      return 'overpressure'
    } else if (data < 1000) {
      return 'underpressure'
    }
    return 'normalPressure'
  }

  getConsequencesTemperature(data) {
    if (data >= 37) {
      return 'heat'
    } else if (data < -5) {
      return 'cold'
    }
    return 'normalTemperature'
  }

  getConsequencesHumidity(data) {
    if (data >= 60) {
      return 'wettness'
    } else if (data < 30) {
      return 'dry'
    }
    return 'normalHumidity'
  }
  
  getConsequencesPM(data) {
    if (data >= 1100) {
      return 'overpressure'
    } else if (data < 1000) {
      return 'underpressure'
    }
    return 'normalPM'
  }

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
            consequences = {t(this.getConsequencesAirQuality(this.currentValue))}
            dataRowLabel="hPa"
            dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            data={[65, 59, 80, 81, 56, 55, 40]}
            eventKey={1}
          />
          <DataCard
            show={true}
            cardTitle={t('airTemperature')}
            currentValue="30°C"
            consequences = {t(this.getConsequencesTemperature(this.currentValue))}
            dataRowLabel="°C"
            dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            data={[65, 59, 80, 81, 56, 55, 40]}
            eventKey={2}
          />
          <DataCard
            show={true}
            cardTitle={t('airHumidity')}
            currentValue="17%"
            consequences = {t(this.getConsequencesHumidity(this.currentValue))}
            dataRowLabel="%"
            dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            data={[65, 59, 80, 81, 56, 55, 40]}
            eventKey={3}
          />
          <DataCard
            show={true}
            cardTitle={t('particulateMatter')}
            currentValue="155ppm"
            consequences = {t(this.getConsequencesPM(this.currentValue))}
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