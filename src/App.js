import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Authentication from "./components/RegisterLoginForms/Authentication";
import Home from "./pages/Home";

function App() {
  const [user, setLoginUser] = useState({});

  return (
    <>
      <div className="App is-flex">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                user && user.token ? (
                  <Homepage setLoginUser={setLoginUser} user={user} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            >
              <Route path="/" element={<Home />} />
            </Route>
            <Route
              path="/login"
              element={
                user && user.token ? (
                  <Navigate to="/" replace />
                ) : (
                  <Authentication setLoginUser={setLoginUser} />
                )
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
