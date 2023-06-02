import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import "./Login&Register.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user", user);
      })
      .catch((error) => {
        console.error("Error in login", error);
      });
  };

  return (
    <div className="login-register-container">
      <div className="login-register">
        <h1>Login</h1>
        <form className="login-register-form">
          <h5>E-mail</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            onClick={login}
            className="login-register-button"
          >
            Login
          </button>
        </form>
        <Link to="/Register" className="login-register-link">
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
