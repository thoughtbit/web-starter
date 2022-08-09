import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "@/store";

type Props = {
  children: ReactElement;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  // Replace with your auth condition
  const { isAuthenticated } = useStore((state) => state);

  return isAuthenticated ? children : <Navigate to="/login" />;
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
