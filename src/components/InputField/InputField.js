/**
The InputField component is used to display a form field
@param {Object} props - Object containing input parameters
@param {Object} props.input - Object containing form field properties such as name, className, typeText, value, placeholder, and required
@param {Function} props.handleChange - Function handling changes in the form fields
@returns {JSX.Element} - Returns a JSX element representing the form field
*/
const InputField = (props) => {
  return (
    <div className="form__group">
      <p>{props.input.name}</p>
      <input
        className={props.input.className}
        type={props.input.typeText}
        name={props.input.name}
        value={props.input.value}
        onChange={props.handleChange}
        placeholder={props.input.placeholder}
        required={props.input.required}
      />
    </div>
  );
};

export default InputField;
