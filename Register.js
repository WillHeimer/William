import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Login&Register.css";
import { signOut } from "firebase/auth"; // Add this import at the top

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    // Check if email, password, and confirmPassword fields are filled
    if (!email || !password || !confirmPassword) {
      console.log("Please fill in all the required fields.");
      return;
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      console.log("Passwords do not match.");
      return;
    }

    // Register the user
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user", user);

        // Sign out the user
        await signOut(auth);

        // Redirect to /login
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error in registration", error);
      });
  };

  return (
    <div className="login-register-container">
      <div className="login-register">
        <h1>Register</h1>
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

          <h5>Confirm Password</h5>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={register}
            className="login-register-button"
          >
            Register
          </button>
        </form>
        <Link to="/Login" className="login-register-link">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
