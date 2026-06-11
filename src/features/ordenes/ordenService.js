import {
  obtenerOrdenesUsuarioRequest,
  crearOrdenRequest,
  eliminarOrdenRequest,
  obtenerOrdenPorIdRequest,
} from "../../Api/ordenApi";

export const obtenerOrdenesUsuario = async (usuarioId) => {
  return await obtenerOrdenesUsuarioRequest(usuarioId);
};

export const crearOrden = async (usuarioId, perfumeId) => {
  return await crearOrdenRequest(usuarioId, perfumeId);
};

export const eliminarOrden = async (usuarioId, ordenId) => {
  return await eliminarOrdenRequest(usuarioId, ordenId);
};
export const obtenerOrdenPorId = async (idOrden) => {
  return await obtenerOrdenPorIdRequest(idOrden);
};
