import React, { useState } from "react";
import { LoginStyled } from "./Login.styled";
import { ErrorMessage, InputsForm } from "../../Common/InputField/Input.styled";
import { DefaultButton } from "../../buttons.styled";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/auth/operations";
import InputField from "../../Common/InputField/InputField";
import { inputsLogin } from "./inputs";
import { getIcon } from "../../../utils/getIcon";
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

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-[#FBFCFF]">
          Welcome back
        </h1>
        <p className="text-sm text-[#B8B3AF]">
          Enter your email to sign in to your account
        </p>
      </div>
      <div className="grid gap-5">
        <form>
          <div className="grid gap-3">
            <ul className="grid gap-3">
              <li className="flex flex-col space-y-1">
                <label
                  className="text-[#FBFCFF] font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-[#FBFCFF] bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="email"
                  placeholder="johndoe@example.com"
                  autoCorrect="off"
                  type="email"
                  value
                  name="email"
                />
              </li>
              <li className="flex flex-col space-y-1">
                <label
                  className="text-[#FBFCFF] font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-[#FBFCFF] bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="password"
                  placeholder="*****"
                  autoCorrect="off"
                  type="password"
                  value
                  name="password"
                />
              </li>
            </ul>
            <button className="text-[#FBFCFF] bg-[#EA580C] inline-flex items-center justify-center rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Sign In with Email
            </button>
          </div>
        </form>
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
