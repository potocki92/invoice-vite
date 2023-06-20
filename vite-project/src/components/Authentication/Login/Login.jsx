import React, { useEffect, useState, useContext } from "react";
import "./Login.css";
import axios from "../../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { homeLink } from "../../../utils/linkConfig";
import { InvoiceInputsContainer } from "../../Invoice/InvoiceInputs/InvoiceInputs.styled";
import { LoginStyled, LoginText, LoginTitle } from "./Login.styled";
import { Input, InputSpan, InputsContainer, InputsForm } from "../../Common/InputField/Input.styled";
import { DefaultButton } from "../../buttons.styled";
import isFloating from "../../../utils/isFloating";

const Login = ({ setLoginUser }) => {

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
        <InputsContainer>
          <InputSpan className={isFloating(formData.email)}>Email</InputSpan>
          <Input
            className={isFloating(formData.email) ? `authentication floating` : `authentication`} 
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
            />
        </InputsContainer>
        <InputsContainer>
          <InputSpan className={isFloating(formData.password)}>Password</InputSpan>
          <Input
            className={isFloating(formData.password) ? `authentication floating` : `authentication`}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
            />
        </InputsContainer>
        <DefaultButton style={{ marginLeft: "0" }} type="submit" value="Login">
          Login
        </DefaultButton>
      </InputsForm>
      <LoginText>
        Don't have an account?{" "}
        <a onClick={() => setLoginUser(false)}>Register</a>
      </LoginText>
    </LoginStyled>
  );
};

export default Login;
