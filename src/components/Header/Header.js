import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Header.css";
import { ReactComponent as LogoffIcon } from "../../assets/images/svg/logout.svg";
import { ReactComponent as UserIcon } from "../../assets/images/svg/user.svg";

const Header = ({ setLoginUser }) => {
  let { id } = useParams();
  const [user, setItems] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token")
    setLoginUser({})
  }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setItems(user);
    }
  }, []);
  return (
    <header className="header">
      <div className="container">
        <div className="header__flex-row">
          <div className="header__textContainer">
            <span className="header__userName">{user?.user?.user?.name}</span>
            <p className="header__userSpecification">User</p>
          </div>
          <Link to={`/user`}>
            <button className="header-circle">
              <svg className="header__svg" width={"24px"} height={"24px"}></svg>
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
    </header>
  );
};

export default Header;
