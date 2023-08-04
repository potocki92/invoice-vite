import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

/**
 * A custom private route component that redirects to a specified route if the user is not authenticated.
 *
 * @param {Object} props - The props passed to the component.
 * @param {React.ComponentType} props.component - The component to render if the user is authenticated.
 * @param {string} [props.redirectTo="/login"] - The route to redirect to if the user is not authenticated.
 * @returns {React.ReactNode} - The rendered component or a redirection.
 */
export const PrivateRoute = ({
  component: Component,
  redirectTo = "/login",
}) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
