import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "@/stores";

type Props = {
  children: ReactElement;
};

const PublicRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useStore((state) => state);

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
