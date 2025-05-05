import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const AllContact = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    fetchContacts();
  }, [user, navigate]);

  const fetchContacts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch contacts');
      setContacts(data);
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete contact');
      setContacts(contacts.filter((contact) => contact._id !== id));
      toast.success('Contact deleted successfully', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      });
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>My Contacts</h2>
      <Button variant="primary" onClick={() => navigate('/create')} className="mb-3">
        Add Contact
      </Button>
      <Button variant="danger" onClick={logoutUser} className="mb-3 ms-2">
        Logout
      </Button>
      {contacts.length === 0 ? (
    <p class="text-center fw-bold text-muted my-4">
    No contacts found.
  </p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.address}</td>
                <td>
                <Button
  variant="warning"
  onClick={() => navigate(`/edit/${contact._id}`, { state: { contact } })}
  className="me-2"
>
  Edit
</Button>
                  <Button variant="danger" onClick={() => handleDelete(contact._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AllContact;