import { Link } from "react-router-dom";
import { UserLogo, UserLogoutButton, UserMenuStyled } from "./UserMenu.styled";
import { ReactComponent as LogoffIcon } from "@assets/images/svg/logout.svg";
import { homeLink } from "@utils/linkConfig";
import { useDispatch } from "react-redux";
import { logOut } from "@redux/auth/operations";

/**
 * Represents a user menu component that provides links to the user profile and logout functionality.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.handleLinkClick - Function to handle link clicks.
 * @returns {JSX.Element} - The rendered UserMenu component.
 */
const UserMenu = ({ handleLinkClick }) => {
  const dispatch = useDispatch();
  
  return (
    <UserMenuStyled>
      <Link to={`${homeLink}/user`} onClick={handleLinkClick}>
        <UserLogo />
      </Link>
      <UserLogoutButton onClick={() => dispatch(logOut())}>
        <LogoffIcon />
      </UserLogoutButton>
    </UserMenuStyled>
  );
};

export default UserMenu;
