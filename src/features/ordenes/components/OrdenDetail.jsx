import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { obtenerOrdenPorId, eliminarOrden } from "../ordenService";

import "./OrdenDetail.css";

const OrdenDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const usuario = useSelector((state) => state.auth.usuario);

  const [orden, setOrden] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarOrden = async () => {
      try {
        const response = await obtenerOrdenPorId(id);

        setOrden(response);
      } catch (error) {
        toast.error("No se pudo cargar la orden");
      } finally {
        setLoading(false);
      }
    };

    cargarOrden();
  }, [id]);

  const handleEliminarOrden = async () => {
    const confirmar = window.confirm("¿Deseas cancelar esta orden?");

    if (!confirmar) return;

    try {
      await eliminarOrden(usuario._id, orden._id);

      toast.success("Orden cancelada correctamente");

      navigate("/ordenes");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al cancelar la orden",
      );
    }
  };

  if (loading) {
    return <h2>Cargando orden...</h2>;
  }

  if (!orden) {
    return <h2>Orden no encontrada</h2>;
  }

  return (
    <section className="orden-detail">
      <img
        src={
          orden.perfumeImagen || "https://placehold.co/600x600?text=Sin+Imagen"
        }
        alt={orden.perfumeNombre}
      />

      <h1>{orden.perfumeNombre}</h1>

      <h2>{orden.perfumeMarca}</h2>

      <div className="detail-badges">
        <span>{orden.perfumeConcentracion}</span>
      </div>

      <p>
        <strong>Precio:</strong>
        {" $"}
        {orden.precio}
      </p>

      <p>
        <strong>Fecha:</strong>{" "}
        {new Date(orden.fechaCompra).toLocaleDateString()}
      </p>

      <button className="btn-danger" onClick={handleEliminarOrden}>
        Cancelar Orden
      </button>
    </section>
  );
};

export default OrdenDetail;
