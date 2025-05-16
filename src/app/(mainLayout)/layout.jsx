// import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      {/* <Navbar /> */}

      <main className="mt-16">{children}</main>
    </>
  );
};

export default MainLayout;
