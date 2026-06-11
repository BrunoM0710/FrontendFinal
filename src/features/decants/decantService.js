import {
  obtenerDecantsUsuarioRequest,
  crearDecantRequest,
} from "../../Api/decantApi";

export const obtenerDecantsUsuario = async (usuarioId) => {
  return await obtenerDecantsUsuarioRequest(usuarioId);
};

export const crearDecant = async (usuarioId, perfumeId) => {
  return await crearDecantRequest(usuarioId, perfumeId);
};
export const obtenerDecantPorId = async (usuarioId, decantId) => {
  return await obtenerDecantPorIdRequest(usuarioId, decantId);
};

export const eliminarDecant = async (usuarioId, decantId) => {
  return await eliminarDecantRequest(usuarioId, decantId);
};
