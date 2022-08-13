import { type ReactElement } from "react";
import { Navigate, type RouteProps } from "react-router-dom";
import { useAppSelector } from "@/store";
import { useRoute } from "~/hooks";
import { ErrorBoundary } from "~/components";

type OwnProps = {
  hasAnyAuthorities?: string[];
  children: ReactElement;
} & RouteProps;

const PrivateRoute: React.FC<OwnProps> = ({ children, hasAnyAuthorities = [], ...restProps }: OwnProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.userInfo);
  const isAuthorized = hasAnyAuthority(user.authorities, hasAnyAuthorities);
  const { location } = useRoute();

  if (!children) {
    throw new Error(`A component needs to be specified for private route for path ${(restProps as any).path}`);
  }

  if (isAuthenticated) {
    if (isAuthorized) {
      return <ErrorBoundary>{children}</ErrorBoundary>;
    }

    return (
      <div className="insufficient-authority">
        <div className="alert alert-danger">您没有权限访问此页面。</div>
      </div>
    );
  }

  return (
    <Navigate
      to={{
        pathname: "/login",
        search: location.search,
      }}
      replace
      state={{ from: location }}
    />
  );

  // return isAuthenticated ? children : <Navigate to="/login" state={{ location }} replace />;
};

export const hasAnyAuthority = (authorities: string[], hasAnyAuthorities: string[]) => {
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities.length === 0) {
      return true;
    }
    return hasAnyAuthorities.some((auth) => authorities.includes(auth));
  }
  return false;
};

/**
 * Checks authentication before showing the children and redirects to the
 * login page if the user is not authenticated.
 * If hasAnyAuthorities is provided the authorization status is also
 * checked and an error message is shown if the user is not authorized.
 */
export default PrivateRoute;

/**
 * 
  <Route
    path="admin/*"
    element={
      <PrivateRoute hasAnyAuthorities={["admin", "user"]}>
        <Admin />
      </PrivateRoute>
    }
  />
 */
