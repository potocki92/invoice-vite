import { Link } from "react-router-dom";
import { HomeOutline, PersonOutline } from 'react-ionicons'
import { useState } from "react";

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
  return (
    <div>
      {/* <MobileSidebar>
        <ToggleMenuButton onClick={handleBurgerClick}>
          <BurgerIcon className={isClick ? "active" : ""}>
            <span></span>
            <span></span>
            <span></span>
          </BurgerIcon>
        </ToggleMenuButton>
      </MobileSidebar>
      <SidebarStyled className={`${isClick ? "menu-open" : ""}`}>
        <SidebarTitle>InvCom</SidebarTitle>
        <SidebarNavlink>
          <SidebarList>
            <Link to={""} onClick={handleLinkClick}>
              <SidebarItem>
                <SidebarButton>
                  <svg className="sidebar__svg" width={"32px"} height={"32px"}>
                    <DashboardIcon />
                  </svg>
                  <SidebarSpan>Dashboard</SidebarSpan>
                </SidebarButton>
              </SidebarItem>
            </Link>
            <Link to={`invoice`} onClick={handleLinkClick}>
              <SidebarItem>
                <SidebarButton>
                  <svg className="sidebar__svg" width={"32px"} height={"32px"}>
                    <AddInvoiceIcon />
                  </svg>
                  <SidebarSpan>Create Invoice</SidebarSpan>
                </SidebarButton>
              </SidebarItem>
            </Link>
            <Link to={`products`} onClick={handleLinkClick}>
              <SidebarItem>
                <SidebarButton>
                  <svg className="sidebar__svg" width={"32px"} height={"32px"}>
                    <DashboardIcon />
                  </svg>
                  <SidebarSpan>Products</SidebarSpan>
                </SidebarButton>
              </SidebarItem>
            </Link>
            <Link to={`clients`} onClick={handleLinkClick}>
              <SidebarItem>
                <SidebarButton>
                  <svg className="sidebar__svg" width={"32px"} height={"32px"}>
                    <ClientsIcon />
                  </svg>
                  <SidebarSpan>Clients</SidebarSpan>
                </SidebarButton>
              </SidebarItem>
            </Link>
            <Link to={`user`} onClick={handleLinkClick}>
              <SidebarItem>
                <SidebarButton>
                  <svg className="sidebar__svg" width={"32px"} height={"32px"}>
                    <ClientsIcon />
                  </svg>
                  <SidebarSpan>User</SidebarSpan>
                </SidebarButton>
              </SidebarItem>
            </Link>
          </SidebarList>
        </SidebarNavlink>
        <UserMenu
          setLoginUser={setLoginUser}
          handleLinkClick={handleLinkClick}
        />
      </SidebarStyled> */}
  <div className={`${isClick ? "hidden" : ""} sm:block z-10 relative w-[100vw] sm:w-[300px] h-full bg-[#4b5bf9] border-l-[5px] border-[#4b5bf9]` } >
      <ul className="absolute top-0 left-0 w-full pt-10 pl-[5px] mt-[45px]">
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
          <Link className={`${activeIndex === 1 ? "text-[#333]" : "text-[#FBFCFF]"} flex w-full relative block`} to={`invoice`} onClick={handleLinkClick}>
            <span className="relative flex justify-center items-center min-w-[60px] h-[60px] leading-[70px] text-center">
              <PersonOutline
                color={"currentColor"}
                style={{ fontSize: "1.5em"}}
                />
            </span>
            <span className={"relative block pl-[10px] h-[60px] leading-[60px] whitespace-normal"}>Create Invoice</span>
          </Link>
        </li>
      </ul>
      </div>
      <div className={`${isClick ? "bg-[#4b5bf9]" : "bg-[#FBFCFF]"} sm:hidden z-20 fixed top-[20px] right-[20px] w-[50px] h-[50px] rounded-[10px] cursor-pointer`} onClick={handleBurgerClick}></div>
    </div>
  );
};

export default Sidebar;
