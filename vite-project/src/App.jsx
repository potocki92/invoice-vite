import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Authentication from "./components/Authentication/Authentication";
import Homepage from "./pages/homepage/Homepage";
import Home from "./pages/home/Home";
import Invoices from "./pages/invoice/Invoices";
import InvoiceEdit from "./pages/invoice/edit/InvoiceEdit";
import User from "./pages/user/User";
import Products from "./pages/products/Products";
import Clients from "./pages/clients/Clients";
import { homeLink } from "./utils/linkConfig";

function App() {
  const [user, setLoginUser] = useState({});

  
    const decodedToken = (token) => {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("/-/g", "+").replace("/_/g", "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        return JSON.parse(jsonPayload);
      } catch (error) {
        console.log("Error in decodedToken: ", error);
        return null;
      }
    };
  const isTokenExpired = () => {
    const token = localStorage.getItem("token");
    if (user && user.token) {
      const decodedToken = decodedToken(token);
      if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
        return true;
      }
    }
    return false;
  };

  const checkAutheontication = () => {
    if (!user || !user.token || isTokenExpired()) {
      Navigate(`${homeLink}/login`, { replace: true });
    }
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path={homeLink}
            element={
              user && user.token ? (
                <Homepage setLoginUser={setLoginUser} user={user} />
              ) : (
                <Navigate to={`${homeLink}/login`} replace />
              )
            }
          >
            <Route
              path="/invoice-vite"
              element={<Home />}
              onEnter={checkAutheontication}
            />
            <Route
              path={`${homeLink}/invoice`}
              element={<Invoices />}
              onEnter={checkAutheontication}
            />
            <Route
              path={`${homeLink}/invoice/:invoiceId`}
              element={<InvoiceEdit />}
              onEnter={checkAutheontication}
            />
            <Route
              path={`${homeLink}/user`}
              element={<User />}
              onEnter={checkAutheontication}
            />
            <Route
              path={`${homeLink}/products`}
              element={<Products />}
              onEnter={checkAutheontication}
            />
            <Route
              path={`${homeLink}/clients`}
              element={<Clients />}
              onEnter={checkAutheontication}
            />
          </Route>
          <Route
            path={`${homeLink}/login`}
            element={
              user && user.token ? (
                <Navigate to={homeLink} replace />
              ) : (
                <Authentication setLoginUser={setLoginUser} />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
