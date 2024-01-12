import React from "react";
import Add from "../assets/images/add.png";

const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">T-Rex Chat</span>
        <span className="title">Login</span>
        <form>
          <input type="email" placeholder="name" />
          <input type="password" placeholder="password" />

          <button>Sign In</button>
          <p>Don't have an account? Register</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
