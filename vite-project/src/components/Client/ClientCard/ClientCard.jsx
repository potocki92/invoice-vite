import React from "react";
import "./ClientCard.css";
import { ReactComponent as PhoneSvg } from "@assets/images/svg/phone.svg";
import { ReactComponent as EmailSvg } from "@assets/images/svg/email.svg";
import { ReactComponent as DeleteSvg } from "@assets/images/svg/delete.svg";
import PlaceholderImg from "@assets/images/jpg/Placeholder.jpg";
import { useDispatch } from "react-redux";
import { deleteClient } from "@redux/clients/operations";

/**
 * Represents a client card component that displays client information.
 * @param {Object} props - Component props.
 * @param {Object} props.client - Client data object.
 * @param {string} props.client.clientName - Client's name.
 * @param {string} props.client.clientPhone - Client's phone number.
 * @param {string} props.client.clientEmail - Client's email address.
 * @param {string} props.client.clientCity - Client's city.
 * @param {string} props.client.clientPostal - Client's postal code.
 * @param {string} props.client.clientAddress - Client's address.
 * @param {string} props.client._id - ID of the client.
 * @param {Function} props.onDelete - Function to handle client deletion.
 * @returns {JSX.Element} - Rendered ClientCard component.
 */
const ClientCard = ({ client }) => {
  const dispatch = useDispatch();

  /**
   * Handles client deletion from the database.
   * @param {string} clientId - The ID of the client to be deleted.
   */
  const deleteClientHandleChange = (clientId) => {
    dispatch(deleteClient(clientId))
  }
  return (
    <div className="clientCard">
      <div className="clientCard__profile">
        <div className="clientCard__photo">
          <img
            className="clientCard__item--img"
            src={PlaceholderImg}
            alt="Client Avatar"
          />
        </div>
        <span className="clientCard__name">{client.clientName}</span>
      </div>
      <div className="clientCard__information">
        <div className="clientCard__contact">
          <p className="clientCard__paragraph">Contact</p>
          <ul className="clientCard__list">
            <li className="clientCard__item">
              <svg
                className="svg clientCard__item--svg"
                width="20px"
                height="20px"
              >
                <PhoneSvg />
              </svg>
              <a href={`tel:${client.clientPhone}`}>
                <h6 className="clientCard__item--text">{client.clientPhone}</h6>
              </a>
            </li>
            <li className="clientCard__item">
              <svg
                className="svg clientCard__item--svg"
                width="20px"
                height="20px"
              >
                <EmailSvg />
              </svg>
              <a href={`email:${client.clientEmail}`}>
                <h6 className="clientCard__item--text">{client.clientEmail}</h6>
              </a>
            </li>
          </ul>
        </div>
        <div className="clientCard__contact">
          <p className="clientCard__paragraph">Address</p>
          <h6 className="clientCard__item--text">{client.clientCity}</h6>
          <h6 className="clientCard__item--text">{client.clientPostal}</h6>
          <h6 className="clientCard__item--text">{client.clientAddress}</h6>
        </div>
      </div>
      <button className="clientCard__button" onClick={() => deleteClientHandleChange(client._id)}>
        <svg
          className="svg clientCard__item--svg"
          width="30px"
          height="30px"
          viewBox="0 0 20 20"
        >
          <DeleteSvg />
        </svg>
      </button>
    </div>
  );
};

export default ClientCard;
