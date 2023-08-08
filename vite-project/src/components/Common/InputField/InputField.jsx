import React, { useState } from "react";
import {
  ErrorMessage,
  Input,
  InputSpan,
  InputsContainer,
} from "./Input.styled";

/**
 * The InputField component is used to display a form field.
 * @param {Object} props - Object containing input parameters.
 * @param {Object} props.input - Object containing form field properties such as name, className, typeText, value, placeholder, and required.
 * @param {Function} props.handleChange - Function handling changes in the form fields.
 * @returns {JSX.Element} - Returns a JSX element representing the form field.
 */
const InputField = (props) => {
  const [focused, setFocused] = useState(false);
  const [valid, setValid] = useState(true); // State for input validity
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  /**
   * Handles the focus event of the input.
   * @param {React.FocusEvent<HTMLInputElement>} e - The focus event object.
   */

  const handleFocus = (e) => {
    setFocused(true);
  };
  /**
   * Handles the input validation.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object.
   */
  const handleValidation = (e) => {
    if (inputProps.required && e.target.value.trim() === "") {
      setValid(false);
    } else if (inputProps.pattern) {
      const regex = new RegExp(inputProps.pattern);
      setValid(regex.test(e.target.value));
    } else {
      setValid(true);
    }
  };
  return (
    <InputsContainer>
      <InputSpan>{label}</InputSpan>
      <Input
        {...inputProps}
        onChange={(e) => {
          onChange(e);
          handleValidation(e); // Call the validation function
        }}
        onBlur={handleFocus}
        onFocus={() => {
          if (inputProps.name === "confirmPassword") {
            setFocused(true);
          }
        }}
        focused={focused.toString()}
        valid={valid.toString()} // Pass the valid state to the input
      />
      {!valid && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputsContainer>
  );
};
export default InputField;
