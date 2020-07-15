import React, { Component } from 'react';
import styles from './SensorOverview.module.css'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Figure from 'react-bootstrap/Figure'
import Diagram from '../diagram/Diagram'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

/**
 * Displays all the Information on a Specifik Sensor or Location
 */
class SensorOverview extends Component {

  render() {
    const { t } = this.props;
    return (
      <>

        <h3>{t('sensor')} [...]</h3>
        <p>
          {t('sensortype')} [...]
          </p>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                {t('airPressure')}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <p>{t('currently')}: 1000hPa</p>
                <Diagram
                  title={t('historicalDevelopment')}
                  dataRowLabel={"hPa"}
                  dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
                  data={[65, 59, 80, 81, 56, 55, 40]}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                {t('airTemperature')}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <p>{t('currently')}: 30°C</p>
                <Diagram
                  title={t('historicalDevelopment')}
                  dataRowLabel={"°C"}
                  dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
                  data={[65, 59, 80, 81, 56, 55, 40]}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                {t('airHumidity')}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <p>{t('currently')}: 17%</p>
                <Diagram
                  title={t('historicalDevelopment')}
                  dataRowLabel={"%"}
                  dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
                  data={[65, 59, 80, 81, 56, 55, 40]}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Card.Header} eventKey="3">
                {t('particulateMatter')}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                <p>{t('currently')}: 150ppm</p>
                <Diagram
                  title={t('historicalDevelopment')}
                  dataRowLabel={"ppm"}
                  dataLabels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
                  data={[65, 59, 80, 81, 56, 55, 40]}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </>
    );
  }
}

const dynamicSensorOverview = withTranslation('overview')(SensorOverview)

export default dynamicSensorOverview;