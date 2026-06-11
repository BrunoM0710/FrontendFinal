import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Navbar.css";

import { logout } from "../../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usuario = useSelector((state) => state.auth.usuario);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <header className="navbar">
      <div className="navbar__branding">
        <h1 className="navbar__logo">MAISON SILLAGE</h1>

        <span className="navbar__tagline">Descubre tu firma olfativa.</span>
      </div>

      <div className="navbar__user">
        <div className="navbar__userinfo">
          <span className="navbar__name">
            {usuario?.nombre} {usuario?.apellido}
          </span>

          {usuario?.esPremium && (
            <span className="navbar__premium">Premium</span>
          )}
        </div>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>

            <Link to="/perfil">Perfil</Link>

            <button onClick={handleLogout} className="logout-btn">
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Ingresar</Link>

            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
