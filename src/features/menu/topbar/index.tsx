import { List, UploadSimple, User } from "phosphor-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Dropdown from "../../../components/Dropdown/Dropdown";
import SkipNavigationButton from "../../../components/skipNavigation/SkipNavigationButton";
import useWindowSize from "../../../hooks/useWindowSize";
import { useLogoutMutation } from "../../auth/authApiSlice";
import { selectCurrentUserId } from "../../user/userSlice";
import { selectMenuIsOpen, setMenuIsOpen } from "../menuSlice";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  const [logout] = useLogoutMutation();
  const currentUserId = useAppSelector(selectCurrentUserId);
  const menuIsOpen = useAppSelector(selectMenuIsOpen);

  const isLoggedIn = currentUserId;

  const width = useWindowSize();
  const isDesktop = width > 1280;

  const dispatch = useAppDispatch();

  const loggedInActions = (
    <>
      <Link to={`/user/${currentUserId}`}>My Channel</Link>
      <button onClick={() => logout()}>Logout</button>
    </>
  );

  const notLoggedInActions = (
    <>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
  );

  const toggleMenu = () => {
    dispatch(setMenuIsOpen(!menuIsOpen));
  };

  return (
    <header className="navbar sticky top-0 z-[2] bg-primary">
      <div className="navbar-start flex gap-2">
        {!isDesktop && (
          <button className="btn-ghost btn-circle btn" onClick={toggleMenu}>
            <List size={24} />
          </button>
        )}

        <Link to="/" aria-label="WatchTV Home">
          <div className="select-none text-xl font-black uppercase">
            Watch<span className="text-primary">TV</span>
          </div>
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

        <Dropdown triggerIcon={User} ariaLabel="user actions">
          {isLoggedIn ? loggedInActions : notLoggedInActions}
        </Dropdown>
      </div>
    </header>
  );
};

export default Navbar;
