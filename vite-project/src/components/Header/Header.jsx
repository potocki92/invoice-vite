import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Header.css";
import { ReactComponent as LogoffIcon } from "../../assets/images/svg/logout.svg";
import { homeLink } from "../../utils/linkConfig";
import {
  BurgerIcon,
  HeaderStyled,
  MobileHeader,
  ToggleMenuButton,
} from "./Header.styled";

const Header = ({ setLoginUser }) => {
  const [isClick, setIsClick] = useState(false);
  const handleBurgerClick = () => {
    setIsClick(!isClick);
  };

  const [user, setItems] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoginUser({});
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setItems(user);
    }
  }, []);
  return (
    <>
      <MobileHeader>
        <ToggleMenuButton>
          <BurgerIcon className={isClick ? "active" : ""}>
            <span></span>
            <span></span>
            <span></span>
          </BurgerIcon>
        </ToggleMenuButton>
      </MobileHeader>
      <HeaderStyled>
        <div className="container">
          <div className="header__flex-row">
            <div className="header__textContainer">
              <span className="header__userName">{user?.user?.user?.name}</span>
              <p className="header__userSpecification">User</p>
            </div>
            <Link to={`${homeLink}/user`}>
              <button className="header-circle">
                <svg
                  className="header__svg"
                  width={"24px"}
                  height={"24px"}
                ></svg>
              </button>
            </Link>
            <button
              className="header__button--logout"
              onClick={() => handleLogout()}
            >
              <svg className="header__svg" width={"24px"} height={"24px"}>
                <LogoffIcon />
              </svg>
            </button>
          </div>
        </div>
      </HeaderStyled>
    </>
  );
};

export default Header;
