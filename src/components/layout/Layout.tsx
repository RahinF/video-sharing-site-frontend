import { FC, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { GlobalProvider } from "../../context/GlobalContext";
import Sidebar from "../../features/menu/sidebar";
import Navbar from "../../features/menu/topbar";
import NavigationSkipped from "../skipNavigation/NavigationSkipped";
import Spinner from "../Spinner";

const Layout: FC = () => {
  return (
    <GlobalProvider>
      <div className="m-auto min-h-screen max-w-screen-2xl">
        <Toaster />
        <Navbar />
        <div className="flex">
          <Sidebar />
          <NavigationSkipped />
          <main className="w-full p-4">
            <Suspense
              fallback={
                <div className="grid min-h-screen w-full place-items-center">
                  <Spinner />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </GlobalProvider>
  );
};

export default Layout;
