import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectUser,
} from "@redux/auth/selectors";

/**
 * A custom hook that provides authentication-related state from the Redux store.
 *
 * @returns {{
*   isLoggedIn: boolean,
*   isRefreshing: boolean,
*   user: {
*     id: string,
*     name: string,
*     email: string
*   }
* }} - An object containing authentication state.
*/
export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);

  return {
    isLoggedIn,
    isRefreshing,
    user,
  };
};

