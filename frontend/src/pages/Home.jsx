import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="container mt-4 text-center">
      <h1>Welcome to Contact App</h1>
      {user ? (
        <>
          <p>Hello, {user.name}! Manage your contacts.</p>
          <Button variant="primary" onClick={() => navigate("/mycontacts")}>
            View Contacts
          </Button>
        </>
      ) : (
        <>
          <p class="text-center fw-bold text-muted my-4">Please log in or register to manage your contacts.</p>
          <Button
            variant="primary"
            onClick={() => navigate("/login")}
            className="me-2"
          >
            Login
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </>
      )}
    </div>
  );
};

export default Home;
