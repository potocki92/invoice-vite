import React, { useState } from "react";
import { LoginStyled } from "./Login.styled";
import {
  ErrorMessage,
  InputsForm,
} from "../../Common/InputField/Input.styled";
import { DefaultButton } from "../../buttons.styled";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/auth/operations";
import InputField from "../../Common/InputField/InputField";
import { MdEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
/**
 * Represents a login component that allows users to log in.
 * @param {Object} props - Component props.
 * @param {Function} props.setShowRegister - Function to show registration form.
 * @returns {JSX.Element} - Rendered Login component.
 */
const Login = () => {
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
      icon: <MdEmail/>
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
      icon: <RiLockPasswordFill/>
    },
  ];
  return (
    <LoginStyled>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputsForm className="authentication" onSubmit={(e) => onSubmit(e)}>
        {inputs.map((input) => (
          <InputField
            key={input.id}
            {...input}
            value={formData[input.name]}
            onChange={onChange}
            isForm={true}
          >
          </InputField>        
          ))}
        <DefaultButton type="submit" value="Login">
          LogIn
        </DefaultButton>
      </InputsForm>
    </LoginStyled>
  );
};

export default Login;
