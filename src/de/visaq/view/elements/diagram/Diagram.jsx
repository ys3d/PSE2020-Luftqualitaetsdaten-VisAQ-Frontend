import React from 'react';
import { Line } from 'react-chartjs-2';
import './Diagram.module.css';
import '../navbar/Popup.css';
import { withTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { MdInsertChart } from 'react-icons/md';


const diagramConfig = {
    fill: false,
    lineTension: 0.3,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
};

/**
 * Draws a diagram.
 */
class Diagram extends React.Component {
    /**
     * Sole constructor of the class.
     *
     * @param {Object} props The Diagram properties
     */
    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth,
            labels: props.dataLabels,
            showModal: false,
            datasets: [
                {
                    label: props.dataRowLabel,
                    fill: diagramConfig.fill,
                    lineTension: diagramConfig.lineTension,
                    backgroundColor: diagramConfig.backgroundColor,
                    borderColor: diagramConfig.borderColor,
                    borderCapStyle: diagramConfig.borderCapStyle,
                    borderDash: diagramConfig.borderDash,
                    borderDashOffset: diagramConfig.borderDashOffset,
                    borderJoinStyle: diagramConfig.borderJoinStyle,
                    pointBorderColor: diagramConfig.pointBorderColor,
                    pointBackgroundColor: diagramConfig.pointBackgroundColor,
                    pointBorderWidth: diagramConfig.pointBorderWidth,
                    pointHoverRadius: diagramConfig.pointHoverRadius,
                    pointHoverBackgroundColor: diagramConfig.pointHoverBackgroundColor,
                    pointHoverBorderColor: diagramConfig.pointHoverBorderColor,
                    pointHoverBorderWidth: diagramConfig.pointHoverBorderWidth,
                    pointRadius: diagramConfig.pointRadius,
                    pointHitRadius: diagramConfig.pointHitRadius,
                    data: props.data
                }
            ]
        };

        this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    /**
     * Handles stateChange on window-resizing
     */
    handleWindowSizeChange() {
        this.setState({ width: window.innerWidth });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.dataLabels !== this.props.dataLabels || prevProps.data !== this.props.data) {
            this.setState({
                labels: this.props.dataLabels,
                datasets: [
                    {
                        label: this.props.dataRowLabel,
                        fill: diagramConfig.fill,
                        lineTension: diagramConfig.lineTension,
                        backgroundColor: diagramConfig.backgroundColor,
                        borderColor: diagramConfig.borderColor,
                        borderCapStyle: diagramConfig.borderCapStyle,
                        borderDash: diagramConfig.borderDash,
                        borderDashOffset: diagramConfig.borderDashOffset,
                        borderJoinStyle: diagramConfig.borderJoinStyle,
                        pointBorderColor: diagramConfig.pointBorderColor,
                        pointBackgroundColor: diagramConfig.pointBackgroundColor,
                        pointBorderWidth: diagramConfig.pointBorderWidth,
                        pointHoverRadius: diagramConfig.pointHoverRadius,
                        pointHoverBackgroundColor: diagramConfig.pointHoverBackgroundColor,
                        pointHoverBorderColor: diagramConfig.pointHoverBorderColor,
                        pointHoverBorderWidth: diagramConfig.pointHoverBorderWidth,
                        pointRadius: diagramConfig.pointRadius,
                        pointHitRadius: diagramConfig.pointHitRadius,
                        data: this.props.data
                    }
                ]
            });
        }
    }

    readDataForSensor(absoluteAddress, sensorId) {

    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({
            showModal: true,
        });
    }

    /**
     * Renders the Component
     */
    render() {
        const { t } = this.props;

        if (this.state.width > 700) {
            return (
                <div>
                    <h2>{t('historicalDevelopment')}</h2>
                    <Line data={this.state} />
                </div>
            );
        }
        else {
            return (
                <div>
                    <Button className='button' onClick={this.open.bind(this)}>
                        {t('historicalDevelopment')} <MdInsertChart className='help-button' />
                    </Button>
                    <Modal size="lg" show={this.state.showModal} onHide={this.close.bind(this)}>
                        <Modal.Title center className='title'>
                            {t('historicalDevelopment')}
                        </Modal.Title>
                        <Modal.Body className='text'>
                            <Line data={this.state} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close.bind(this)} className='button'>{t('close')}</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }

    }
}

const dynamicDiagram = withTranslation('historical')(Diagram)

export default dynamicDiagram;