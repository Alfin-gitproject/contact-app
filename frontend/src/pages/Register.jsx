import React, { useState, useContext } from "react";
import { Form, Button, Card, Container, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const result = await registerUser(formData);
      if (result && result.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <Card className="shadow-sm">
          <Card.Body className="p-4">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-primary">Create Account</h2>
              <p className="text-muted fw-bold">Fill in your details to register</p>
            </div>
            
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <FloatingLabel controlId="floatingName" label="Full Name" className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your name.
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel controlId="floatingPhone" label="Phone Number" className="mb-3">
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength={10}
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingAddress" label="Address" className="mb-3">
                <Form.Control
                  as="textarea"
                  style={{ height: '80px' }}
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password" className="mb-4">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a password.
                </Form.Control.Feedback>
              </FloatingLabel>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 py-2 fw-bold"
                size="lg"
              >
                Register
              </Button>
            </Form>

            <div className="text-center mt-3">
              <p className="text-muted fw-bold" >
                Already have an account?{" "}
                <a 
                  href="/login" 
                  className="text-decoration-none fw-bold"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                >
                  Sign In
                </a>
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Register;