import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserId } from "../user/userSlice";
import { NavLink } from "react-router-dom";
import Subscriptions from "./Subscriptions";
import menuItems from "./menuItems";
import { selectMenuIsOpen, setMenuIsOpen } from "./menuSlice";
import clsx from "clsx";
import useWindowSize from "../../hooks/useWindowSize";
import { useEffect } from "react";
import OutSideClick from "../../hooks/useOutsideClick";
import { X } from "phosphor-react";

const Menu = () => {
  const isLoggedIn = useSelector(selectCurrentUserId);
  const menuIsOpen = useSelector(selectMenuIsOpen);
  const width = useWindowSize();

  const dispatch = useDispatch();

  const isDesktop = width > 1280;

  const isMobileAndMenuOpen = menuIsOpen && !isDesktop;

  useEffect(() => {
    if (isDesktop) {
      dispatch(setMenuIsOpen(true));
    } else {
      dispatch(setMenuIsOpen(false));
    }
  }, [isDesktop, dispatch]);

  useEffect(() => {
    if (isMobileAndMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isMobileAndMenuOpen]);

  const closeMenu = () => {
    if (isMobileAndMenuOpen) {
      dispatch(setMenuIsOpen(false));
    }
  };

  if (menuIsOpen)
    return (
      <>
        {isMobileAndMenuOpen && (
          <div
            className="fixed top-0 z-50 h-screen w-screen bg-black/50"
            onClick={closeMenu}
          />
        )}

        <OutSideClick
          onClick={closeMenu}
          className={clsx("z-50 w-56 shrink-0", {
            "fixed bottom-0 top-0 bg-base-100": isMobileAndMenuOpen,
          })}
        >
          {isMobileAndMenuOpen && (
            <div className="p-2">
              <button className="btn btn-ghost btn-circle" onClick={closeMenu}>
                <X size={24} />
              </button>
            </div>
          )}
          <div className="fixed top-16 bottom-0 w-56 overflow-y-auto overscroll-contain">
            <ul className="menu rounded-box p-2">
              {menuItems.map((item, index) => {
                if (item.requiresAuth && !isLoggedIn) return null;

                return (
                  <li key={index}>
                    <NavLink
                      to={item.to}
                      className="flex items-center"
                      onClick={closeMenu}
                      children={({ isActive }) => (
                        <>
                          <item.icon
                            size={24}
                            weight={isActive ? "fill" : "regular"}
                          />
                          <span>{item.text}</span>
                        </>
                      )}
                    />
                  </li>
                );
              })}
            </ul>
            <div className="divider" />
            <Subscriptions closeMenu={closeMenu}/>
          </div>
        </OutSideClick>
      </>
    );

  return null;
};

export default Menu;
