import { Link, useParams } from "react-router-dom";
import "./Sidebar.css";
import { ReactComponent as DashboardIcon } from "../../assets/images/svg/dashboard.svg";
import { ReactComponent as AddInvoiceIcon } from "../../assets/images/svg/addInvoice.svg";

import { ReactComponent as ClientsIcon } from "../../assets/images/svg/clients.svg";

const Sidebar = () => {
  let { id } = useParams();
  return (
    <div className="sidebar">
      <span className="sidebar__title">InvCom</span>
      <nav className="sidebar__navlink">
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <Link to={`/`}>
              <button className="sidebar__button">
                <svg className="sidebar__svg" width={"32px"} height={"32px"}>
                  <DashboardIcon />
                </svg>
                <span className="sidebar__span">Dashboard</span>
              </button>
            </Link>
          </li>
          <li className="sidebar__item">
            <Link to={`invoice`}>
              <button className="sidebar__button">
                <svg className="sidebar__svg" width={"32px"} height={"32px"}>
                  <AddInvoiceIcon />
                </svg>
                <span className="sidebar__span">Create Invoice</span>
              </button>
            </Link>
          </li>
          <li className="sidebar__item">
            <Link to={`products`}>
              <button className="sidebar__button">
                <svg className="sidebar__svg" width={"32px"} height={"32px"}>
                  <DashboardIcon />
                </svg>
                <span className="sidebar__span">Products</span>
              </button>
            </Link>
          </li>
          <li className="sidebar__item">
            <Link to={`clients`}>
              <button className="sidebar__button">
                <svg className="sidebar__svg" width={"32px"} height={"32px"}>
                  <ClientsIcon />
                </svg>
                <span className="sidebar__span">Clients</span>
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
