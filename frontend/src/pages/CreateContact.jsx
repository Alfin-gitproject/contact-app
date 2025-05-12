import React, { useState, useContext } from "react";
import { Form, Button, Card, Container, FloatingLabel, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

const CreateContact = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!formData.name || !formData.email) {
      toast.error("Name and Email are required!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create contact");
      toast.success("Contact created successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      navigate("/mycontacts");
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-center">
        <Card className="shadow-sm border-0" style={{ width: "100%", maxWidth: "500px" }}>
          <Card.Header className="bg-white border-0 pt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Button 
                variant="outline-secondary" 
                size="sm" 
                onClick={() => navigate("/mycontacts")}
                className="d-flex align-items-center"
              >
                <span className="me-1">←</span>
                Back
              </Button>
              <h4 className="mb-0 text-center flex-grow-1">
                <span className="me-2">👤</span>
                Create New Contact
              </h4>
            </div>
          </Card.Header>
          
          <Card.Body className="px-4 py-3">
            <Form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="floatingName"
                label="Full Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingEmail"
                label="Email Address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingPhone"
                label="Phone Number"
                className="mb-3"
              >
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength={10}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingAddress"
                label="Address"
                className="mb-4"
              >
                <Form.Control
                  as="textarea"
                  style={{ height: '100px' }}
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </FloatingLabel>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Creating...
                  </>
                ) : (
                  <>
                    <span className="me-2">💾</span>
                    Save Contact
                  </>
                )}
              </Button>
            </Form>
          </Card.Body>
          
          <Card.Footer className="bg-white border-0 text-muted text-center pb-4">
            <small>All fields are securely stored</small>
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
};

export default CreateContact;