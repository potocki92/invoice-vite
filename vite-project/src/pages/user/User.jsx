import axios from "../../utils/axiosConfig";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const User = () => {
  let { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [NIP, setNIP] = useState("");
  const [REGON, setREGON] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const token = localStorage.getItem("token");
  const getUserFromLocalStorage = localStorage.getItem("user");
  const parsedUser = JSON.parse(getUserFromLocalStorage);
  const userId = parsedUser.id;
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            UserId: userId,
          },
        });
        const user = response.data;
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
        setNIP(user.NIP);
        setREGON(user.REGON);
        setPhone(user.phone);
        setCity(user.address?.city);
        setPostalCode(user.address?.postalCode);
        setStreet(user.address?.street);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [id]);

  const handleClick = async () => {
    try {
      const updatedUser = {
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

      const response = await axios.put(`/user`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          UserId: userId,
        },
      });
      console.log("User updated successfully:", response.data);
      const userToSave = {
        _id: id,
        user: updatedUser,
      };

      localStorage.setItem("user", JSON.stringify(userToSave));
    } catch (error) {
      console.error(error);
    }
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
      <Link to={`/`}>
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
          placeholder={"Your phone"}
        ></input>
      </div>
      <button className="button" onClick={handleClick}>
        Click
      </button>
    </div>
  );
};

export default User;
