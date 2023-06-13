import React, { useEffect, useState, useContext } from "react";
import "./Login.css";
import axios from "../../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { homeLink } from "../../../utils/linkConfig";
import { AuthFormStyled, AuthFormText, AuthFormTitle } from "./Login.styled";
// import {
//   Input,
//   InputSpan,
//   InputsContainer,
//   InputsForm,
// } from "../../Common/InputField/Input.styled";
import { DefaultButton } from "../../buttons.styled";
import isFloating from "../../../utils/isFloating";
import {
  BoxContainer,
  BoldLink,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "../../Common/FormsWrapper/FormsWrapper.styled";
import { AccountContext } from "../accountContext";
import { Marginer } from "../marginer";

const Login = ({ props }) => {

  const { switchToSignup } = useContext(AccountContext)
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
    <BoxContainer>
      {/* <AuthFormTitle>Login</AuthFormTitle>
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
      <AuthFormText>
        Don't have an account?{" "}
        <a onClick={() => setShowRegister(false)}>Register</a>
      </AuthFormText> */}

      <FormContainer>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit">Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};

export default Login;
