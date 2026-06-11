import { Link } from "react-router-dom";

import "./OrdenCard.css";

const OrdenCard = ({ orden }) => {
  return (
    <Link to={`/ordenes/${orden._id}`}>
      <article className="orden-card">
        <img
          src={
            orden.perfumeImagen ||
            "https://placehold.co/400x400?text=Sin+Imagen"
          }
          alt={orden.perfumeNombre}
        />

        <div className="orden-info">
          <h3>{orden.perfumeNombre}</h3>

          <p className="brand">{orden.perfumeMarca}</p>

          <p className="details">
            {orden.perfumeConcentracion || "Sin concentración"}
          </p>

          <div className="orden-footer">
            <span className="orden-price">${orden.precio}</span>

            <span className="orden-date">
              {new Date(orden.fechaCompra).toLocaleDateString()}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default OrdenCard;
