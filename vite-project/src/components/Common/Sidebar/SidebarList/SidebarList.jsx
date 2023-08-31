import { Link } from "react-router-dom";
import { HomeOutline, PersonOutline } from 'react-ionicons'
import { useState } from "react";

const SidebarList = ({ props }) => {
  const {title, activeIndex, handleItemClick, handleLinkClick} = props
  return (
    <>
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
            <span className={"relative block pl-[10px] h-[60px] leading-[60px] whitespace-normal"}>{title}</span>
          </Link>
        </li>
    </>
  );
};

export default SidebarList;
