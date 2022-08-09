import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "@/store";

type Props = {
  children: ReactElement;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  // Replace with your auth condition
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