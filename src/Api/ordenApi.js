import axiosClient from "./axiosClient";

export const obtenerOrdenesUsuarioRequest = async (usuarioId) => {
  const response = await axiosClient.get(`/usuarios/${usuarioId}`);

  return response.data;
};

export const crearOrdenRequest = async (usuarioId, perfumeId) => {
  const response = await axiosClient.post("/ordenes", {
    idUsuario: usuarioId,
    idPerfume: perfumeId,
  });

  return response.data;
};
export const eliminarOrdenRequest = async (usuarioId, ordenId) => {
  const response = await axiosClient.delete(`/ordenes/${usuarioId}-${ordenId}`);

  return response.data;
};
export const obtenerOrdenPorIdRequest = async (idOrden) => {
  const response = await axiosClient.get(`/ordenes/${idOrden}`);

  return response.data;
};
