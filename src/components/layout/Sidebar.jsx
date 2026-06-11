import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.css";

const Sidebar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <aside className="sidebar">
      <h3>Menú</h3>

      <nav>
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>

            <NavLink to="/perfil">Mi Perfil</NavLink>

            <NavLink to="/perfumes">Perfumes</NavLink>

            <NavLink to="/ordenes">Órdenes</NavLink>

            <NavLink to="/decants">Mis Decants</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/perfumes">Perfumes</NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
