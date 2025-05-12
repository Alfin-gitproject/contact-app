import React, { useState, useContext } from "react";
import { Form, Button, Card, Container, Row, Col,  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!formData.email || !formData.password) {
      toast.error("Email and Password are required!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setIsLoading(false);
      return;
    }

    try {
      const result = await loginUser(formData);
      if (result?.success) {
        navigate("/mycontacts");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center">
      <Row className="justify-content-center w-100">
        <Col md={6} lg={4}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Welcome Back</h2>
              <p className="text-muted fw-bold">Sign in to your account</p>
              </div>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail" className="mb-4">
                  <Form.Label className="fw-medium">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-4">
                  <Form.Label className="fw-medium">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="py-2"
                  />
                </Form.Group>

                <div className="d-grid mb-3">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </div>

                <div className="text-center mb-3">
                  <a 
                    href="#!" 
                    className="text-decoration-none"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/forgot-password");
                    }}
                  >
                    Forgot password?
                  </a>
                </div>
              </Form>

              <div className="text-center mt-4">
                <p className="text-muted">
                  Don't have an account?{" "}
                  <a 
                    href="#!" 
                    className="text-decoration-none fw-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/register");
                    }}
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;