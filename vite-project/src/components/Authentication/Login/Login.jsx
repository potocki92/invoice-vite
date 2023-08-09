import React, { useState } from "react";
import { LoginStyled, LoginText, LoginTitle } from "./Login.styled";
import {
  ErrorMessage,
  Input,
  InputSpan,
  InputsContainer,
  InputsForm,
} from "../../Common/InputField/Input.styled";
import { DefaultButton } from "../../buttons.styled";
import isFloating from "../../../utils/isFloating";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/auth/operations";
import InputField from "../../Common/InputField/InputField";

/**
 * Represents a login component that allows users to log in.
 * @param {Object} props - Component props.
 * @param {Function} props.setShowRegister - Function to show registration form.
 * @returns {JSX.Element} - Rendered Login component.
 */
const Login = ({ setShowRegister }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password, error } = formData;

  /**
   * Handles input change event.
   * @param {Object} e - Input change event object.
   * @returns {void}
   */
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  /**
   * Handles form submission.
   * @param {Object} e - Form submit event object.
   * @returns {void}
   */
  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      logIn({
        email,
        password,
      })
    );

    if (!result.success) {
      setFormData({ ...formData, error: "Email or Password is invalid. Please try again!" });
    }
  };
  const inputs = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      // errorMessage:
      //   "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];
  return (
    <LoginStyled>
      <LoginTitle>Login</LoginTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputsForm className="authentication" onSubmit={(e) => onSubmit(e)}>
        {/* <InputsContainer>
          <InputSpan className={isFloating(email)}>Email</InputSpan>
          <Input
            className={
              isFloating(email)
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
          <InputSpan className={isFloating(password)}>
            Password
          </InputSpan>
          <Input
            className={
              isFloating(password)
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
        </InputsContainer> */}

        {inputs.map((input) => (
          <InputField
            key={input.id}
            {...input}
            value={formData[input.name]}
            onChange={onChange}
          />
        ))}
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
