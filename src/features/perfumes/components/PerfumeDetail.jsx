import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { crearOrden } from "../../ordenes/ordenService";
import { getPerfumeById } from "../../../Api/perfumeApi";
import { crearDecant } from "../../decants/decantService";
import { toast } from "react-toastify";
import "./PerfumeDetail.css";

const PerfumeDetail = () => {
  const { id } = useParams();
  const usuario = useSelector((state) => state.auth.usuario);
  const [perfume, setPerfume] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleCrearDecant = async () => {
    try {
      const response = await crearDecant(usuario._id, perfume._id);

      toast.success("Decant creado correctamente");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear el decant");
    }
  };
  const handleComprar = async () => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    try {
      await crearOrden(usuario._id, perfume._id);

      toast.success("Orden creada correctamente");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear la orden");
    }
  };
  useEffect(() => {
    const cargarPerfume = async () => {
      try {
        const response = await getPerfumeById(id);

        setPerfume(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    cargarPerfume();
  }, [id]);

  if (loading) {
    return <h2>Cargando perfume...</h2>;
  }

  if (!perfume) {
    return <h2>Perfume no encontrado</h2>;
  }

  return (
    <section className="perfume-detail">
      <div className="perfume-detail__image">
        <img
          src={perfume.imagen || "https://placehold.co/600x600?text=Sin+Imagen"}
          alt={perfume.nombre}
        />
      </div>
      {perfume.stock <= 0 && <span className="stock-badge">Agotado</span>}
      <div className="perfume-detail__content">
        <h1>{perfume.nombre}</h1>

        <h2>{perfume.marca}</h2>

        <div className="detail-badges">
          <span>{perfume.concentracion}</span>

          <span>{perfume.familiaOlfativa}</span>
        </div>

        <p>
          <strong>Tamaño:</strong> {perfume.tamanio} ml
        </p>

        <p>
          <strong>Duración:</strong> {perfume.duracion}
        </p>

        <p>
          <strong>Proyección:</strong> {perfume.proyeccion}
        </p>

        <p className="stock-status">
          {perfume.stock > 0
            ? `Disponible (${perfume.stock} unidades)`
            : "Sin stock"}
        </p>
        <div className="price">${perfume.precio}</div>
      </div>

      {isAuthenticated ? (
        <div>
          {" "}
          <button className="btn btn-primary" onClick={handleCrearDecant}>
            Solicitar Decant
          </button>{" "}
          <button
            className="btn btn-primary"
            onClick={handleComprar}
            disabled={perfume.stock <= 0}
          >
            {perfume.stock > 0 ? "Comprar Perfume" : "Sin Stock"}
          </button>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Inicia sesión para solicitar
        </button>
      )}
    </section>
  );
};

export default PerfumeDetail;
