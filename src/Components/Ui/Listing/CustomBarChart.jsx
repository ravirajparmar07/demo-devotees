import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CustomBarChart = () => {
  const data = {
    labels: [
      "9am - 10am",
      "10am - 11am",
      "11am - 12pm",
      "12pm - 1pm",
      "1pm - 2pm",
      "2pm - 3pm",
    ],
    datasets: [
      {
        label: "Entrance",
        data: [128, 520, 320, 480, 960, 640],
        backgroundColor: "#C92E2C",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        barThickness: 20,
      },
      {
        label: "Exit",
        data: [64, 400, 280, 360, 720, 520],
        backgroundColor: "#761B1A",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        barThickness: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Entrance and Exit Crowd Count",
      },
    },
    scales: {
      x: {
        stacked: false,
        barPercentage: 0.8,
        categoryPercentage: 0.5,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 16,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};
export default CustomBarChart;
