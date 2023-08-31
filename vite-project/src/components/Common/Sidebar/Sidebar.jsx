import { Link } from "react-router-dom";
import { HomeOutline, PersonOutline } from 'react-ionicons'
import { useState } from "react";
import SidebarList from "./SidebarList/SidebarList";

/**
 * Represents a sidebar navigation component that provides links to different sections of the application.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.setLoginUser - Function to set the logged-in user.
 * @returns {JSX.Element} - The rendered Sidebar component.
 */
const Sidebar = ({ setLoginUser }) => {
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
  }

  const array = [
    {
      "link": "",
      "title": "HOME",
    },
    {
      "link": "invoice",
      "title": "CREATE INVOICE",
    },
    {
      "link": "products",
      "title": "PRODUCTS",
    },
    {
      "link": "clients",
      "title": "CLIENTS",
    },
    {
      "link": "user",
      "title": "USER",
    }
  ]
  return (
    <div>
  <div className={`${isClick ? "" : "hidden"} sm:block z-10 relative w-[100vw] sm:w-[300px] h-full bg-[#4b5bf9] border-l-[5px] border-[#4b5bf9]` } >
      <ul className="absolute top-0 left-0 w-full pt-10 pl-[5px] mt-[45px]">
      {array.map((a, index) => (
        <SidebarList title={a.title} activeIndex={activeIndex} handleItemClick={handleItemClick} handleLinkClick={handleLinkClick} link={a.link} index={index}/>
      ))}
        <li className={`${activeIndex === 0 ? "bg-[#FBFCFF]" : ""} relative w-full rounded-l-[20px] list`} onClick={() => handleItemClick(0)}>
          <b className={`${activeIndex === 0 ? "block" : "hidden"} absolute top-[-20px] h-[20px] w-full bg-[#FBFCFF] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#4b5bf9] before:rounded-br-[20px]`}></b>
          <b className={`${activeIndex === 0 ? "block" : "hidden"} absolute bottom-[-20px] h-[20px] w-full bg-[#FBFCFF] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#4b5bf9] before:rounded-tr-[20px]`}></b>
          <Link className={`${activeIndex === 0 ? "text-[#333]" : "text-[#FBFCFF]"} flex w-full relative block`} to={""} onClick={handleLinkClick}>
            <span className="relative flex justify-center items-center min-w-[60px] h-[60px] leading-[70px] text-center">
              <HomeOutline
                color={"currentColor"}
                style={{ fontSize: "1.5em"}}
              />
            </span>
            <span className={"relative block pl-[10px] h-[60px] leading-[60px] whitespace-normal"}>HOME</span>
          </Link>
        </li>
        <li className={`${activeIndex === 1 ? "bg-[#FBFCFF]" : ""} relative w-full rounded-l-[20px] list`} onClick={() => handleItemClick(1)}>
          <b className={`${activeIndex === 1 ? "block" : "hidden"} absolute top-[-20px] h-[20px] w-full bg-[#FBFCFF] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#4b5bf9] before:rounded-br-[20px]`}></b>
          <b className={`${activeIndex === 1 ? "block" : "hidden"} absolute bottom-[-20px] h-[20px] w-full bg-[#FBFCFF] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#4b5bf9] before:rounded-tr-[20px]`}></b>
          <Link className={`${activeIndex === 1 ? "text-[#333]" : "text-[#FBFCFF]"} flex w-full relative block`} to={"invoice"} onClick={handleLinkClick}>
            <span className="relative flex justify-center items-center min-w-[60px] h-[60px] leading-[70px] text-center">
              <PersonOutline
                color={"currentColor"}
                style={{ fontSize: "1.5em"}}
                />
            </span>
            <span className={"relative block pl-[10px] h-[60px] leading-[60px] whitespace-normal"}>CREATE INVOICE</span>
          </Link>
        </li>
        <li className={`${activeIndex === 2 ? "bg-[#FBFCFF]" : ""} relative w-full rounded-l-[20px] list`} onClick={() => handleItemClick(2)}>
          <b className={`${activeIndex === 2 ? "block" : "hidden"} absolute top-[-20px] h-[20px] w-full bg-[#FBFCFF] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#4b5bf9] before:rounded-br-[20px]`}></b>
          <b className={`${activeIndex === 2 ? "block" : "hidden"} absolute bottom-[-20px] h-[20px] w-full bg-[#FBFCFF] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#4b5bf9] before:rounded-tr-[20px]`}></b>
          <Link className={`${activeIndex === 2 ? "text-[#333]" : "text-[#FBFCFF]"} flex w-full relative block`} to={`products`} onClick={handleLinkClick}>
            <span className="relative flex justify-center items-center min-w-[60px] h-[60px] leading-[70px] text-center">
              <PersonOutline
                color={"currentColor"}
                style={{ fontSize: "1.5em"}}
                />
            </span>
            <span className={"relative block pl-[10px] h-[60px] leading-[60px] whitespace-normal"}>PRODUCTS</span>
          </Link>
        </li>
        <li className={`${activeIndex === 3 ? "bg-[#FBFCFF]" : ""} relative w-full rounded-l-[20px] list`} onClick={() => handleItemClick(3)}>
          <b className={`${activeIndex === 3 ? "block" : "hidden"} absolute top-[-20px] h-[20px] w-full bg-[#FBFCFF] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#4b5bf9] before:rounded-br-[20px]`}></b>
          <b className={`${activeIndex === 3 ? "block" : "hidden"} absolute bottom-[-20px] h-[20px] w-full bg-[#FBFCFF] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#4b5bf9] before:rounded-tr-[20px]`}></b>
          <Link className={`${activeIndex === 3 ? "text-[#333]" : "text-[#FBFCFF]"} flex w-full relative block`} to={`clients`} onClick={handleLinkClick}>
            <span className="relative flex justify-center items-center min-w-[60px] h-[60px] leading-[70px] text-center">
              <PersonOutline
                color={"currentColor"}
                style={{ fontSize: "1.5em"}}
                />
            </span>
            <span className={"relative block pl-[10px] h-[60px] leading-[60px] whitespace-normal"}>CLIENTS</span>
          </Link>
        </li>
        <li className={`${activeIndex === 4 ? "bg-[#FBFCFF]" : ""} relative w-full rounded-l-[20px] list`} onClick={() => handleItemClick(4)}>
          <b className={`${activeIndex === 4 ? "block" : "hidden"} absolute top-[-20px] h-[20px] w-full bg-[#FBFCFF] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#4b5bf9] before:rounded-br-[20px]`}></b>
          <b className={`${activeIndex === 4 ? "block" : "hidden"} absolute bottom-[-20px] h-[20px] w-full bg-[#FBFCFF] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#4b5bf9] before:rounded-tr-[20px]`}></b>
          <Link className={`${activeIndex === 4 ? "text-[#333]" : "text-[#FBFCFF]"} flex w-full relative block`} to={`user`} onClick={handleLinkClick}>
            <span className="relative flex justify-center items-center min-w-[60px] h-[60px] leading-[70px] text-center">
              <PersonOutline
                color={"currentColor"}
                style={{ fontSize: "1.5em"}}
                />
            </span>
            <span className={"relative block pl-[10px] h-[60px] leading-[60px] whitespace-normal"}>USER</span>
          </Link>
        </li>
      </ul>
      </div>
      <div className={`${isClick ? "bg-[#FBFCFF]" : "bg-[#4b5bf9]" } sm:hidden z-20 fixed top-[20px] right-[20px] w-[50px] h-[50px] rounded-[10px] cursor-pointer`} onClick={handleBurgerClick}></div>
    </div>
  );
};

export default Sidebar;
