import { Link } from "react-router-dom";
import "./DecantCard.css";

const DecantCard = ({ decant }) => {
  return (
    <Link to={`/decants/${decant._id}`}>
      <article className="perfume-card">
        <img
          src={
            decant.perfumeImagen ||
            "https://placehold.co/400x400?text=Sin+Imagen"
          }
          alt={decant.perfumeNombre}
          className="perfume-image"
        />

        <div className="perfume-info">
          <h3>{decant.perfumeNombre}</h3>

          <p className="brand">{decant.perfumeMarca}</p>

          <p className="details">{decant.perfumeConcentracion}</p>
        </div>
      </article>
    </Link>
  );
};

export default DecantCard;