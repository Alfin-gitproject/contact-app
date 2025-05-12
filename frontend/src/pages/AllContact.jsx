import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

const AllContact = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    fetchContacts();
  }, [user, navigate]);

  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch contacts");
      setContacts(data);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete contact");
      setContacts(contacts.filter((contact) => contact._id !== id));
      toast.success("Contact deleted successfully", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Card className="shadow-lg border-0">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center rounded-top py-3">
          <h3 className="mb-0">My Contacts</h3>
          <div>
            <Button
              variant="light"
              onClick={() => navigate("/create")}
              className="me-2 fw-bold"
            >
              <i className="bi bi-plus-circle me-1"></i> Add Contact
            </Button>
            <Button
              variant="outline-light"
              onClick={logoutUser}
              className="fw-bold"
            >
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </Button>
          </div>
        </Card.Header>

        <Card.Body className="p-4">
          {contacts.length === 0 ? (
            <Card className="text-center border-0">
              <Card.Body>
                <h5 className="text-muted mb-3">No Contacts Found</h5>
                <p className="text-muted mb-4">Start by adding a new contact!</p>
                <Button
                  variant="primary"
                  onClick={() => navigate("/create")}
                  className="fw-bold"
                >
                  Add Your Contact
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {contacts.map((contact) => (
                <div className="col" key={contact._id}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body>
                      <Card.Title>{contact.name}</Card.Title>
                      <Card.Text>
                        <strong>Email:</strong> {contact.email} <br />
                        <strong>Phone:</strong> {contact.phone} <br />
                        <strong>Address:</strong> {contact.address}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-white border-0 d-flex justify-content-end">
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() =>
                          navigate(`/edit/${contact._id}`, { state: { contact } })
                        }
                      >
                        <i className="bi bi-pencil me-1"></i> Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(contact._id)}
                      >
                        <i className="bi bi-trash me-1"></i> Delete
                      </Button>
                    </Card.Footer>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default AllContact;
