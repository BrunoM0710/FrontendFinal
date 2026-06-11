import { Link } from "react-router-dom";
import LoginForm from "../features/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>PerfumeHub</h1>

        <LoginForm />

        <Link to="/register">¿Aún no tienes huella olfativa? Resgistrate aquí</Link>
      </div>
    </div>
  );
};

export default LoginPage;
