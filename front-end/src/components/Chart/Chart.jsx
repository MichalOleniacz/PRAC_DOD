import React, { useEffect } from "react";
import Chart from "chart.js";
import styles from "./Chart.module.css";

const ChartComponent = ({ data }) => {
  let chartRef = React.createRef();

  let labels = [];

  let ramValues = [];
  let cpuValues = [];

  data.detailed.forEach((el) => {
    let date = Date(el.createdAt);
    labels.push(date);
    ramValues.push(el.ramUsage);
    cpuValues.push(el.cpuUsage);
  });

  useEffect(() => {
    let ctx = chartRef.current.getContext("2d");

    window.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels ?? [],
        datasets: [
          {
            label: "RAM",
            data: ramValues ?? [],
            backgroundColor: "transparent",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            lineTension: 0.1,
          },
          {
            label: "CPU",
            data: cpuValues ?? [],
            backgroundColor: "transparent",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            lineTension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                max: 100,
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                display: false,
              },
            },
          ],
        },
        hover: { mode: null },
        animation: {
          duration: 0,
        },
      },
    });
  });

  return (
    <div className={styles.wrapper}>
      <canvas className={styles.canvas} id="myChart" ref={chartRef} />
    </div>
  );
};

export default ChartComponent;
