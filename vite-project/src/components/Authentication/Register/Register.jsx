import React, { useState } from "react";
import { LoginStyled } from "../Login/Login.styled";
import {
  InputsForm,
} from "../../Common/InputField/Input.styled";
import { DefaultButton } from "../../buttons.styled";
import { useDispatch } from "react-redux";
import { register } from "../../../redux/auth/operations";
import InputField from "../../Common/InputField/InputField";

/**
 * Component for user registration.
 *
 * @param {Object} props - Component props
 * @param {Function} props.setShowRegister - Function to control the visibility of the registration form
 * @returns {JSX.Element} - Rendered component
 */
const Register = () => {
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
      required: true,
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
  ];
  return (
    <LoginStyled>
      <InputsForm className="authentication" onSubmit={(e) => onSubmit(e)}>
        {inputs.map((input) => (
          <InputField
            key={input.id}
            {...input}
            value={formData[input.name]}
            onChange={onChange}
            isForm={true}
          />
        ))}
        <DefaultButton
          type="submit"
          value="Register"
        >
          Create An Account
        </DefaultButton>
      </InputsForm>
    </LoginStyled>
  );
};

export default Register;
