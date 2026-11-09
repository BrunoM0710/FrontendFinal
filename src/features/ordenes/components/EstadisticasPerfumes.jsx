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
  // Filtrar perfumes sin compras, ordenar y limitar a 10
  const topPerfumes = [...estadisticas]
    .filter((item) => item.cantidadCompras > 0)
    .sort((a, b) => b.cantidadCompras - a.cantidadCompras)
    .slice(0, 10);

  const data = {
    labels: topPerfumes.map((item) => `${item.marca} ${item.nombre}`),
    datasets: [
      {
        label: "Cantidad de compras",
        data: topPerfumes.map((item) => item.cantidadCompras),
        backgroundColor: "rgba(201, 166, 107, 0.7)",
        borderColor: "#c9a66b",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  // Conservá tus options actuales de Chart.js

  return (
    <div style={{ height: "350px" }}>
      {topPerfumes.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p>No hay perfumes con compras registradas.</p>
      )}
    </div>
  );
};
export default EstadisticasPerfumes;
