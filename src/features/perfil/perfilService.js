import { actualizarPlanRequest } from "../../Api/perfilApi";

export const actualizarPlanUsuario = async (
  usuarioId
) => {
  return await actualizarPlanRequest(
    usuarioId
  );
};