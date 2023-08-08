import React, { useState } from "react";
import {
  ErrorMessage,
  Input,
  InputSpan,
  InputsContainer,
} from "./Input.styled";
import "./styled.css";

/**
 * The InputField component is used to display a form field.
 * @param {Object} props - Object containing input parameters.
 * @param {Object} props.input - Object containing form field properties such as name, className, typeText, value, placeholder, and required.
 * @param {Function} props.handleChange - Function handling changes in the form fields.
 * @returns {JSX.Element} - Returns a JSX element representing the form field.
 */
const InputField = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  /**
   * Handles the focus event of the input.
   * @param {React.FocusEvent<HTMLInputElement>} e - The focus event object.
   */
  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <InputsContainer>
      <InputSpan>{label}</InputSpan>
      <Input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => {
          if (inputProps.name === "confirmPassword") {
            setFocused(true);
          }
        }}
        focused={focused.toString()}
      />
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </InputsContainer>
  );
};
export default InputField;
