import {
  HomeOutline,
  PersonOutline,
  CreateOutline,
  PeopleOutline,
  ServerOutline,
} from "react-ionicons";
import { useState } from "react";
import SidebarList from "./SidebarList/SidebarList";
import LogoutButton from "../Buttons/LogoutButton";
import { MyContext } from "./Context";

/**
 * Represents a sidebar navigation component that provides links to different sections of the application.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.setLoginUser - Function to set the logged-in user.
 * @returns {JSX.Element} - The rendered Sidebar component.
 */
const Sidebar = () => {
  const [isClick, setIsClick] = useState(false);
  
  /**
   * Toggles the sidebar menu when the burger icon is clicked.
   * @function
   * @returns {void}
   */
  const handleBurgerClick = () => {
    setIsClick(!isClick);
  };

  /**
   * Closes the sidebar menu when a link is clicked.
   * @function
   * @returns {void}
   */
  const handleLinkClick = () => {
    setIsClick(false);
  };
  const [activeIndex, setActiveIndex] = useState(0); // State to keep track of the active index

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const sidebarListArray = [
    {
      link: "",
      title: "HOME",
      icon: <HomeOutline color={"currentColor"} />,
    },
    {
      link: "invoice",
      title: "CREATE INVOICE",
      icon: <CreateOutline color={"currentColor"} />,
    },
    {
      link: "products",
      title: "PRODUCTS",
      icon: <ServerOutline color={"currentColor"} />,
    },
    {
      link: "clients",
      title: "CLIENTS",
      icon: <PeopleOutline color={"currentColor"} />,
    },
    {
      link: "user",
      title: "USER",
      icon: <PersonOutline color={"currentColor"} />,
    }
    ];
  return (
    <MyContext.Provider value={{activeIndex, isClick, handleItemClick, handleLinkClick}}>
    <div>
      <div
        className={`${
          isClick ? "w-[calc(100vw-10px)]" : ""
        } transition-width duration-300 ease-in-out sm:block z-10 relative w-0 sm:w-[70px] md:w-[300px] h-full bg-[#4b5bf9] border-[#4b5bf9]`}
      >
        <ul className={`absolute flex flex-col top-0 left-0 h-full w-full pt-[85px] pl-[5px]`}>
          {sidebarListArray.map((list, index) => (
            <SidebarList
            {...list}
            index={index}
            />
            ))}
        </ul>
      </div>
      <div
        className={`${
          isClick ? "bg-[#FBFCFF]" : "bg-[#4b5bf9]"
        } sm:hidden z-20 fixed top-[20px] right-[25px] w-[50px] h-[50px] rounded-[10px] cursor-pointer`}
        onClick={handleBurgerClick}
        ></div>
      
        <LogoutButton/>
        
    </div>
        </MyContext.Provider>
  );
};

export default Sidebar;
