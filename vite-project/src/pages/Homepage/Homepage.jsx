import React, { useState, Fragment } from "react";
import "./Homepage.css";
import { useLocation } from "react-router-dom";

const Homepage = ({ setLoginUser, user }) => {
  let location = useLocation();

  const [items, setItems] = useState([]);
  return (
    <Fragment>
      <div className="homepage">
        HELLO
      </div>
    </Fragment>
  );
};

export default Homepage;
