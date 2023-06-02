import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Profileedit from "./Profileedit";
import Login from "./Login&Register/Login.js";
import Register from "./Login&Register/Register.js";
import Builders from "./Builders";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        console.log("User is signed in with uid: ", uid);
        setUser(user);
      } else {
        // User is signed out
        console.log("User is signed out");
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/Login" /> : <Register />}
          />
          <Route
            path="/"
            element={user ? <Profileedit /> : <Navigate to="/" />}
          />
          <Route
            path="/Builders"
            element={user ? <Builders /> : <Navigate to="/Builders" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
