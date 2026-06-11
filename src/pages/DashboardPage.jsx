import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { obtenerDecantsUsuario } from "../features/decants/decantService";
import "../pages/estilos/DashboardPage.css";

const DashboardPage = () => {
  const usuario = useSelector((state) => state.auth.usuario);
  const [ultimosDecants, setUltimosDecants] = useState([]);
  useEffect(() => {
    const cargarDecants = async () => {
      try {
        const response = await obtenerDecantsUsuario(usuario._id);

        setUltimosDecants(response.slice(-3).reverse());
      } catch (error) {
        console.error(error);
      }
    };

    if (usuario) {
      cargarDecants();
    }
  }, [usuario]);
  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <h1>Bienvenido, {usuario?.nombre}</h1>

        <p>Gestiona tu colección de perfumes y decants.</p>
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-card">
          <h3>Membresía</h3>

          <span>{usuario?.esPremium ? "Premium" : "Plus"}</span>
        </div>

        <div className="dashboard-card">
          <h3>Mis Decants</h3>

          <span>{usuario?.decant?.length || 0}</span>
        </div>

        <div className="dashboard-card">
          <h3>Límite</h3>

          <span>{usuario?.esPremium ? "Ilimitado" : "4"}</span>
        </div>
      </div>
      <section className="recent-decants">
        <h2>Últimos Decants</h2>

        {ultimosDecants.length === 0 ? (
          <p>Aún no tienes decants registrados.</p>
        ) : (
          <div className="recent-decants-grid">
            {ultimosDecants.map((decant) => (
              <Link
                key={decant._id}
                to={`/decants/${decant._id}`}
                className="recent-decant-card"
              >
                <img
                  src={
                    decant.perfumeImagen ||
                    "https://placehold.co/150x150?text=Sin+Imagen"
                  }
                  alt={decant.perfumeNombre}
                />

                <div>
                  <h4>{decant.perfumeNombre}</h4>

                  <p>{decant.perfumeMarca}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;
