import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import axios from "../../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setShowRegister, setLoginUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigation = useNavigate();

  const { email, password } = formData;

  useEffect(() => {
    const getLocalStorageToken = localStorage.getItem("token");
    if (getLocalStorageToken) {
      setLoginUser({ token: getLocalStorageToken });
      navigation("/");
    }
  }, []);
  
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Successfully Logged In");
    try {
      // Wykonaj zapytanie do serwera, aby zalogować użytkownika
      const response = await axios.post("/login", formData);
      const token = response.data.token;
      // Zapisz token w localStorage
      const localStorageUser = {
        id: response.data.user._id,
        username: response.data.user.user.name,
      };
      // Zapisanie danych użytkownika do localStorage po zalogowaniu
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(localStorageUser));
      setLoginUser({ token });
      // Przekieruj użytkownika na stronę główną
      navigation("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container is-flex">
      <h1 className="form-title">Login</h1>
      <form className="form is-flex" onSubmit={(e) => onSubmit(e)}>
        <input
          className="form-input"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          minLength="6"
        />
        <button className="form-button" type="submit" value="Login">
          Login
        </button>
      </form>
      <p className="form-paragraph is-flex">
        Don't have an account?{" "}
        <button onClick={() => setShowRegister(false)}>Register</button>
      </p>
    </div>
  );
};

export default LoginForm;
