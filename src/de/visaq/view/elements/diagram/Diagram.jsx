import React from 'react';
import { Line } from 'react-chartjs-2';
import './Diagram.module.css'

/**
 * Draws a diagram.
 */
export default class Diagram extends React.Component {
    /**
     * Sole constructor of the class.
     *
     * @param {Object} props The Diagram properties
     */
    constructor(props) {
        super(props);

        this.state = {
            labels: this.props.dataLabels,
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
    }

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

    /**
     * Renders the Component
     */
    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <Line data={this.state} />
            </div>
        );
    }

}
