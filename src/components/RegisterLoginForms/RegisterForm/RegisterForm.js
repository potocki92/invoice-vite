import React, { useState } from "react";
import "./RegisterForm.css";
import axios from "axios";

const Register = ({ setShowRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    if (name && email && password) {
      axios.post("/register", formData).then((res) => {
        console.log("Successfully Registered");
        alert(res.data.message);
        setShowRegister(false);
      });
    } else {
      alert("invalid");
    }
  };

  return (
    <div className="form-container is-flex">
      <h1 className="form-title">Register</h1>
      <form className="form is-flex" onSubmit={(e) => onSubmit(e)}>
        <input
          className="form-input"
          type={"text"}
          name="name"
          value={name}
          placeholder="Enter your username"
          onChange={(e) => onChange(e)}
          required
        />
        <input
          className="form-input"
          type={"email"}
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => onChange(e)}
          required
        />
        <input
          className="form-input"
          type={"password"}
          name="password"
          value={password}
          placeholder="Enter you password"
          onChange={(e) => onChange(e)}
          minLength="6"
        />
        <button className="form-button" type="submit" value="Register">
          Register
        </button>
      </form>
      <p className="form-paragraph is-flex">
        Already have an account?{" "}
        <button onClick={() => setShowRegister(true)}>Login</button>
      </p>
    </div>
  );
};

export default Register;
