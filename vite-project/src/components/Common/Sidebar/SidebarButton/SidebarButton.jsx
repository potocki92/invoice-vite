import { useContext } from "react";
import { MyContext } from "../Context";

  const SidebarButton = () => {
  const {handleBurgerClick, isClick} = useContext(MyContext) 

    return (
      <div className={`flex items-center justify-center sm:hidden p-[5px] z-20 fixed top-[20px] right-[25px] w-[50px] h-[50px] rounded-[10px] cursor-pointer`}
        onClick={handleBurgerClick}>
             <div className={`tham ${isClick ? "tham-active" : ""} tham-e-squeeze tham-w-8 hover:opacity-100`}>
  <div class="tham-box">
    <div className={`tham-inner ${isClick ? "bg-[#FBFCFF]" : "bg-[#353535]"}`} />
  </div>
</div>
      </div>
    );
  };
  
  export default SidebarButton;
  