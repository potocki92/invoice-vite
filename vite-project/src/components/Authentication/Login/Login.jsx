import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "../../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { homeLink } from "../../../utils/linkConfig";
import { InvoiceInputsContainer } from "../../Invoice/InvoiceInputs/InvoiceInputs.styled";
import { LoginStyled, LoginTitle } from "./Login.styled";
import { Input, InputsForm } from "../../Common/InputField/Input.styled";
import { DefaultButton } from "../../buttons.styled";

const Login = ({ setShowRegister, setLoginUser }) => {
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
      navigation(homeLink);
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
      console.log(token);
      // Zapisz token w localStorage

      // Zapisanie danych użytkownika do localStorage po zalogowaniu
      localStorage.setItem("token", token);
      setLoginUser({ token });
      // Przekieruj użytkownika na stronę główną
      navigation(homeLink);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginStyled>
      <LoginTitle>Login</LoginTitle>
      <InputsForm className="authentication" onSubmit={(e) => onSubmit(e)}>
        <Input
          className="authentication"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
        <Input
          className="authentication"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          minLength="6"
        />
        <DefaultButton style={{ marginLeft: "0" }} type="submit" value="Login">
          Login
        </DefaultButton>
      </InputsForm>
      <p className="form-paragraph is-flex">
        Don't have an account?{" "}
        <button onClick={() => setShowRegister(false)}>Register</button>
      </p>
    </LoginStyled>
  );
};

export default Login;
