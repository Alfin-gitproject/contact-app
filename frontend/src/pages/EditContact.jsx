import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const EditContact = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchContact();
  }, [user, id, navigate]);

  const fetchContact = async () => {
    try {
      setError(null);
      const res = await fetch(`http://localhost:5000/api/contacts/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
      });
      
      // Handle non-2xx responses
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          `HTTP error! status: ${res.status}`
        );
      }
      
      const data = await res.json();
      setFormData({
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
      });
    } catch (error) {
      console.error('Fetch contact error:', error);
      setError(error.message);
      toast.error(`Failed to load contact: ${error.message}`, {
        position: 'top-right',
        autoClose: 5000,
        theme: 'colored',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Name and Email are required!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(`http://localhost:5000/api/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          `HTTP error! status: ${res.status}`
        );
      }

      const data = await res.json();
      toast.success('Contact updated successfully!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      });
      navigate('/mycontacts');
    } catch (error) {
      console.error('Update error:', error);
      setError(error.message);
      toast.error(`Failed to update: ${error.message}`, {
        position: 'top-right',
        autoClose: 5000,
        theme: 'colored',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center mt-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  if (error) return (
    <div className="container mt-4">
      <Alert variant="danger">
        <Alert.Heading>Error loading contact</Alert.Heading>
        <p>{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </Alert>
    </div>
  );

  return (
    <div className="container mt-4" style={{ maxWidth: '400px' }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Edit Contact</h2>
          <Form onSubmit={handleSubmit}>
            {/* Keep your existing form fields */}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditContact;