import { Link } from "react-router-dom";

import RegisterForm from "../features/auth/components/RegisterForm";

import "./estilos/AuthPage.css";

const RegisterPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>PerfumeHub</h1>

        <p className="auth-subtitle">Crea tu cuenta y comienza tu colección.</p>

        <RegisterForm />

        <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
