import React from "react";
import { Icon, Input, InputSpan, InputsContainer } from "./Input.styled";
import isFloating from "../../../utils/isFloating";

/**
 * The InputField component is used to display a form field.
 * @param {Object} props - Object containing input parameters.
 * @param {Object} props.input - Object containing form field properties such as name, className, typeText, value, placeholder, and required.
 * @param {Function} props.handleChange - Function handling changes in the form fields.
 * @returns {JSX.Element} - Returns a JSX element representing the form field.
 */
const InputField = (props) => {
  const { label, onChange, id, value, isForm, icon, ...inputProps } = props;

  return (
    <InputsContainer className={`${isForm ? "forms" : ""}`}>
      <InputSpan className={isFloating(value)}>{label}</InputSpan>
      <Input
        className={
          isFloating(value)
            ? `authentication floating ${isForm ? "forms" : ""}`
            : `authentication ${isForm ? "forms" : ""}`
        }
        {...inputProps}
        onChange={(e) => {
          onChange(e);
        }}
      />
      <Icon>
        {icon}
      </Icon>
    </InputsContainer>
  );
};
export default InputField;
