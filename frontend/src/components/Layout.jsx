import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Layout = ({ children }) => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const result = logoutUser();
    if (result.success) {
      navigate('/'); // Navigate here
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand onClick={() => navigate('/')}>Contact App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <>
                  <Nav.Link onClick={() => navigate('/mycontacts')}>
                    My Contacts
                  </Nav.Link>
                  <Nav.Link onClick={() => navigate('/create')}>
                    Create Contact
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={() => navigate('/login')}>
                    Login
                  </Nav.Link>
                  <Nav.Link onClick={() => navigate('/register')}>
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">{children}</Container>
    </>
  );
};

export default Layout;