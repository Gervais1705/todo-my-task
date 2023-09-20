import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            Todos My App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <>
                  <Nav.Link as={Link} to={"/todos"}>
                  Todos
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/add-todos"}>
                    Add Todos
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/my-profile"}>
                    My Profile
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      localStorage.removeItem("token");
                      setUser(null);
                      navigate("/");
                    }}
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to={"/"}>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/login"}>
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/register"}>
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
