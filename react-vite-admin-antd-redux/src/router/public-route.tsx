import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/store";

type Props = {
  children: ReactElement;
};

const PublicRoute: React.FC<Props> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;

/*
    <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
 */