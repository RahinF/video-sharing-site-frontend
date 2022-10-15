import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refresh] = useRefreshMutation();
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh(null).unwrap();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !token ? verifyRefreshToken() : setIsLoading(false);
  }, [token, refresh]);

  if (isLoading) return null;
  return <Outlet />;
};

export default PersistLogin;
