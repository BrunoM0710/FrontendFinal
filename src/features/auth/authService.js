import { loginRequest, registerRequest } from "../../Api/authApi";

export const loginUser = async (credentials) => {
  const response = await loginRequest(credentials);

  localStorage.setItem("token", response.token);

  localStorage.setItem("usuario", JSON.stringify(response.usuario));

  return response;
};

export const registerUser = async (userData) => {
  const response = await registerRequest(userData);

  localStorage.setItem("token", response.token);

  localStorage.setItem("usuario", JSON.stringify(response.usuario));

  return response;
};
