import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "../features/nav/Menu";
import Navbar from "../features/nav/Navbar";
import PersistLogin from "../features/auth/PersistLogin";
import Home from "../features/video/Home";
import Video from "../features/video/Video";
import User from "../features/user/User";
import Upload from "../features/video/Upload";
import RequireAuth from "../features/auth/RequireAuth";
import Search from "../features/video/Search";
import Tags from "../features/video/Tags";

const App = () => {
  return (
    <div className="m-auto max-w-screen-2xl">
      <BrowserRouter>
        <Navbar />
        <div className="flex">
          <Menu />

          <main className="w-full p-4">
            <Routes>
              <Route element={<PersistLogin />}>
                <Route index element={<Home type="random" />} />
                <Route
                  path="feed/trending"
                  element={<Home type="trending" />}
                />
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
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
