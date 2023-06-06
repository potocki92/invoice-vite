
import { Input, InputSpan, InputsContainer } from "./Input.styled";

/**
The InputField component is used to display a form field
@param {Object} props - Object containing input parameters
@param {Object} props.input - Object containing form field properties such as name, className, typeText, value, placeholder, and required
@param {Function} props.handleChange - Function handling changes in the form fields
@returns {JSX.Element} - Returns a JSX element representing the form field
*/
const InputField = (props) => {

    return (
      <InputsContainer>
        <InputSpan>{props.input.name}</InputSpan>
        <Input
          className={props.input.className}
          type={props.input.typeText}
          name={props.input.name}
          value={props.input.value}
          onChange={props.handleChange}
          placeholder={props.input.placeholder}
          required={props.input.required}
        />
      </InputsContainer>
    );
  };
  
  export default InputField;
  