import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectCurrentToken } from "./authSlice";
import { useAppSelector } from "../../app/hooks";

const RequireAuth = () => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
