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
          />
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
