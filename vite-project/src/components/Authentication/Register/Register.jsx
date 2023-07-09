import React, { useState, useContext } from "react";

import "./Register.css";
import axios from "../../../utils/axiosConfig";
import { LoginStyled, LoginText, LoginTitle } from "../Login/Login.styled";
import {
  Input,
  InputSpan,
  InputsContainer,
  InputsForm,
} from "../../Common/InputField/Input.styled";
import { DefaultButton } from "../../buttons.styled";

const Register = ({ setShowRegister, setLoginUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    if (name && email && password) {
      axios.post("/register", formData).then((res) => {
        console.log("Successfully Registered");
        alert(res.data.message);
        setLoginUser(false);
      });
    } else {
      alert("invalid");
    }
  };

  return (
    <LoginStyled>
      <LoginTitle>Register</LoginTitle>
      <InputsForm className="authentication" onSubmit={(e) => onSubmit(e)}>
        <InputsContainer>
          <InputSpan>Username</InputSpan>
          <Input
            className="form-input"
            type={"text"}
            name="name"
            value={name}
            placeholder="Enter your username"
            onChange={(e) => onChange(e)}
            required
          />
        </InputsContainer>
        <InputsContainer>
          <InputSpan>Email</InputSpan>
          <Input
            className="form-input"
            type={"email"}
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => onChange(e)}
            required
          />
        </InputsContainer>
        <InputsContainer>
          <InputSpan>Password</InputSpan>
          <Input
            className="form-input"
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
