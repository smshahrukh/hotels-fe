import React from 'react';
import { Line } from 'react-chartjs-2';

const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const LineChart = ({dataPoints, groupedBy}) => {
    const labels = [];
    const data = [];
    dataPoints.forEach(dataPoint => {
        labels.push(dataPoint.label)
        data.push(dataPoint.averagescore)
    })

    const lineChartData = {
        labels,
        datasets: [
          {
            label: `Average ${groupedBy} Score`,
            data,
            fill: false,
            backgroundColor: 'rgb(100,149,237)',
            borderColor: 'rgba(100,149,237, 0.2)',
          },
        ],
      };

    return (
  <>
    <div className='header'>
      <h1 className='title'>Average Score</h1>
    </div>
    <Line data={lineChartData} options={options} />
  </>
)};

export default LineChart;