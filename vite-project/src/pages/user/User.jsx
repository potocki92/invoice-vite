import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { homeLink } from "@utils/linkConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../../redux/user/operations";
import { selectUser } from "../../redux/user/selectors";

const User = () => {
  let { id } = useParams();

  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState(user.password || "");
  const [NIP, setNIP] = useState(user.NIP || "");
  const [REGON, setREGON] = useState(user.REGON || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [city, setCity] = useState(user.address.city || "");
  const [postalCode, setPostalCode] = useState(user.address.postalCode || "");
  const [street, setStreet] = useState(user.address.street || "");
  
  useEffect(() => {
      dispatch(fetchUser())
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setNIP(user.NIP);
      setREGON(user.REGON);
      setPhone(user.phone);
      setCity(user.address.city);
      setPostalCode(user.address.postalCode);
      setStreet(user.address.street)
    }
  }, [user])
  const handleClick = async () => {
    const user = {
      name,
      email,
      password,
      NIP,
      REGON,
      phone,
      address: {
        city,
        postalCode,
        street,
      },
    };
    console.log("User data to be updated:", user)
    dispatch(updateUser(user))
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "userName") {
      setName(value);
    } else if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userNIP") {
      setNIP(value);
    } else if (name === "userREGON") {
      setREGON(value);
    } else if (name === "userPhone") {
      setPhone(value);
    } else if (name === "userCity") {
      setCity(value);
    } else if (name === "userPostal") {
      setPostalCode(value);
    } else if (name === "userStreet") {
      setStreet(value);
    }
  };

  return (
    <div className="container">
      <Link to={homeLink}>
        <button className="button back_button">Go Back</button>
      </Link>
      User {id}
      <div className="form__group">
        <p>Your name:</p>
        <input
          type="text"
          name="userName"
          value={name}
          onChange={handleChange}
          placeholder={"Your name"}
        ></input>
      </div>
      <div className="form__group">
        <p>Email:</p>
        <input
          type="email"
          name="userEmail"
          value={email}
          onChange={handleChange}
          placeholder={"Your email"}
        ></input>
      </div>
      <div className="form__group">
        <p>NIP:</p>
        <input
          type="text"
          name="userNIP"
          value={NIP}
          onChange={handleChange}
          placeholder={"Your NIP"}
        ></input>
      </div>
      <div className="form__group">
        <p>REGON:</p>
        <input
          type="text"
          name="userREGON"
          value={REGON}
          onChange={handleChange}
          placeholder={"Your REGON"}
        ></input>
      </div>
      <div className="form__group">
        <p>Telephone:</p>
        <input
          type="tel"
          name="userPhone"
          value={phone}
          onChange={handleChange}
          placeholder={"Your phone"}
        ></input>
      </div>
      <div className="form__group">
        <p>City:</p>
        <input
          type="text"
          name="userCity"
          value={city}
          onChange={handleChange}
          placeholder={"Your city"}
        ></input>
      </div>
      <div className="form__group">
        <p>Postal Code:</p>
        <input
          type="text"
          name="userPostal"
          value={postalCode}
          onChange={handleChange}
          placeholder={"Your postal code"}
        ></input>
      </div>
      <div className="form__group">
        <p>Street:</p>
        <input
          type="text"
          name="userStreet"
          value={street}
          onChange={handleChange}
          placeholder={"Your street"}
        ></input>
      </div>
      <button className="button" onClick={handleClick}>
        Click
      </button>
    </div>
  );
};

export default User;
