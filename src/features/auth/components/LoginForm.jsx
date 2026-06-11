import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "../../../validators/authValidators";
import { loginUser } from "../authService";
import { loginStart, loginSuccess, loginFailure } from "../authSlice";
import { toast } from "react-toastify";
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authError = useSelector((state) => state.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: joiResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      dispatch(loginStart());

      const response = await loginUser(data);

      dispatch(
        loginSuccess({
          usuario: response.usuario,
          token: response.token,
        }),
      );

      toast.success(`Bienvenido a Maison Sillage, ${response.usuario.nombre}`);

      navigate("/dashboard");
    } catch (error) {
      const mensaje =
        error.response?.data?.message || "Error al iniciar sesión";

      dispatch(loginFailure(mensaje));

      toast.error(mensaje);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Iniciar Sesión</h1>

      <div>
        <label>Email</label>

        <input type="email" {...register("email")} />

        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>Contraseña</label>

        <input type="password" {...register("contrasenia")} />

        {errors.contrasenia && <span>{errors.contrasenia.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn btn-primary">
        {isSubmitting ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
};

export default LoginForm;
