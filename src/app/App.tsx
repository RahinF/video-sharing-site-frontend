import { FC, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "../components/layout/Layout";
import PersistLogin from "../features/auth/PersistLogin";
import RequireAuth from "../features/auth/RequireAuth";

const Home = lazy(() => import("../features/feed/Home"));
const Login = lazy(() => import("../features/auth/Login"));
const Register = lazy(() => import("../features/auth/Register"));
const Search = lazy(() => import("../features/feed/Search"));
const Tags = lazy(() => import("../features/feed/Tags"));
const User = lazy(() => import("../features/user"));
const Video = lazy(() => import("../features/video"));
const Upload = lazy(() => import("../features/video/upload"));

const App: FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home type="random" />} />
          <Route path="feed/trending" element={<Home type="trending" />} />
          <Route path="search" element={<Search />} />
          <Route path="tags" element={<Tags />} />
          <Route path="video/:id" element={<Video />} />
          <Route path="user/:id" element={<User />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<RequireAuth />}>
            <Route
              path="feed/subscriptions"
              element={<Home type="subscriptions" />}
            />
            <Route path="upload" element={<Upload />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
