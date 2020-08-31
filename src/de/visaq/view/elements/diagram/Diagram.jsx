import React from 'react';
import { Line } from 'react-chartjs-2';
import './Diagram.module.css';
import '../navbar/Popup.css';
import { withTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { MdInsertChart } from 'react-icons/md';

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
            labels: this.props.dataLabels,
            showModal: false,
            width: window.innerWidth,
            datasets: [
                {
                    label: this.props.dataRowLabel,
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: window.getComputedStyle(document.body).getPropertyValue("--diagram-background-color"),
                    borderColor: window.getComputedStyle(document.body).getPropertyValue("--diagram-border-color"),
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: window.getComputedStyle(document.body).getPropertyValue("--diagram-point-border-color"),
                    pointBackgroundColor: window.getComputedStyle(document.body).getPropertyValue("--diagram-point-background-color"),
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: window.getComputedStyle(document.body).getPropertyValue("--diagram-point-hover-background-color"),
                    pointHoverBorderColor: window.getComputedStyle(document.body).getPropertyValue("--diagram-point-hover-border-color"),
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.props.data
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
                        fill: false,
                        lineTension: 0.3,
                        backgroundColor: 'rgba(255,255,255,1)',
                        borderColor: window.getComputedStyle(document.body).getPropertyValue("--diagram-border-color"),
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: window.getComputedStyle(document.body).getPropertyValue("--diagram-point-border-color"),
                        pointBackgroundColor: window.getComputedStyle(document.body).getPropertyValue("--diagram-point-background-color"),
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: window.getComputedStyle(document.body).getPropertyValue("--diagram-point-hover-background-color"),
                        pointHoverBorderColor: window.getComputedStyle(document.body).getPropertyValue("--diagram-point-hover-border-color"),
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.props.data
                    }
                ]
            });
        }
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