import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import {
  obtenerDecantPorIdRequest,
  eliminarDecantRequest,
} from "../../../Api/decantApi";

import "./DecantDetail.css";

const DecantDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const usuario = useSelector((state) => state.auth.usuario);

  const [decant, setDecant] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDecant = async () => {
      try {
        const response = await obtenerDecantPorIdRequest(usuario._id, id);

        setDecant(response);
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message || "Error al crear el decant",
        );
      } finally {
        setLoading(false);
      }
    };

    if (usuario) {
      cargarDecant();
    }
  }, [id, usuario]);

  const handleEliminarDecant = async () => {
    const confirmar = window.confirm("¿Deseas eliminar este decant?");

    if (!confirmar) {
      return;
    }

    try {
      await eliminarDecantRequest(decant._id, usuario._id);

      toast.success(
  "Decant eliminado correctamente"
);

navigate("/login");

      setTimeout(() => {
        navigate("/decants");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear el decant");
    }
  };

  if (loading) {
    return <h2>Cargando decant...</h2>;
  }


  if (!decant) {
    return <h2>Decant no encontrado</h2>;
  }

  return (
    <section className="decant-detail">
      <div className="decant-detail__image">
        <img
          src={
            decant.perfumeImagen ||
            "https://placehold.co/600x600?text=Sin+Imagen"
          }
          alt={decant.perfumeNombre}
        />
      </div>

      <div className="decant-detail__content">
        <h1>{decant.perfumeNombre}</h1>

        <h2>{decant.perfumeMarca}</h2>

        <p>
          <strong>Concentración:</strong> {decant.perfumeConcentracion}
        </p>

        <button className="btn btn-danger" onClick={handleEliminarDecant}>
          Eliminar Decant
        </button>
      </div>
    </section>
  );
};

export default DecantDetail;
