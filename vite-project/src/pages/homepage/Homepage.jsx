import React, { useState, Fragment } from "react";
import "./Homepage.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

const Homepage = ({ setLoginUser, user }) => {
  let location = useLocation();

  const [items, setItems] = useState([]);
  return (
    <Fragment>
      <div className="homepage">
        <Sidebar />
        {location.pathname === "/" && user && user._id ? (
            <div>
                <h1>Hello, {user.name}!</h1>
                <p>Your ID: {user._id}</p>
            </div>
        ) : (
      <div className="homepage__content">
            <Header setLoginUser={setLoginUser} />
            <Outlet />
          </div>

        )}
      </div>
    </Fragment>
  );
};

export default Homepage;
