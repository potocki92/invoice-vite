import { Link } from "react-router-dom";
import { ReactComponent as DashboardIcon } from "../../assets/images/svg/dashboard.svg";
import { ReactComponent as AddInvoiceIcon } from "../../assets/images/svg/addInvoice.svg";
import { ReactComponent as ClientsIcon } from "../../assets/images/svg/clients.svg";
import { homeLink } from "../../utils/linkConfig";
import { BurgerIcon, MobileSidebar, SidebarButton, SidebarItem, SidebarList, SidebarNavlink, SidebarSpan, SidebarStyled, SidebarTitle, ToggleMenuButton } from "./Sidebar.styled";
import { useState } from "react";

const Sidebar = () => {
  const [isClick, setIsClick] = useState(false);
  const handleBurgerClick = () => {
    setIsClick(!isClick);
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
          <Link to={homeLink}>
          <SidebarItem>
              <SidebarButton>
                <svg className="sidebar__svg" width={"32px"} height={"32px"}>
                  <DashboardIcon />
                </svg>
                <SidebarSpan>Dashboard</SidebarSpan>
              </SidebarButton>
          </SidebarItem>
          </Link>
          <Link to={`invoice`}>
          <SidebarItem>
              <SidebarButton>
                <svg className="sidebar__svg" width={"32px"} height={"32px"}>
                  <AddInvoiceIcon />
                </svg>
                <SidebarSpan>Create Invoice</SidebarSpan>
              </SidebarButton>
          </SidebarItem>
          </Link>
          <Link to={`products`}>
          <SidebarItem>
              <SidebarButton>
                <svg className="sidebar__svg" width={"32px"} height={"32px"}>
                  <DashboardIcon />
                </svg>
                <SidebarSpan>Products</SidebarSpan>
              </SidebarButton>
          </SidebarItem>
          </Link>
          <Link to={`clients`}>
          <SidebarItem>
              <SidebarButton>
                <svg className="sidebar__svg" width={"32px"} height={"32px"}>
                  <ClientsIcon />
                </svg>
                <SidebarSpan>Clients</SidebarSpan>
              </SidebarButton>
          </SidebarItem>
          </Link>
        </SidebarList>
      </SidebarNavlink>
    </SidebarStyled>
    </>
  );
};

export default Sidebar;
