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

export function Chart({ datasets }) {
  const labels = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];

  // Check if any value in the data is greater than 150
  if (datasets.data.some((x) => x > 150)) {
    var maxValue = Math.max(...datasets.data);
  } else {
    var maxValue = 150;
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
            return value; // Optionally, you can customize the tick labels here
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
