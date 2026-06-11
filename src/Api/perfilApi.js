import axiosClient from "./axiosClient";

export const actualizarPlanRequest = async (
  usuarioId
) => {
  const response = await axiosClient.patch(
    `/usuarios/${usuarioId}`
  );

  return response.data;
};