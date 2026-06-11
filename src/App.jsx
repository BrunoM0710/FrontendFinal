import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import ContainerPage from "./components/layout/pageContainer";
import ProtectedRoute from "./app/guards/ProtectedRoute";
import InvitadoRoute from "./app/guards/InvitadoRoute";
import PerfumesPage from "./pages/PerfumesPage";
import DecantsPage from "./pages/DecantsPage";
import OrdenesPage from "./pages/OrdenesPage";
import UsuariosPage from "./pages/UsuariosPage";
import PerfumeDetailPage from "./pages/PerfumeDetailPage";
import DecantPage from "./pages/DecantsPage";
import DecantDetailPage from "./pages/DecantDetailPage";
import ProfilePage from "./pages/PerfilPage";
import OrdenDetailPage from "./pages/OrdenDetailPage"

const App = () => {
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContainerPage />}>
            <Route path="perfumes" element={<PerfumesPage />}></Route>

            <Route index element={<Navigate to="/login" replace />} />

            <Route path="login" element={<LoginPage />} />

            <Route path="register" element={<RegisterPage />} />
            <Route element={<InvitadoRoute />}>
              <Route path="/login" element={<LoginPage />} />

              <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="decants" element={<DecantsPage />} />
              <Route path="ordenes" element={<OrdenesPage />} />
              <Route path="/ordenes/:id" element={<OrdenDetailPage />} />
              <Route path="usuarios" element={<UsuariosPage />} />
              <Route path="/decants" element={<DecantsPage />} />
              <Route path="/decants/:id" element={<DecantDetailPage />} />
              <Route path="/perfumes/:id" element={<PerfumeDetailPage />} />
              <Route path="/perfil" element={<ProfilePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    
  );
};

export default App;
