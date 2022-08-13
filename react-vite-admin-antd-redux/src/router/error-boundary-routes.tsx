import { Outlet, Route, Routes, RoutesProps } from "react-router-dom";
import { ErrorBoundary } from "~/components";

const ErrorBoundaryRoutes = ({ children }: RoutesProps) => {
  return (
    <Routes>
      <Route
        element={
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        }
      >
        {children}
      </Route>
    </Routes>
  );
};

export default ErrorBoundaryRoutes;
