import { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { homeLink } from "./utils/linkConfig";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "@redux/auth/operations";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";
import { useAuth } from "./hooks/useAuth";
import Homepage from "@pages/homepage/Homepage";
import Invoices from "@pages/invoice/Invoices";
import User from "@pages/user/User";
import Clients from "@pages/clients/Clients";
import Products from "@pages/products/Products";
const Authentication = lazy(() =>
  import("@components/Authentication/Authentication")
);
import InvoiceEdit from "@pages/invoice/edit/InvoiceEdit";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import { selectIsHome } from "./redux/home/selectors";

function App() {
  const dispatch = useDispatch();
  const isHome = useSelector(selectIsHome);
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const [user, setLoginUser] = useState({});

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <div
      className={`flex flex-col ${
        isHome ? "min-h-screen bg-[#0C0A09]" : "h-full bg-[#FBFCFF]"
      } `}
    >
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path={`${homeLink}/home`}
              element={
                <RestrictedRoute
                  redirectTo={`${homeLink}/`}
                  component={<Home />}
                />
              }
            />
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
              path={`${homeLink}/signup`}
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
                  redirectTo={`${homeLink}/home`}
                  component={
                    <Homepage setLoginUser={setLoginUser} user={user} />
                  }
                />
              }
            >
              <Route path="" element={<Dashboard />} />
              <Route path="invoice" element={<Invoices />} />

              <Route path="invoice/:invoiceId" element={<InvoiceEdit />} />
              <Route path="products" element={<Products />} />
              <Route path="clients" element={<Clients />} />
              <Route path="user" element={<User />} />
            </Route>
            <Route path="/*" element={<Navigate to={homeLink} replace />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
