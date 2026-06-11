import axiosClient from "./axiosClient";

export const obtenerDecantsUsuarioRequest = async (usuarioId) => {
  const response = await axiosClient.get(`/usuarios/${usuarioId}/decant`);

  return response.data;
};

export const crearDecantRequest = async (usuarioId, perfumeId) => {
  const response = await axiosClient.post(`/decant/${usuarioId}-${perfumeId}`);

  return response.data;
};
export const obtenerDecantPorIdRequest = async (usuarioId, decantId) => {
  const response = await axiosClient.get(`/decant/${usuarioId}-${decantId}`);

  return response.data;
};

export const eliminarDecantRequest = async (decantId, usuarioId) => {
  const response = await axiosClient.delete(`/decant/${decantId}-${usuarioId}`);

  return response.data;
};
