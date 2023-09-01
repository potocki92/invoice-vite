import { useContext } from "react";
import { MyContext } from "../Context";

  const SidebarButton = () => {
  const {handleBurgerClick, isClick} = useContext(MyContext) 

    return (
      <div className={`flex items-center sm:hidden p-[5px] z-20 fixed top-[20px] right-[25px] w-[50px] h-[40px] rounded-[10px] cursor-pointer`}
        onClick={handleBurgerClick}>
             <div className={`tham ${isClick ? "tham-active" : ""} tham-e-squeeze tham-w-6 `}>
  <div class="tham-box">
    <div className={`tham-inner ${isClick ? "bg-[#FBFCFF]" : "bg-[#4b5bf9]"} `} />
  </div>
</div>
      </div>
    );
  };
  
  export default SidebarButton;
  