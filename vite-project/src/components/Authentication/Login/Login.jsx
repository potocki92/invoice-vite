import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/auth/operations";
import AuthenticationForm from "../AuthenticationForm/AuthenticationForm";
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
  const data = [
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
          Welcome back
        </h1>
        <p className="text-sm text-[#B8B3AF]">
          Enter your email to sign in to your account
        </p>
      </div>
      <div className="grid gap-5">
        <AuthenticationForm
          onSubmit={onSubmit}
          onChange={onChange}
          formData={data}
          buttonText={"Sign In with Email"}
          error={error}
        />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-[#292424]"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-[#0C0A09] text-[#B8B3AF]">OR</span>
          </div>
        </div>
        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[#292424] h-10 px-4 py-2"></div>
      </div>
      {/* {error && <ErrorMessage>{error}</ErrorMessage>}
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
      </InputsForm> */}
    </div>
  );
};

export default Login;
