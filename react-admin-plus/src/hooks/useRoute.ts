import { useMemo } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

export function useRoute() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const history = useMemo(
    () => ({
      replace: (path: string) => {
        navigate(path, { replace: true });
      },
    }),
    [navigate]
  );

  return useMemo(() => {
    return {
      Link,
      NavLink,
      Outlet,
      navigate,
      params,
      history,
      location,
      searchParams: new URL(window.location.href).searchParams,
    };
  }, [params, history, location]);
}

export default useRoute;
