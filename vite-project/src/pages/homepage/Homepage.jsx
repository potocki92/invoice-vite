import React, { Fragment } from "react";
import "./Homepage.css";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@components/Common/Sidebar/Sidebar";
const Homepage = ({ setLoginUser, user }) => {
  let location = useLocation();

  return (
    <Fragment>
      <main className="homepage">
        <Sidebar setLoginUser={setLoginUser} />
        {location.pathname === "/invoice-vite/" && user && user._id ? (
          <div>
            <h1>Hello, {user.name}!</h1>
            <p>Your ID: {user._id}</p>
          </div>
        ) : (
          <div className={`w-full overflow-auto pt-5`}>
            <Outlet />
          </div>
        )}
      </main>
    </Fragment>
  );
};

export default Homepage;
