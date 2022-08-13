import { useMemo } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

export function useRoute() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  return useMemo(() => {
    return {
      Link,
      NavLink,
      Outlet,
      navigate,
      params,
      location,
      searchParams: new URL(window.location.href).searchParams,
    };
  }, [params, location]);
}

export default useRoute;
