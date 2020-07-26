import React from 'react';
import { Line } from 'react-chartjs-2';
import './Diagram.module.css'


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

export default class Diagram extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            labels: props.dataLabels,
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
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dataLabels != this.props.dataLabels || prevProps.data != this.props.data) {
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

    readDataForSensor(absoluteAddress, sensorID) {

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