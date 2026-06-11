import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import DashboardLayout from "../components/layout/DashboardLayout";

import {
  fetchPerfumesStart,
  fetchPerfumesSuccess,
  fetchPerfumesFailure,
} from "../features/perfumes/perfumeSlice";

import { obtenerPerfumes } from "../features/perfumes/perfumeService";

import PerfumeGrid from "../features/perfumes/components/PerfumeGrid";

const PerfumesPage = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { perfumes, totalPages, loading, error } = useSelector(
    (state) => state.perfumes,
  );

  useEffect(() => {
    const cargarPerfumes = async () => {
      try {
        dispatch(fetchPerfumesStart());

        const response = await obtenerPerfumes(page, search);

        dispatch(fetchPerfumesSuccess(response));
      } catch (error) {
        dispatch(fetchPerfumesFailure(error.message));
      }
    };

    cargarPerfumes();
  }, [page, search]);
  return (
    <DashboardLayout>
      <h1>Catálogo de Perfumes</h1>
      <input
        className="search-bar"
        type="text"
        placeholder="Buscar por nombre o marca..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);

          setPage(1);
        }}
      />
      {loading && <p>Cargando...</p>}

      {error && <p>{error}</p>}

      <PerfumeGrid perfumes={perfumes} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </DashboardLayout>
  );
};

export default PerfumesPage;
