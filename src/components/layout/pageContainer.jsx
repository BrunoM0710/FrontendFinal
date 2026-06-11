import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

const PageContainer = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default PageContainer;