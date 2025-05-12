import React, { useState, useContext } from "react";
import { Form, Button, Card, Container, FloatingLabel, Spinner, Alert } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

const EditContact = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const contactData = location.state?.contact;

  const [formData, setFormData] = useState({
    name: contactData?.name || "",
    email: contactData?.email || "",
    phone: contactData?.phone || "",
    address: contactData?.address || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!user) {
    navigate("/login");
    return null;
  }

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
      setError(null);
      const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }

      toast.success("Contact updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      navigate("/mycontacts");
    } catch (error) {
      console.error("Update error:", error);
      setError(error.message);
      toast.error(`Failed to update: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
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
                <span className="me-2">✏️</span>
                Edit Contact
              </h4>
            </div>
          </Card.Header>
          
          <Card.Body className="px-4 py-3">
            {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
            
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
                    Updating...
                  </>
                ) : (
                  <>
                    <span className="me-2">💾</span>
                    Save Changes
                  </>
                )}
              </Button>
            </Form>
          </Card.Body>
          
          <Card.Footer className="bg-white border-0 text-muted text-center pb-4">
            <small>Editing contact ID: {id}</small>
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
};

export default EditContact;