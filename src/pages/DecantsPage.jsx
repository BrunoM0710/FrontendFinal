import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import DashboardLayout from "../components/layout/DashboardLayout";

import { obtenerDecantsUsuario } from "../features/decants/decantService";

import DecantGrid from "../features/decants/components/DecantGrid";

const DecantsPage = () => {
  const usuario = useSelector((state) => state.auth.usuario);

  const [decants, setDecants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDecants = async () => {
      try {
        const response = await obtenerDecantsUsuario(usuario._id);

        setDecants(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    cargarDecants();
  }, [usuario]);

  return (
    <DashboardLayout>
      <h1>Mis Decants</h1>

      {loading ? (
        <p>Cargando...</p>
      ) : decants.length === 0 ? (
        <div className="empty-state">
          <h2>No tienes decants aún</h2>

          <p>Explora el catálogo y solicita tu primer decant.</p>
        </div>
      ) : (
        <DecantGrid decants={decants} />
      )}
    </DashboardLayout>
  );
};

export default DecantsPage;
