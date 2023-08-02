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
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path={`${homeLink}/login`}
              element={
                <RestrictedRoute
                  redirectTo={`${homeLink}/`}
                  component={<Authentication setLoginUser={setLoginUser} />}
                />
              }
            />
            <Route
              path={`${homeLink}/`}
              element={
                <PrivateRoute
                  redirectTo={`${homeLink}/login`}
                  component={
                    <Homepage setLoginUser={setLoginUser} user={user} />
                  }
                />
              }
            >
              <Route path="" element={<Home />} />
              <Route path="invoice" element={<Invoices />} />
              <Route path="products" element={<Products />} />
              <Route path="clients" element={<Clients />} />
            </Route>
            <Route path="/*" element={<Navigate to={homeLink} replace />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
