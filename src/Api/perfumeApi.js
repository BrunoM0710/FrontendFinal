import axiosClient from "./axiosClient";
export const obtenerPerfumesRequest = async (page = 1, search = "") => {
  const response = await axiosClient.get(
    `/perfumes?page=${page}&search=${search}`,
  );

  return response.data;
};
export const getPerfumeById = async (id) => {
  const response = await axiosClient.get(`/perfumes/${id}`);

  return response.data;
};
export const crearDecantRequest = async (usuarioId, perfumeId) => {
  const response = await axiosClient.post(`/decant/${usuarioId}-${perfumeId}`);

  return response.data;
};
