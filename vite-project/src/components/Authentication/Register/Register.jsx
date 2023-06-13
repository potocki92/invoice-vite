import React, { useState, useContext } from "react";
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

import "./Register.css";
import axios from "../../../utils/axiosConfig";
import {
  AuthFormStyled,
  AuthFormText,
  AuthFormTitle,
} from "../Login/Login.styled";
// import {
//   Input,
//   InputSpan,
//   InputsContainer,
//   InputsForm,
// } from "../../Common/InputField/Input.styled";
import { DefaultButton } from "../../buttons.styled";
import isFloating from "../../../utils/isFloating";

const Register = ({ setShowRegister }) => {
  const { switchToSignin } = useContext(AccountContext);

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
        setShowRegister(false);
      });
    } else {
      alert("invalid");
    }
  };

  return (
    // <AuthFormStyled className="register">
    //   <AuthFormTitle>Register</AuthFormTitle>
    //   <InputsForm className="authentication" onSubmit={(e) => onSubmit(e)}>
    //     <InputsContainer>
    //       <InputSpan className={isFloating(formData.name)}>Username</InputSpan>
    //       <Input
    //         className={
    //           isFloating(formData.name)
    //             ? `authentication floating`
    //             : `authentication`
    //         }
    //         type={"text"}
    //         name="name"
    //         value={name}
    //         placeholder="Enter your username"
    //         onChange={(e) => onChange(e)}
    //         required
    //       />
    //     </InputsContainer>
    //     <InputsContainer>
    //       <InputSpan className={isFloating(formData.email)}>Email</InputSpan>
    //       <Input
    //         className={isFloating(formData.email) ? `floating` : ``}
    //         type={"email"}
    //         name="email"
    //         value={email}
    //         placeholder="Enter your email"
    //         onChange={(e) => onChange(e)}
    //         required
    //       />
    //     </InputsContainer>
    //     <InputsContainer>
    //       <InputSpan className={isFloating(formData.password)}>
    //         Password
    //       </InputSpan>
    //       <Input
    //         className={
    //           isFloating(formData.password)
    //             ? `authentication floating`
    //             : `authentication`
    //         }
    //         type="password"
    //         placeholder="Password"
    //         name="password"
    //         value={password}
    //         onChange={(e) => onChange(e)}
    //         minLength="6"
    //       />
    //     </InputsContainer>
    //     <DefaultButton
    //       style={{ marginLeft: "0" }}
    //       type="submit"
    //       value="Register"
    //     >
    //       Register
    //     </DefaultButton>
    //   </InputsForm>
    //   <AuthFormText>
    //     Already have an account?{" "}
    //     <a onClick={() => setShowRegister(true)}>Login</a>
    //   </AuthFormText>
    // </AuthFormStyled>

    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};

export default Register;
