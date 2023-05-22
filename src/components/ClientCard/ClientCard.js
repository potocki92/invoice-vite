import React from "react";
import "./ClientCard.css";
import { ReactComponent as PhoneSvg } from "../../assets/images/svg/phone.svg";
import { ReactComponent as EmailSvg } from "../../assets/images/svg/email.svg";
import { ReactComponent as DeleteSvg } from "../../assets/images/svg/delete.svg";
import PlaceholderImg from "../../assets/images/jpg/Placeholder.jpg";

class ClientCard extends React.Component {
  render() {
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
          <span className="clientCard__name">
            {this.props.client.clientName}
          </span>
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
                <a href={`tel:${this.props.client.clientPhone}`}>
                  <h6 className="clientCard__item--text">
                    {this.props.client.clientPhone}
                  </h6>
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
                <a href={`email:${this.props.client.clientEmail}`}>
                  <h6 className="clientCard__item--text">
                    {this.props.client.clientEmail}
                  </h6>
                </a>
              </li>
            </ul>
          </div>
          <div className="clientCard__contact">
            <p className="clientCard__paragraph">Address</p>
            <h6 className="clientCard__item--text">
              {this.props.client.clientCity}
            </h6>
            <h6 className="clientCard__item--text">
              {this.props.client.clientPostal}
            </h6>
            <h6 className="clientCard__item--text">
              {this.props.client.clientAddress}
            </h6>
          </div>
        </div>
        <button
          className="clientCard__button"
          onClick={() => this.props.onDelete(this.props.client._id)}
        >
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
  }
}

export default ClientCard;
