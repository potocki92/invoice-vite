import React, { useState } from "react";

import "./Register.css";
import { LoginStyled, LoginText, LoginTitle } from "../Login/Login.styled";
import {
  Input,
  InputSpan,
  InputsContainer,
  InputsForm,
} from "../../Common/InputField/Input.styled";
import { DefaultButton } from "../../buttons.styled";
import isFloating from "../../../utils/isFloating";
import { useDispatch } from "react-redux";
import { register } from "../../../redux/auth/operations";

/**
 * Component for user registration.
 *
 * @param {Object} props - Component props
 * @param {Function} props.setShowRegister - Function to control the visibility of the registration form
 * @returns {JSX.Element} - Rendered component
 */
const Register = ({ setShowRegister }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  
  /**
   * Handles input change event.
   *
   * @param {Event} e - The change event object containing information about the field value change.
   * @returns {void}
   */
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /**
   * Handles form submission.
   *
   * @param {Event} e - The form submission event object.
   * @returns {void}
   */
  const onSubmit = async (e) => {
    e.preventDefault();

    if (name && email && password) {
      dispatch(
        register({
          name,
          email,
          password,
        })
      );
      setFormData({ name: "", email: "", password: "" });
      setShowRegister(false);
    } else {
      alert("invalid");
    }
  };

  const inputs = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      label: "Username",
      required: true
    },
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
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ]
  return (
    <LoginStyled>
      <LoginTitle>Register</LoginTitle>
      <InputsForm className="authentication" onSubmit={(e) => onSubmit(e)}>
        <InputsContainer>
          <InputSpan className={isFloating(formData.name)}>Username</InputSpan>
          <Input
            className={
              isFloating(formData.name)
                ? `authentication floating`
                : `authentication`
            }
            type={"text"}
            name="name"
            value={name}
            placeholder="Enter your username"
            onChange={(e) => onChange(e)}
            required
          />
        </InputsContainer>
        <InputsContainer>
          <InputSpan className={isFloating(formData.email)}>Email</InputSpan>
          <Input
            className={
              isFloating(formData.email)
                ? `authentication floating`
                : `authentication`
            }
            type={"email"}
            name="email"
            value={email}
            placeholder="Enter your email"
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
            type={"password"}
            name="password"
            value={password}
            placeholder="Enter you password"
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </InputsContainer>
        <DefaultButton
          style={{ marginLeft: "0" }}
          type="submit"
          value="Register"
        >
          Register
        </DefaultButton>
      </InputsForm>
      <LoginText>
        Already have an account?{" "}
        <a onClick={() => setShowRegister(false)}>Login</a>
      </LoginText>
    </LoginStyled>
  );
};

export default Register;
