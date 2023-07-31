/* This file imports necessary modules and components, and exports the main Client component */
import { Types } from "mongoose";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import "./Clients.css";
import ClientForm from "../../components/Client/ClientForm/ClientForm";
import { homeLink } from "../../utils/linkConfig";
import { DefaultButton } from "../../components/buttons.styled";
import ClientCard from "../../components/Client/ClientCard/ClientCard";
import { setAuthHeader } from "../../redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectAllClients } from "../../redux/clients/selectors";
import { fetchClients } from "../../redux/clients/operations";
import { selectToken } from "../../redux/auth/selectors";
/* 
  This function defines the main Client component, 
  which fetches all clients data for the current user from the database, 
  adds new clients to the database, and allows deleting clients from the database 
*/
const Clients = () => {
  const dispatch = useDispatch()
  const clients = useSelector(selectAllClients)
  const token = useSelector(selectToken)
  let { id } = useParams(); //  This line uses the useParams() hook to retrieve the ID of the current user from the URL
  /* This line defines the initial state for a new client, with empty strings for all properties */
  const [newClient, setNewClient] = useState({
    _id: new Types.ObjectId(),
    clientName: "",
    clientNip: "",
    clientRegon: "",
    clientEmail: "",
    clientPhone: "",
    clientCity: "",
    clientPostal: "",
    clientAddress: "",
  });
  /* This effect retrieves all clients data from the server for the current user and sets it to the allClients state */
  useEffect(() => {
    dispatch(fetchClients(token))
  }, [dispatch]);
  /* This function updates the newClient state whenever any input field is changed */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewClient({ ...newClient, [name]: value });
  };
  /* This function adds a new client to the database when the 'Add Client' button is clicked, and resets the newClient state */
  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`/addClient`, newClient, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAllClients([...clients, newClient]);
        setNewClient({
          _id: new Types.ObjectId(),
          clientName: "",
          clientNip: "",
          clientRegon: "",
          clientEmail: "",
          clientPhone: "",
          clientCity: "",
          clientPostal: "",
          clientAddress: "",
        });
      })
      .catch((err) => console.error(err));
  };
  /* This function deletes a client from the database when the 'Delete' button is clicked */
  const deleteClient = (clientId) => {
    axios
      .delete(`/clients/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        
      })
      .catch((err) => console.error(err));
  };
  /* This block of code defines the structure of the Client component, 
  which includes a form for adding new clients, a list of all clients with their 
  information displayed in ClientCard components, and a button for returning to the previous page */
  return (
    <div className="container">
      <div className="invoice__home-logo">
        <h1>Customers</h1>
        {clients && <p>There are total {clients.length} clients</p>}
      </div>
      <Link to={homeLink}>
        <DefaultButton className="back">Go Back</DefaultButton>
      </Link>

      <ClientForm
        newClient={newClient}
        handleChange={handleChange}
        handleClick={handleClick}
      />
      <div className="section__content grid">
        {clients.map((client) => {
          return <ClientCard id={id} client={client} onDelete={deleteClient} />;
        })}
      </div>
    </div>
  );
};

export default Clients;
