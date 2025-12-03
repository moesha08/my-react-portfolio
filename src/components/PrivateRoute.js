import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  return localStorage.getItem("portfolio_token")
    ? children
    : <Navigate to="/signin" replace />;
}
