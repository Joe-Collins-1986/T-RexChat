import React from "react";
import Add from "../assets/images/add.png";

const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">T-Rex Chat</span>
        <span className="title">Register</span>
        <form>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="name" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="Avatar" />
            <span>Upload Avatar</span>
          </label>
          <button>Sign Up</button>
          <p>Have an account? Login</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
