import { obtenerPerfumesRequest } from "../../Api/perfumeApi";

export const obtenerPerfumes = async (
  page = 1,
  search = ""
) => {
  return await obtenerPerfumesRequest(
    page,
    search
  );
};