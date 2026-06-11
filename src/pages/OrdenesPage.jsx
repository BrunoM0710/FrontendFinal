import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./estilos/OrdenesPage.css";
import DashboardLayout from "../components/layout/DashboardLayout";

import { obtenerOrdenesUsuario } from "../features/ordenes/ordenService";

import OrdenGrid from "../features/ordenes/components/OrdenGrid.jsx";

const OrdenesPage = () => {
  const usuario = useSelector((state) => state.auth.usuario);

  const [ordenes, setOrdenes] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarOrdenes = async () => {
      try {
        const response = await obtenerOrdenesUsuario(usuario._id);

        setOrdenes(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    cargarOrdenes();
  }, []);

  return (
    <DashboardLayout>
      <h1>Mis Órdenes</h1>

      {loading ? (
        <p>Cargando...</p>
      ) : ordenes.length === 0 ? (
        <div className="empty-state">
          <h2>No has realizado compras</h2>

          <p>Cuando compres un perfume, aparecerá aquí.</p>
        </div>
      ) : (
        <OrdenGrid ordenes={ordenes} />
      )}
    </DashboardLayout>
  );
};

export default OrdenesPage;
