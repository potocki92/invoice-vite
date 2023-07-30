import { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { homeLink } from "./utils/linkConfig";
import { useDispatch } from "react-redux";
import { refreshUser } from "./redux/auth/operations";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";
import { useAuth } from "./hooks/useAuth";

const Home = lazy(() => import("./pages/home/Home"));
const Homepage = lazy(() => import("./pages/homepage/Homepage"));
const Invoices = lazy(() => import("./pages/invoice/Invoices"));
const User = lazy(() => import("./pages/user/User"));
const Clients = lazy(() => import("./pages/clients/Clients"));
const Products = lazy(() => import("./pages/products/Products"));
const Authentication = lazy(() =>
  import("./components/Authentication/Authentication")
);
const InvoiceEdit = lazy(() => import("./pages/invoice/edit/InvoiceEdit"));

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const [user, setLoginUser] = useState({});

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <div className="App">
      {/* <Route
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
            /> */}
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path={`${homeLink}`}
              element={
                <RestrictedRoute
                  redirectTo={`${homeLink}/dashboard`}
                  component={<Authentication setLoginUser={setLoginUser} />}
                />
              }
            />
            <Route
              path={`${homeLink}/dashboard`}
              element={
                <PrivateRoute
                  redirectTo={`${homeLink}`}
                  component={
                    <Homepage setLoginUser={setLoginUser} user={user} />
                  }
                />
              }
            >
              <Route path="" element={<Home />} />
            </Route>
            <Route path="/*" element={<Navigate to={homeLink} replace />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
