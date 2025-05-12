import React, { useContext } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Container fluid className="px-0">
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <Container className="text-center py-4">
          <h1 className="display-4 fw-bold mb-3">Welcome to Contact App</h1>
          <p className="lead mb-4">
            {user 
              ? `Hello, ${user.name}! Manage your contacts efficiently.`
              : "The best way to organize your contacts"}
          </p>
          {user ? (
            <Button 
              variant="light" 
              size="lg"
              onClick={() => navigate("/mycontacts")}
              className="px-4"
            >
              Go to Dashboard
            </Button>
          ) : (
            <div className="d-flex justify-content-center gap-3">
              <Button 
                variant="light" 
                size="lg"
                onClick={() => navigate("/login")}
                className="px-4"
              >
                Login
              </Button>
              <Button 
                variant="outline-light" 
                size="lg"
                onClick={() => navigate("/register")}
                className="px-4"
              >
                Register
              </Button>
            </div>
          )}
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <h2 className="text-center mb-5">Why Choose Our Contact App</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center p-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                  <i className="bi bi-people-fill fs-2 text-primary"></i>
                </div>
                <Card.Title>Easy Management</Card.Title>
                <Card.Text>
                  Quickly add, edit, and organize all your contacts in one place.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center p-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                  <i className="bi bi-shield-lock-fill fs-2 text-primary"></i>
                </div>
                <Card.Title>Secure Storage</Card.Title>
                <Card.Text>
                  Your contacts are securely stored and protected.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center p-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                  <i className="bi bi-device-phone fs-2 text-primary"></i>
                </div>
                <Card.Title>Access Anywhere</Card.Title>
                <Card.Text>
                  Available on all your devices, anytime you need it.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Call to Action */}
      {!user && (
        <div className="bg-light py-5">
          <Container className="text-center">
            <h2 className="mb-4">Ready to get started?</h2>
            <p className="lead mb-4">Create your account now and start managing your contacts.</p>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate("/register")}
              className="px-4"
            >
              Sign Up Free
            </Button>
          </Container>
        </div>
      )}
    </Container>
  );
};

export default Home;