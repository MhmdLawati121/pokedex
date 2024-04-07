import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

/**
 * Component for rendering a Radar chart
 * @param {Object} datasets - Datasets to be plotted on chart
 * @param {Array} datasets.data - Data points to be plotted on chart
 * @param {string} datasets.backgroundColor - Radar chart background color
 * @param {string} datasets.borderColor - Radar chart border color
 * @returns {JSX.Element} - JSX element to display chart
 */
export function Chart({ datasets }) {
  const labels = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];
  let maxValue = 150;

  // Check if any value in the data is greater than 150
  if (datasets.data.some((x) => x > 150)) {
    maxValue = Math.max(...datasets.data);
  }

  console.log("The maximum value is:", maxValue);
  const options = {
    // Setting default scaling parameters
    scales: {
      r: {
        beginAtZero: true,
        max: maxValue,
        ticks: {
          stepSize: 50, // Set the step size to 50
          callback: function (value) {
            return value;
          },
        },
      },
    },
    // Hiding legend plugin
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [datasets],
  };

  console.log(data);
  return <Radar data={data} options={options} />;
}
