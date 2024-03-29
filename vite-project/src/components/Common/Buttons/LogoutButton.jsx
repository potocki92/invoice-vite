import {
    ExitOutline
  } from "react-ionicons";
import { useDispatch } from "react-redux";
import { logOut } from "@redux/auth/operations";
import { useContext } from "react";
import { MyContext } from "../Sidebar/Context";

  const LogoutButton = () => {
  const dispatch = useDispatch();
  const {isClick} = useContext(MyContext) 
    return (
      <>
        <button className={`${
                isClick ? "flex" : "hidden"
              } sm:flex z-10 absolute pl-[10px] bottom-0 w-[60px] h-[60px] justify-center items-center text-[#FBFCFF] rounded-[10px]`} onClick={() => dispatch(logOut())}>
            <span>
                <ExitOutline color={"currentColor"}/>
            </span>
        </button>
      </>
    );
  };
  
  export default LogoutButton;
  