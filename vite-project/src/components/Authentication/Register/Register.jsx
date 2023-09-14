import React, { useState } from "react";
import { ErrorMessage, InputsForm } from "../../Common/InputField/Input.styled";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../redux/auth/operations";
import { selectError } from "../../../redux/auth/selectors";
import AuthenticationForm from "../AuthenticationForm/AuthenticationForm";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
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

  const data = [
    {
      name: "name",
      label: "Name",
      placeholder: "John Doe",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "johndoe@example.com",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "*****",
      type: "password",
    },
  ];
  return (
    <div className="pt-5 px-5 mx-auto max-w-md flex w-full h-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-[#FBFCFF]">
          Create an account
        </h1>
        <p className="text-sm text-[#B8B3AF]">
          Enter your email below to create your account
        </p>
      </div>
      <div className="grid gap-5">
        <AuthenticationForm
          onSubmit={onSubmit}
          onChange={onChange}
          formData={data}
          buttonText={"Sign Up with Email"}
          error={error}
        />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-[#B8B3AF]"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-[#353535] text-[#B8B3AF]">OR</span>
          </div>
        </div>

        <GoogleAuth />
      </div>
      {/* <LoginStyled>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputsForm className="authentication" onSubmit={(e) => onSubmit(e)}>
        {inputsRegister.map((input) => (
          <InputField
            key={input.id}
            {...input}
            value={formData[input.name]}
            onChange={onChange}
            isForm={true}
            // icon={getIcon(input.icon)}
            isInAuthentication={true}
          />
        ))}
        <DefaultButton type="submit" value="Register">
          Create An Account
        </DefaultButton>
      </InputsForm>
    </LoginStyled> */}
    </div>
  );
};

export default Register;
