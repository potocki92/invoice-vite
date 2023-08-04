import React, { Fragment } from "react";
import "./Homepage.css";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@components/Common/Sidebar/Sidebar";
import UserMenu from "@components/Common/UserMenu/UserMenu";

const Homepage = ({ setLoginUser, user }) => {
  let location = useLocation();

  return (
    <Fragment>
      <div className="homepage">
        <Sidebar setLoginUser={setLoginUser}/>
        {location.pathname === "/invoice-vite/" && user && user._id ? (
            <div>
                <h1>Hello, {user.name}!</h1>
                <p>Your ID: {user._id}</p>
            </div>
        ) : (
      <div className="homepage__content">
            <UserMenu setLoginUser={setLoginUser} />
            <Outlet />
          </div>

        )}
      </div>
    </Fragment>
  );
};

export default Homepage;
