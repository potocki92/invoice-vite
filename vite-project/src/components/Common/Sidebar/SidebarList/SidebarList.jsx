import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../Context";

const SidebarList = (props) => {
  const { title, link, index, icon } = props;
  const { activeIndex, handleItemClick, handleLinkClick, isClick } =
    useContext(MyContext);
  return (
    <>
      <Link to={link} onClick={handleLinkClick}>
        <li
          className={`${
            activeIndex === index ? "bg-[#FBFCFF]" : ""
          } h-[60px] relative w-full rounded-l-[20px] list`}
          onClick={() => handleItemClick(index)}
        >
          <b
            className={`${
              activeIndex === index ? "block" : "hidden"
            } absolute top-[-20px] h-[20px] w-full bg-[#FBFCFF] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#4b5bf9] before:rounded-br-[20px]`}
          ></b>
          <b
            className={`${
              activeIndex === index ? "block" : "hidden"
            } absolute bottom-[-20px] h-[20px] w-full bg-[#FBFCFF] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#4b5bf9] before:rounded-tr-[20px]`}
          ></b>
          <div
            className={`${
              activeIndex === index ? "text-[#333]" : "text-[#FBFCFF]"
            } flex w-full relative block`}
          >
            <span
              className={`${
                isClick ? "" : "hidden"
              } relative flex sm:flex justify-center items-center min-w-[60px] h-[60px] leading-[70px] text-center`}
            >
              {icon}
            </span>
            <span
              className={`${
                isClick ? "" : "hidden"
              } sm:hidden md:block relative block pl-[10px] h-[60px] leading-[60px] whitespace-normal`}
            >
              {title}
            </span>
          </div>
        </li>
      </Link>
    </>
  );
};

export default SidebarList;
