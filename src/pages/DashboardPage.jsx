import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import { obtenerDecantsUsuario } from "../features/decants/decantService";
import { obtenerEstadisticasPerfumes } from "../features/ordenes/ordenService";
import EstadisticasPerfumes from "../features/ordenes/components/EstadisticasPerfumes";

import "../pages/estilos/DashboardPage.css";

const DashboardPage = () => {
  const usuario = useSelector((state) => state.auth.usuario);

  const [ultimosDecants, setUltimosDecants] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);
  const [cargandoEstadisticas, setCargandoEstadisticas] = useState(true);
  const [errorEstadisticas, setErrorEstadisticas] = useState("");

  // Cargar últimos decants del usuario
  useEffect(() => {
    if (!usuario?._id) return;

    let activo = true;

    const cargarDecants = async () => {
      try {
        const response = await obtenerDecantsUsuario(usuario._id);

        if (activo) {
          setUltimosDecants(response.slice(-3).reverse());
        }
      } catch (error) {
        console.error("Error al cargar decants:", error);
      }
    };

    cargarDecants();

    return () => {
      activo = false;
    };
  }, [usuario?._id]);

  // Cargar estadísticas de perfumes
  useEffect(() => {
    let activo = true;

    const cargarEstadisticas = async () => {
      try {
        setCargandoEstadisticas(true);
        setErrorEstadisticas("");

        const response = await obtenerEstadisticasPerfumes();

        if (activo) {
          setEstadisticas(response.estadisticas ?? []);
        }
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);

        if (activo) {
          setErrorEstadisticas(
            "No se pudieron cargar las estadísticas de perfumes.",
          );
        }
      } finally {
        if (activo) {
          setCargandoEstadisticas(false);
        }
      }
    };

    cargarEstadisticas();

    return () => {
      activo = false;
    };
  }, []);

  const totalCompras = estadisticas.reduce(
    (total, item) => total + item.cantidadCompras,
    0,
  );

  const perfumeMasComprado = estadisticas[0];

  const perfumeMenosComprado =
    estadisticas.length > 0 ? estadisticas[estadisticas.length - 1] : null;

  return (
    <DashboardLayout>
      {/* Encabezado */}
      <div className="dashboard-header">
        <h1>Bienvenido, {usuario?.nombre}</h1>
        <p>Gestiona tu colección de perfumes y decants.</p>
      </div>

      {/* Estadísticas del usuario */}
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

      {/* Estadísticas de compras globales */}
      <section className="dashboard-analytics">
        <div className="dashboard-section-header">
          <h2>Estadísticas de perfumes</h2>
          <p>
            Descubre cuáles son las fragancias más solicitadas en Maison
            Sillage.
          </p>
        </div>

        {cargandoEstadisticas ? (
          <p>Cargando estadísticas...</p>
        ) : errorEstadisticas ? (
          <p className="dashboard-error">{errorEstadisticas}</p>
        ) : estadisticas.length === 0 ? (
          <p>Todavía no hay compras registradas.</p>
        ) : (
          <>
            <div className="dashboard-stats">
              <div className="dashboard-card">
                <h3>Total de compras</h3>
                <span>{totalCompras}</span>
              </div>

              <div className="dashboard-card">
                <h3>Perfume más comprado</h3>
                <span className="dashboard-stat-name">
                  {perfumeMasComprado?.nombre}
                </span>
                <p>{perfumeMasComprado?.cantidadCompras} compras</p>
              </div>

              <div className="dashboard-card">
                <h3>Perfume menos comprado</h3>
                <span className="dashboard-stat-name">
                  {perfumeMenosComprado?.nombre}
                </span>
                <p>{perfumeMenosComprado?.cantidadCompras} compras</p>
              </div>
            </div>

            <div className="dashboard-chart-container">
              <h3>Ranking de perfumes por compras</h3>
              <EstadisticasPerfumes estadisticas={estadisticas} />
            </div>
          </>
        )}
      </section>

      {/* Últimos decants */}
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
