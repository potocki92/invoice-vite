import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
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

  return (
    <div className="App is-flex">
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
            <Route path="/invoice-vite" element={<Home />} />
            <Route path={`${homeLink}/invoice`} element={<Invoices />} />
            <Route
              path={`${homeLink}/invoice/:invoiceId`}
              element={<InvoiceEdit />}
            />
            <Route path={`${homeLink}/user`} element={<User />} />
            <Route path={`${homeLink}/products`} element={<Products />} />
            <Route path={`${homeLink}/clients`} element={<Clients />} />
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
