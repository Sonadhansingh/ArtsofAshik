import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SkillsChart = ({ skills }) => {
  const data = {
    labels: skills.map(skill => skill.name),
    datasets: [
      {
        label: 'Skills',
        data: skills.map(skill => skill.percentage),
        backgroundColor: [
          '#444444', '#555555', '#666666', '#777777', '#999999', '#aaaaaa', '#bbbbbb', '#cccccc', '#dddddd'
        ],
        borderWidth: 0,
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
  };

  return (
    <div className="chart-wrapper">
      <div className="chart-container">
        <Doughnut data={data} options={options} />
        <div className="chart-label">Skills</div>
      </div>
      <div className="labels-container">
        {data.labels.map((label, index) => (
          <div key={index} className="label-item">
            <span
              className="label-color-box"
              style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
            ></span>
            <span className="label-text" style={{ color: data.datasets[0].backgroundColor[index] }}>
              {`${label}: ${data.datasets[0].data[index]}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsChart;
