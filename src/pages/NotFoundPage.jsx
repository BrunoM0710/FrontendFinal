import { Link } from "react-router-dom";

import "./estilos/NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <h1>🧴</h1>

        <h2>Fragancia no encontrada</h2>

        <p>
          Parece que este perfume se evaporó antes de que pudieras encontrarlo.
        </p>

        <Link to="/perfumes" className="btn-home">
          Volver al catálogo
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
