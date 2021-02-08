import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" className="p-3">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <span className="text-lowercase">e</span>Shop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link className="d-flex align-items-center">
                <i className="fas fa-shopping-cart fa-2x"></i> CART
              </Nav.Link>
              <Nav.Link>
                <i className="fas fa-user fa-2x"></i> SIGN-IN
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
