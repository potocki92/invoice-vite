import { Link } from "react-router-dom";
import { UserLogo, UserLogoutButton, UserMenuStyled } from "./UserMenu.styled";
import { ReactComponent as LogoffIcon } from "../../../assets/images/svg/logout.svg";
import { useState } from "react";
import { useEffect } from "react";
import { homeLink } from "../../../utils/linkConfig";
import { clearFromLocalStorage } from "../../../api/localStorageAPI";
const UserMenu = ({setLoginUser, handleLinkClick}) => {
    const [user, setItems] = useState([]);

    const handleLogout = () => {
        clearFromLocalStorage("token");
        clearFromLocalStorage("invoices")
        setLoginUser({});
    };
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
        setItems(user);
        }
    }, []);
    return (
        <UserMenuStyled>
            <Link to={`${homeLink}/user`} onClick={handleLinkClick}>
                <UserLogo/>
            </Link>
            <UserLogoutButton onClick={() => handleLogout()}>
                <LogoffIcon />
            </UserLogoutButton>
        </UserMenuStyled>
    );
}

export default UserMenu;