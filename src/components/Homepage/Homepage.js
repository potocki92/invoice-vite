import React, { useState, Fragment } from "react";
import "./Homepage.css";
import { Outlet, useParams } from "react-router-dom";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const Homepage = ({ setLoginUser, user }) => {
  let location = useLocation();

  const [items, setItems] = useState([]);
  return (
    <Fragment>
      <div className="homepage">
        <Sidebar />
        {location.pathname === "/" && user && user._id ? ( // dodanie warunku user && user._id
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
