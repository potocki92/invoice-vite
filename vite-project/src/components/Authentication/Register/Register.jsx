import React, { useState } from "react";
import { LoginStyled } from "../Login/Login.styled";
import { ErrorMessage, InputsForm } from "../../Common/InputField/Input.styled";
import { DefaultButton } from "../../buttons.styled";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../redux/auth/operations";
import InputField from "../../Common/InputField/InputField";
import { inputsRegister } from "./inputs";
import { getIcon } from "../../../utils/getIcon";
import { selectError } from "../../../redux/auth/selectors";

/**
 * Component for user registration.
 *
 * @param {Object} props - Component props
 * @param {Function} props.setShowRegister - Function to control the visibility of the registration form
 * @returns {JSX.Element} - Rendered component
 */
const Register = ({ setShowRegister }) => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    error: "", // Add an error state for displaying server errors
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

    const result = await dispatch(
      register({
        name,
        email,
        password,
      })
    );

    if (result.payload.success) {
      setShowRegister(false);
    } else {
      console.log(result.payload),
        setFormData({
          ...formData,
          error: "An error occurred. Please try again.",
        });
    }
  };

  return (
    <LoginStyled>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputsForm className="authentication" onSubmit={(e) => onSubmit(e)}>
        {inputsRegister.map((input) => (
          <InputField
            key={input.id}
            {...input}
            value={formData[input.name]}
            onChange={onChange}
            isForm={true}
            icon={getIcon(input.icon)}
            isInAuthentication={true}
          />
        ))}
        <DefaultButton type="submit" value="Register">
          Create An Account
        </DefaultButton>
      </InputsForm>
    </LoginStyled>
  );
};

export default Register;
