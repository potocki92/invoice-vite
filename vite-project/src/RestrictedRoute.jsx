import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

/**
 * A custom restricted route component that redirects to a specified route if the user is authenticated.
 *
 * @param {Object} props - The props passed to the component.
 * @param {React.ComponentType} props.component - The component to render if the user is not authenticated.
 * @param {string} [props.redirectTo="/login"] - The route to redirect to if the user is authenticated.
 * @returns {React.ReactNode} - The rendered component or a redirection.
 */
export const RestrictedRoute = ({
  component: Component,
  redirectTo = "/login",
}) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
