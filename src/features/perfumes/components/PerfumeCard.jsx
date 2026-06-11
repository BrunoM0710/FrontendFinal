import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./perfumeCard.css"; 
 
const PerfumeCard = ({ perfume }) => {
  const navigate = useNavigate();

  return (
    <Link to={`/perfumes/${perfume._id}`}>
      <article
        className={`perfume-card ${perfume.stock <= 0 ? "out-of-stock" : ""}`}
        onClick={() => navigate(`/perfumes/${perfume._id}`)}
      >
        <img
          src={perfume.imagen || "https://placehold.co/400x400?text=Sin+Imagen"}
          alt={perfume.nombre}
          className="perfume-image"
        />

        <div className="perfume-info">
          <h3>{perfume.nombre}</h3>

          <p>{perfume.marca}</p>

          <p>
            {perfume.concentracion} • {perfume.familiaOlfativa}
          </p>
          <div className="perfume-stock">
            {perfume.stock > 0 ? (
              <span className="stock-available">Stock: {perfume.stock}</span>
            ) : (
              <span className="stock-empty">Sin stock</span>
            )}
          </div>
          <span>${perfume.precio}</span>
        </div>
      </article>
    </Link>
  );
};

export default PerfumeCard;
