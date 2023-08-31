import { Link } from "react-router-dom";
import { ReactComponent as DashboardIcon } from "@assets/images/svg/dashboard.svg";
import { ReactComponent as AddInvoiceIcon } from "@assets/images/svg/addInvoice.svg";
import { ReactComponent as ClientsIcon } from "@assets/images/svg/clients.svg";
import {
  BurgerIcon,
  MobileSidebar,
  SidebarButton,
  SidebarItem,
  SidebarList,
  SidebarNavlink,
  SidebarSpan,
  SidebarStyled,
  SidebarTitle,
  ToggleMenuButton,
} from "./Sidebar.styled";
import { HomeOutline, PersonOutline } from 'react-ionicons'
import styles from "./Sidebar.module.css"
import { useState } from "react";
import UserMenu from "@components/Common/UserMenu/UserMenu";

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
  <div className={`${isClick ? "hidden" : ""} z-10 relative w-[300px] h-full bg-[#4b5bf9] border-l-[5px] border-[#4b5bf9]` } >
      <ul className="absolute top-0 left-0 w-full pt-10 pl-[5px]">
        <li 
        className={`${activeIndex === 0 ? "bg-[#FBFCFF] text-red" : ""} relative w-full rounded-r-[20px] list`}
        onClick={() => handleItemClick(0)}>
          <b className="[&>*:nth-child(1)]:absolute"></b>
          <b></b>
          <a className="flex w-full relative block text-[#FBFCFF]" href="#">
            <span className="relative block min-w-[60px] h-[60px] leading-[70px] text-center">
              <HomeOutline
                color={"currentColor"}
                style={{ fontSize: "1.5em"}}
              />
            </span>
            <span className={styles.title}>HOME</span>
          </a>
        </li>
        <li 
        className={`${activeIndex === 1 ? styles.active : ""} list`}
        onClick={() => handleItemClick(1)}>
          <b></b>
          <b></b>
          <a href="#">
            <span className={styles.icon}>
              <PersonOutline
                color={"currentColor"}
                style={{ fontSize: "1.5em"}}
                />
            </span>
            <span className={styles.title}>PROFILE</span>
          </a>
        </li>
      </ul>
      </div>
      <div className={styles.toggle} onClick={handleBurgerClick}></div>
    </div>
  );
};

export default Sidebar;
