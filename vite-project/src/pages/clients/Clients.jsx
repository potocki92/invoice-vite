import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Clients.css";
import ClientForm from "@components/Client/ClientForm/ClientForm";
import { homeLink } from "@utils/linkConfig";
import { DefaultButton } from "@components/buttons.styled";
import ClientCard from "@components/Client/ClientCard/ClientCard";
import { useDispatch, useSelector } from "react-redux";
import { selectAllClients } from "@redux/clients/selectors";
import { deleteClient, fetchClients } from "@redux/clients/operations";
import { selectToken } from "@redux/auth/selectors";

/**
 * Represents the Clients component, which manages clients data.
 * It fetches and displays clients data, allows adding new clients, and deleting clients.
 * @returns {JSX.Element} - Rendered Clients component.
 */
const Clients = () => {
  const dispatch = useDispatch();
  const clients = useSelector(selectAllClients);
  const token = useSelector(selectToken);

  /**
   * Fetches all clients data from the server for the current user and sets it to the allClients state.
   */
  useEffect(() => {
    if (clients.length === 0 && token) {
      dispatch(fetchClients(token));
    }
  }, [dispatch, clients, token]);

  return (
    <div className="container">
      <div className="invoice__home-logo">
        <h1>Customers</h1>
        {clients && <p>There are total {clients.length} clients</p>}
      </div>
      <Link to={homeLink}>
        <DefaultButton className="back">Go Back</DefaultButton>
      </Link>

      <ClientForm />
      <div className="section__content grid">
        {clients.map((client) => (
          <ClientCard
            key={client._id}
            client={client}
          />
        ))}
      </div>
    </div>
  );
};

export default Clients;
