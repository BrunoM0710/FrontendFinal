import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { RegisterSchema } from "../../../validators/authValidators";

import { registerUser } from "../authService";

import { loginStart, loginSuccess, loginFailure } from "../authSlice";

const RegisterForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const authError = useSelector((state) => state.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: joiResolver(RegisterSchema),
    mode: "onChange",
  });

  const onSubmit = async (formData) => {
    try {
      dispatch(loginStart());

      const data = {
        ...formData,
        esPremium: false,
      };

      delete data.repetirConrasenia;
      delete data.aceptarTerminos;

      const response = await registerUser(data);

      dispatch(
        loginSuccess({
          usuario: response.usuario,
          token: response.token,
        }),
      );

      navigate("/dashboard");
    } catch (error) {
      dispatch(
        loginFailure(
          error.response?.data?.message || "Error al registrar usuario",
        ),
      );
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Crear Cuenta</h1>
      <div>
        <label>Nombre</label>

        <input {...register("nombre")} />

        {errors.nombre && <span>{errors.nombre.message}</span>}
      </div>
      <div>
        <label>Apellido</label>

        <input {...register("apellido")} />

        {errors.apellido && <span>{errors.apellido.message}</span>}
      </div>
      <div>
        <label>Edad</label>

        <input
          type="number"
          {...register("edad", {
            valueAsNumber: true,
          })}
        />

        {errors.edad && <span>{errors.edad.message}</span>}
      </div>
      <div>
        <label>Email</label>

        <input type="email" {...register("email")} />
        {authError && <div className="error-message">{authError}</div>}
      </div>
      <div>
        <label>Contraseña</label>

        <input type="password" {...register("contrasenia")} />

        {errors.contrasenia && <span>{errors.contrasenia.message}</span>}
      </div>
      <div>
        <label>Repetir contraseña</label>

        <input type="password" {...register("repetirContrasenia")} />
      </div>
      <div>
        <label>
          <input type="checkbox" {...register("aceptarTerminos")} />
          Acepto los términos y condiciones
        </label>

        {errors.aceptarTerminos && (
          <span>{errors.aceptarTerminos.message}</span>
        )}
      </div>
      {authError && <div className="error-message">{authError}</div>}
      <button type="submit" disabled={isSubmitting} className="btn btn-primary">
        {isSubmitting ? "Registrando..." : "Crear cuenta"}
      </button>
    </form>
  );
};

export default RegisterForm;
