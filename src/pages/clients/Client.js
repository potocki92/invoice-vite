/* This file imports necessary modules and components, and exports the main Client component */
import { Types } from "mongoose";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import ClientCard from "../../components/ClientCard/ClientCard";
import "./Client.css";
import ClientForm from "../../components/ClientForm/ClientForm";
/* 
  This function defines the main Client component, 
  which fetches all clients data for the current user from the database, 
  adds new clients to the database, and allows deleting clients from the database 
*/
const Client = () => {
  let { id } = useParams(); //  This line uses the useParams() hook to retrieve the ID of the current user from the URL
  /* This line defines the initial state for a new client, with empty strings for all properties */
  const [newClient, setNewClient] = useState({
    _id: Types.ObjectId(),
    clientName: "",
    clientNip: "",
    clientRegon: "",
    clientEmail: "",
    clientPhone: "",
    clientCity: "",
    clientPostal: "",
    clientAddress: "",
  });
  const token = localStorage.getItem("token");
  const getUserFromLocalStorage = localStorage.getItem("user");
  const parsedUser = JSON.parse(getUserFromLocalStorage);
  const userId = parsedUser.id;
  /* This line defines the initial state for all clients, either by retrieving them from local storage, or setting an empty array */
  const [allClients, setAllClients] = useState(
    JSON.parse(localStorage.getItem("clients")) || []
  );
  /* This effect saves the current state of allClients to local storage whenever it is updated */
  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(allClients));
  }, [allClients]);
  /* This effect retrieves all clients data from the server for the current user and sets it to the allClients state */
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`/clients`, {
          headers: {
            Authorization: `Bearer ${token}`,
            UserId: userId,
          },
        });
        setAllClients(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClients();
  }, [id]);
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
          UserId: userId,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAllClients([...allClients, newClient]);
        setNewClient({
          _id: Types.ObjectId(),
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
          UserId: userId,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAllClients(allClients.filter((client) => client._id !== clientId));
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
        {allClients && <p>There are total {allClients.length} clients</p>}
      </div>
      <Link to={`/`}>
        <button className="button back_button">Go Back</button>
      </Link>

      <ClientForm
        newClient={newClient}
        handleChange={handleChange}
        handleClick={handleClick}
      />
      <div className="section__content grid">
        {allClients.map((client) => {
          return <ClientCard id={id} client={client} onDelete={deleteClient} />;
        })}
      </div>
    </div>
  );
};

export default Client;
