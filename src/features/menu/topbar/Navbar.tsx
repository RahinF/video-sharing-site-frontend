import { List, UploadSimple, User } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SkipNavigationButton from "../../../components/skipNavigation/SkipNavigationButton";
import useWindowSize from "../../../hooks/useWindowSize";
import { useLogoutMutation } from "../../auth/authApiSlice";
import { selectCurrentUserId } from "../../user/userSlice";
import { selectMenuIsOpen, setMenuIsOpen } from "../menuSlice";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  const [logout] = useLogoutMutation();
  const currentUserId = useSelector(selectCurrentUserId);
  const isLoggedIn = currentUserId;

  const menuIsOpen = useSelector(selectMenuIsOpen);

  const width = useWindowSize();
  const isDesktop = width > 1280;

  const dispatch = useDispatch();

  const loggedInActions = (
    <>
      <li>
        <Link to={`/user/${currentUserId}`}>My Channel</Link>
      </li>
      <li onClick={() => logout()}>
        <span>Logout</span>
      </li>
    </>
  );

  const notLoggedInActions = (
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </>
  );

  const toggleMenu = () => {
    dispatch(setMenuIsOpen(!menuIsOpen));
  };

  return (
    <header className="navbar sticky top-0 z-10 bg-primary">
      <div className="navbar-start flex gap-2">
        {!isDesktop && (
          <button className="btn-ghost btn-circle btn" onClick={toggleMenu}>
            <List size={24} />
          </button>
        )}

        <Link to="/">
          <h1 className="select-none text-xl font-black uppercase">
            Watch<span className="text-primary">TV</span>
          </h1>
        </Link>

        <SkipNavigationButton />
      </div>

      <div className="navbar-end flex gap-2">
        {isLoggedIn && (
          <span
            className="tooltip tooltip-bottom hover:tooltip-open"
            data-tip="Upload"
          >
            <Link to="/upload" className="btn-ghost btn-circle btn">
              <UploadSimple size={24} />
            </Link>
          </span>
        )}

        <SearchBar />
        {/*  */}
        <div className="dropdown-hover dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <User size={24} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-40 bg-base-300 p-2"
          >
            {isLoggedIn ? loggedInActions : notLoggedInActions}
          </ul>
        </div>

        {/*  */}
      </div>
    </header>
  );
};

export default Navbar;
