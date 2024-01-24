import { useEffect, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";
import "./App.scss";

// Custom hook for tracking page views
const PageTracker = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const gtag = window.gtag;
    if (gtag) {
      gtag("config", "G-XDSM0GGX3V", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return children;
};

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <PageTracker>
        <Routes>
          <Route
            path="/"
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Routes>
      </PageTracker>
    </BrowserRouter>
  );
}

export default App;
