import React, { useEffect, useState } from "react";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import InvoiceInputs from "../Invoice/InvoiceInputs/InvoiceInputs";
import FormsWrapper from "../Common/FormsWrapper/FormsWrapper";
import { AuthenticationInputsContent } from "./Authentication.styled";
import { FormHeader } from "../Common/FormsWrapper/FormsWrapper.styled";
import { useLocation } from "react-router-dom";
import { homeLink } from "../../utils/linkConfig";
import { useDispatch } from "react-redux";
import { setIsHome } from "../../redux/home/slice";
/**
 * Authentication component.
 * @component
 * @param {function} setLoginUser - Function to set the logged in user.
 * @returns {JSX.Element}
 * @example
 * return (
 *  <Authentication setLoginUser={setLoginUser} />
 * )
 */
const Authentication = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    dispatch(setIsHome(false));
  }, [setIsHome]);
  useEffect(() => {
    if (location.pathname === `${homeLink}/signup`) {
      setShowRegister(true);
    } else if (location.pathname === `${homeLink}/login`) {
      setShowRegister(false);
    }
  }, [location.pathname]);
  const handleAfterClick = () => {
    setShowRegister(!showRegister);
  };

  const handleCallbackResponse = (res) => {
    console.log("Encoded JWT ID token: " + res.credentials);
  };
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "815039792408-0a4voqplfkk3kkb1adobf7ocudbo5r01.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  return (
    <div className="min-h-screen">
      <div className="md:container mx-auto flex flex-col items-center justify-center h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative flex flex-col items-center min-w-[265px] w-full h-full sm:h-[670px] sm:w-[400px] bg-[#353535]">
          <div className="w-full flex">
            <button
              className={`flex justify-center w-[50%] h-[60px] relative block ${
                showRegister
                  ? "bg-[#353535]  text-[#FBFCFF]"
                  : "bg-[#FBFCFF]  text-[#353535]"
              }`}
              onClick={handleAfterClick}
            >
              <b
                className={`absolute bottom-[0] h-[20px] w-full ${
                  showRegister
                    ? "bg-[#353535] before:bg-[#353535]"
                    : "bg-[#353535] before:bg-[#FBFCFF]"
                }  before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full  before:rounded-br-[20px]`}
              ></b>
              <b
                className={`absolute top-[0] h-[20px] w-full ${
                  showRegister
                    ? "bg-[#FBFCFF] after:bg-[#353535]"
                    : "bg-[#FBFCFF] after:bg-[#FBFCFF]"
                } after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-tr-[20px]`}
              ></b>
              <span
                className={`md:block relative block pl-[10px] h-[60px] leading-[60px] whitespace-normal font-semibold`}
              >
                Sign Up
              </span>
            </button>
            <button
              className={`flex justify-center w-[50%] h-[60px] relative block ${
                showRegister
                  ? "bg-[#FBFCFF] text-[#353535]"
                  : "bg-[#353535] text-[#FBFCFF]"
              } `}
              onClick={handleAfterClick}
            >
              <b
                className={`absolute bottom-[0] h-[20px] w-full ${
                  showRegister
                    ? "bg-[#353535] before:bg-[#FBFCFF]"
                    : "bg-[#353535] before:bg-[#353535]"
                }  bg-[#353535] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#0C0A09] before:rounded-bl-[20px]`}
              ></b>
              <b
                className={`absolute top-[0] h-[20px] w-full ${
                  showRegister
                    ? "bg-[#FBFCFF] after:bg-[#FBFCFF]"
                    : "bg-[#353535] after:bg-[#353535]"
                }  bg-[#FBFCFF] after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[#0C0A09] after:rounded-tl-[20px]`}
              ></b>
              <span
                className={`md:block relative block pl-[10px] h-[60px] leading-[60px] whitespace-normal font-semibold`}
              >
                Sign In
              </span>
            </button>
          </div>

          {showRegister ? (
            <Register setShowRegister={setShowRegister} />
          ) : (
            <Login />
          )}
        </div>
      </div>
      <AuthenticationInputsContent>
        {/* <InvoiceInputs /> */}
      </AuthenticationInputsContent>
    </div>
  );
};

export default Authentication;
