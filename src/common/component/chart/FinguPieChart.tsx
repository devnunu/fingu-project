import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

interface FinguPieChartProps {
  className?: string;
  labels: string[];
  data: number[];
}

export default class FinguPieChart extends Component<FinguPieChartProps, {}> {
  render() {
    const data = {
      labels: ['소비', '저축투자', '지출', '미파악지출'],
      datasets: [
        {
          data: this.props.data,
          backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
          hoverBackgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
        },
      ],
    };
    const options = {
      legend: {
        display: false,
      },
    };
    return (
      <div className={this.props.className}>
        <Doughnut data={data} options={options} />
      </div>
    );
  }
}
