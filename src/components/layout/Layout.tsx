import { Outlet } from "react-router-dom";
import Menu from "../../features/nav/Menu";
import Navbar from "../../features/nav/Navbar";

const Layout = () => {
    return (
      <div className="m-auto max-w-screen-2xl">
        <Navbar />
        <div className="flex">
          <Menu />
  
          <main className="w-full p-4">
            <Outlet />
          </main>
        </div>
      </div>
    );
  };

  export default Layout