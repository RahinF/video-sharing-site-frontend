import clsx from "clsx";
import FocusTrap from "focus-trap-react";
import { X } from "phosphor-react";
import { KeyboardEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import OutSideClick from "../../../hooks/useOutsideClick";
import useWindowSize from "../../../hooks/useWindowSize";
import { selectCurrentUserId } from "../../user/userSlice";
import { selectMenuIsOpen, setMenuIsOpen } from "../menuSlice";
import menuItems from "./menuItems";
import Subscriptions from "./Subscriptions";

const Sidebar = () => {
  const isLoggedIn = useAppSelector(selectCurrentUserId);
  const menuIsOpen = useAppSelector(selectMenuIsOpen);
  const width = useWindowSize();

  const dispatch = useDispatch();

  const isDesktop = width > 1280;

  const isMobileAndMenuOpen = menuIsOpen && !isDesktop;

  useEffect(() => {
    dispatch(setMenuIsOpen(isDesktop ? true : false));
  }, [isDesktop, dispatch]);

  useEffect(() => {
    document.body.style.overflow = isMobileAndMenuOpen ? "hidden" : "visible";
  }, [isMobileAndMenuOpen]);

  const closeMenu = () => {
    if (isMobileAndMenuOpen) {
      dispatch(setMenuIsOpen(false));
    }
  };

  const handleEscapeKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Escape") {
      closeMenu();
    }
  };

  if (menuIsOpen)
    return (
      <>
        <div
          className={clsx("fixed top-0 z-50 h-screen w-screen bg-black/50", {
            [isMobileAndMenuOpen ? "block" : "hidden"]: true,
          })}
          onClick={closeMenu}
        />

        <OutSideClick
          onClick={closeMenu}
          className={clsx("z-50 w-56 shrink-0 bg-primary", {
            "fixed bottom-0 top-0": isMobileAndMenuOpen,
          })}
        >
          <FocusTrap active={isMobileAndMenuOpen}>
            <div onKeyDown={handleEscapeKeyPress}>
              {isMobileAndMenuOpen && (
                <button
                  className="btn-ghost btn-circle btn m-2"
                  type="button"
                  onClick={closeMenu}
                >
                  <X size={24} />
                </button>
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

                <Subscriptions closeMenu={closeMenu} />
              </div>
            </div>
          </FocusTrap>
        </OutSideClick>
      </>
    );

  return null;
};

export default Sidebar;
