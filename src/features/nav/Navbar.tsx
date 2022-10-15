import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import useModal from "../modal/useModal";
import Modal from "../modal/Modal";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { useLogoutMutation } from "../auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserId } from "../user/userSlice";
import { List, UploadSimple, User } from "phosphor-react";
import { selectMenuIsOpen, setMenuIsOpen } from "./menuSlice";
import useWindowSize from "../../hooks/useWindowSize";

const Navbar = () => {
  const [logout] = useLogoutMutation();
  const currentUserId = useSelector(selectCurrentUserId);
  const isLoggedIn = currentUserId;

  const menuIsOpen = useSelector(selectMenuIsOpen);

  const width = useWindowSize();
  const isDesktop = width > 1280;

  const dispatch = useDispatch();

  const {
    isOpen: isLoginModalOpen,
    openModal: openLoginModal,
    closeModal: closeLoginModal,
  } = useModal();

  const {
    isOpen: isRegisterModalOpen,
    openModal: openRegisterModal,
    closeModal: closeRegisterModal,
  } = useModal();

  const Modals = (
    <>
      <Modal
        isOpen={isLoginModalOpen}
        handleClose={closeLoginModal}
        title="Login"
      >
        <Login handleModalClose={closeLoginModal} />
      </Modal>
      <Modal
        isOpen={isRegisterModalOpen}
        handleClose={closeRegisterModal}
        title="Register"
      >
        <Register handleModalClose={closeRegisterModal} />
      </Modal>
    </>
  );

  const loggedInActions = (
    <>
      <li>
        <Link to={`/user/${currentUserId}`}>My Channel</Link>
      </li>
      <li onClick={() => logout(null)}>
        <span>Logout</span>
      </li>
    </>
  );

  const notLoggedInActions = (
    <>
      <li onClick={openLoginModal}>
        <span>Login</span>
      </li>
      <li onClick={openRegisterModal}>
        <span>Register</span>
      </li>
    </>
  );

  const toggleMenu = () => {
    dispatch(setMenuIsOpen(!menuIsOpen));
  };

  return (
    <header className="navbar sticky top-0 z-10 bg-base-100">
      <div className="navbar-start flex gap-2">

        {!isDesktop && (
          <button className="btn btn-ghost btn-circle" onClick={toggleMenu}>
            <List size={24} />
          </button>
        )}

        <Link to="/">
          <h1 className="select-none text-xl font-black uppercase">
            Watch<span className="text-primary">TV</span>
          </h1>
        </Link>
      </div>

      <div className="navbar-end flex gap-2">
        {isLoggedIn && (
          <span
            className="tooltip tooltip-bottom hover:tooltip-open"
            data-tip="Upload"
          >
            <Link to="/upload" className="btn btn-ghost btn-circle">
              <UploadSimple size={24} />
            </Link>
          </span>
        )}

        <SearchBar />
        {/*  */}
        <div className="dropdown-end dropdown dropdown-hover">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <User size={24} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-40 bg-base-300 p-2"
          >
            {isLoggedIn ? loggedInActions : notLoggedInActions}
          </ul>
        </div>
        {Modals}
        {/*  */}
      </div>
    </header>
  );
};

export default Navbar;
