// components/ModernHeader.tsx
import React from "react";
import { Navbar, Nav, Container, Dropdown, Image } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ModernHeader: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      bg="white"
      variant="light"
      className="border-bottom shadow-sm py-2 px-3"
    >
      <Container fluid>
        {/* Logo and Toggle */}
        <Navbar.Brand href="/" className="fw-bold text-primary">
          JiraLite
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />

        {/* Collapsible Content */}
        <Navbar.Collapse id="main-navbar">
          {/* Centered Nav Links */}
          <Nav className="mx-auto my-2 my-lg-0">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-3 text-dark fw-medium text-decoration-none ${isActive ? "fw-bold" : "text-dark"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink to="/kanban"
              className={({ isActive }) =>
                `px-3 text-dark fw-medium text-decoration-none ${isActive ? "fw-bold" : "text-dark"
                }`
              }>
              Kanban Board
            </NavLink>
            <NavLink to="/users"
              className={({ isActive }) =>
                `px-3 text-dark fw-medium text-decoration-none ${isActive ? "fw-bold" : "text-dark"
                }`
              }>
              Users
            </NavLink>
          </Nav>

          {/* User Profile */}
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="light"
              className="d-flex align-items-center gap-2 border-0"
            >
              <Image
                src="https://picsum.photos/seed/picsum/200/300"
                roundedCircle
                width={32}
                height={32}
                alt="User"
              />
              <span className="d-none d-md-inline text-dark fw-semibold">
                John
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/account">Account</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ModernHeader;
