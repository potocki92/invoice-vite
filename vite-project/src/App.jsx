import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import './App.css'
import Authentication from './components/Authentication/Authentication';
import Homepage from './pages/homepage/Homepage';
import Home from './pages/home/Home';
import Invoices from './pages/invoice/Invoices';
import InvoiceEdit from './pages/invoice/edit/InvoiceEdit';
import User from './pages/user/User';
import Products from './pages/products/Products';
import Clients from './pages/clients/Clients';

function App() {
  const [user, setLoginUser] = useState({});

  return (
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
            <Route path="/invoice" element={<Invoices />}/>
            <Route path='/invoice/:invoiceId' element={<InvoiceEdit />}/>
            <Route path='/user' element={<User />}/>
            <Route path='/products' element={<Products />}/>
            <Route path='/clients' element={<Clients />}/>
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
  )
}

export default App
