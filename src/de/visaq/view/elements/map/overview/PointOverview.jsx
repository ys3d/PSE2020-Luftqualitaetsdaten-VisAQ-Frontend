import React, { Component } from 'react';
import styles from './Overview.module.css'
import Accordion from 'react-bootstrap/Accordion'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import request from '../../../../controller/Request'
import Thing from '../../../../model/Thing'
import DataCard from './DataCard'


/**
 * Displays all the Information on a Specifik Sensor or Location
 */
class PointOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { t } = this.props;

    return (
      <>
        <h1>
          {t('location')}
        </h1>

        <Accordion>
          <DataCard
            cardTitle={t('airPressure')}
            currentValue="1000hPa"
            dataRowLabel="hPa"
            dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            data={[65, 59, 80, 81, 56, 55, 40]}
            eventKey={1}
          />
          <DataCard
            cardTitle={t('airTemperature')}
            currentValue="30°C"
            dataRowLabel="°C"
            dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            data={[65, 59, 80, 81, 56, 55, 40]}
            eventKey={2}
          />
          <DataCard
            cardTitle={t('airHumidity')}
            currentValue="17%"
            dataRowLabel="%"
            dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
            data={[65, 59, 80, 81, 56, 55, 40]}
            eventKey={3}
          />
          <DataCard
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