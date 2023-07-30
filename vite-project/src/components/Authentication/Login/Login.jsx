import React, {  useState } from "react";
import "./Login.css";
import { LoginStyled, LoginText, LoginTitle } from "./Login.styled";
import {
  Input,
  InputSpan,
  InputsContainer,
  InputsForm,
} from "../../Common/InputField/Input.styled";
import { DefaultButton } from "../../buttons.styled";
import isFloating from "../../../utils/isFloating";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/auth/operations";

const Login = ({ setShowRegister }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      logIn({
        email,
        password,
      })
    );
  };

  return (
    <LoginStyled>
      <LoginTitle>Login</LoginTitle>
      <InputsForm className="authentication" onSubmit={(e) => onSubmit(e)}>
        <InputsContainer>
          <InputSpan className={isFloating(formData.email)}>Email</InputSpan>
          <Input
            className={
              isFloating(formData.email)
                ? `authentication floating`
                : `authentication`
            }
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </InputsContainer>
        <InputsContainer>
          <InputSpan className={isFloating(formData.password)}>
            Password
          </InputSpan>
          <Input
            className={
              isFloating(formData.password)
                ? `authentication floating`
                : `authentication`
            }
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
        <a onClick={() => setShowRegister(true)}>Register</a>
      </LoginText>
    </LoginStyled>
  );
};

export default Login;
