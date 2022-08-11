import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStore } from "@/store";

type Props = {
  children: ReactElement;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  // Replace with your auth condition
  const { isAuthenticated } = useStore((state) => state);
  let location = useLocation();

  return isAuthenticated ? children : <Navigate to="/login" state={{location}} replace />;
};

export default PrivateRoute;

/**
    <Route
        path="/articles"
        element={
          <PrivateRoute>
            <Articles />
          </PrivateRoute>
        }
      />
    </Routes>
 */
