import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const EstadisticasPerfumes = ({ estadisticas }) => {
  const data = {
    labels: estadisticas.map((item) => `${item.marca} ${item.nombre}`),
    datasets: [
      {
        label: "Cantidad de compras",
        data: estadisticas.map((item) => item.cantidadCompras),
        backgroundColor: "rgba(201, 166, 107, 0.7)",
        borderColor: "#c9a66b",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#cccccc",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#cccccc",
          precision: 0,
        },
      },
    },
  };

  return (
    <div style={{ height: "350px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default EstadisticasPerfumes;
