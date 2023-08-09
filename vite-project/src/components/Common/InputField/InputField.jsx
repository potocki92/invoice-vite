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
  const { label,onChange, id, ...inputProps } = props;
  return (
    <InputsContainer>
      <InputSpan>{label}</InputSpan>
      <Input
        {...inputProps}
        onChange={(e) => {
          onChange(e);
        }} 
      />
    </InputsContainer>
  );
};
export default InputField;
