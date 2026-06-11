import Navbar from "./layout/Navbar.jsx";

const AppLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>
    </>
  );
};

export default AppLayout;