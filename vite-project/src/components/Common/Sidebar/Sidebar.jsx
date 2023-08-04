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
  return (
    <>
      <MobileSidebar>
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
      </SidebarStyled>
    </>
  );
};

export default Sidebar;
