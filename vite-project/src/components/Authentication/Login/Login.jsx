import React, { useState } from "react";
import { LoginStyled } from "./Login.styled";
import { ErrorMessage, InputsForm } from "../../Common/InputField/Input.styled";
import { DefaultButton } from "../../buttons.styled";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/auth/operations";
import InputField from "../../Common/InputField/InputField";
import { inputsLogin } from "./inputs";
import { getIcon } from "../../../utils/getIcon";
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
      setFormData({
        ...formData,
        error: "Email or Password is invalid. Please try again!",
      });
    }
  };

  return (
    <LoginStyled>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputsForm className="authentication" onSubmit={(e) => onSubmit(e)}>
        {inputsLogin.map((input) => (
          <InputField
            key={input.id}
            {...input}
            value={formData[input.name]}
            onChange={onChange}
            isForm={true}
            icon={getIcon(input.icon)}
            isInAuthentication={true}
          ></InputField>
        ))}
        <DefaultButton type="submit" value="Login">
          LogIn
        </DefaultButton>
      </InputsForm>
    </LoginStyled>
  );
};

export default Login;
