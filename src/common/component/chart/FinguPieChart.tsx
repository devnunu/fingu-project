import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

interface FinguPieChartProps {
  className?: string;
  labels: string[];
  data: number[];
  backgroundColor: string[];
  hoverBackgroundColor: string[];
}

export default class FinguPieChart extends Component<FinguPieChartProps, {}> {
  render() {
    const { backgroundColor, hoverBackgroundColor } = this.props;
    const data = {
      labels: this.props.labels,
      datasets: [
        {
          data: this.props.data,
          backgroundColor,
          hoverBackgroundColor
        }
      ]
    };
    const options = {
      legend: {
        display: false
      }
    };
    return (
      <div className={this.props.className}>
        <Doughnut data={data} options={options} />
      </div>
    );
  }

  private vaildProps(): boolean {
    const { backgroundColor, hoverBackgroundColor } = this.props;
    return backgroundColor.length === hoverBackgroundColor.length;
  }
}
