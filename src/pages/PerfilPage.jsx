import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../components/layout/DashboardLayout";

import { loginSuccess } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { actualizarPlanUsuario } from "../features/perfil/perfilService";
import "../pages/estilos/PerfilPage.css";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const usuario = useSelector((state) => state.auth.usuario);

  const token = useSelector((state) => state.auth.token);

  const handleUpgrade = async () => {
    try {
      const usuarioActualizado = await actualizarPlanUsuario(usuario._id);

      dispatch(
        loginSuccess({
          usuario: usuarioActualizado,
          token,
        }),
      );

      localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));
      toast.success("Ahora eres usuario Premium ⭐");

    } catch (error) {
      toast.error(
  error.response?.data?.message ||
  "Error al actualizar el plan"
);
    }
  };
  return (
    <DashboardLayout>
      <h1>Mi Perfil</h1>

      <div className="profile-card">
        <p>
          <strong>Nombre:</strong> {usuario.nombre}
        </p>

        <p>
          <strong>Apellido:</strong> {usuario.apellido}
        </p>

        <p>
          <strong>Email:</strong> {usuario.email}
        </p>

        <p>
          <strong>Edad:</strong> {usuario.edad}
        </p>
      </div>

      <div className="membership-card">
        <h2>Membresía</h2>

        {usuario.esPremium ? (
          <>
            <span className="premium-badge">⭐ Premium</span>

            <p>Acceso ilimitado a decants.</p>
          </>
        ) : (
          <>
            <span className="plus-badge">Plus</span>

            <p>Máximo 4 decants.</p>

            <button className="btn-premium" onClick={handleUpgrade}>
              Actualizar a Premium
            </button>
          </>
        )}

      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
