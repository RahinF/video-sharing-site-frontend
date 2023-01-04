import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "../components/layout/Layout";
import PersistLogin from "../features/auth/PersistLogin";
import RequireAuth from "../features/auth/RequireAuth";
import Home from "../features/feed/Home";
import Search from "../features/feed/Search";
import Tags from "../features/feed/Tags";
import User from "../features/user";
import Video from "../features/video";
import Upload from "../features/video/Upload";

const App: React.FC = () => {
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
