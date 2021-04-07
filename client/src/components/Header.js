import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_USER } from "../constants/type";
import { Fragment } from "react";
import { red } from "colors";
// import history from "../history/history";
const Header = ({ history }) => {
  const dispatch = useDispatch();
  const {
    authUser: { user },
  } = useSelector((state) => state);
  // const user = localStorage.getItem("userInfo")
  //   ? JSON.parse(localStorage.getItem("userInfo"))
  //   : authUser.user;

  /** handle logout */
  const handleLogout = (params) => {
    localStorage.removeItem("userInfo");
    console.log("history", history);
    dispatch({ type: LOGOUT_USER });
    // history.push("/");
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" className="p-3">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <span className="pr-2">
                <i className="fas fa-book-reader fa-lg"></i>
              </span>
              <span className="text-lowercase">bookstore</span>
              <i className="fab fa-etsy"></i>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link className="d-flex align-items-center">
                  <i className="fas fa-shopping-cart fa-2x pr-1 "></i> CART
                </Nav.Link>
              </LinkContainer>
              {/* /** SOMETHINGS UP WHEN WE LOGOUT , try aroung with 'user' */}
              {!user.name ? (
                <LinkContainer to="/login">
                  <Nav.Link className="d-flex align-items-center">
                    <i className="fas fa-user fa-2x pr-1"></i> SIGN-IN
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <NavDropdown
                  title={user && user.name}
                  id="basic-nav-dropdown"
                  className="d-flex align-items-center"
                >
                  <LinkContainer
                    to="/profile"
                    activeClassName=""
                    activeStyle={
                      {
                        // backgroundColor: "blue",
                      }
                    }
                  >
                    <NavDropdown.Item>profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/" activeClassName="">
                    <NavDropdown.Item onClick={handleLogout}>
                      logout
                    </NavDropdown.Item>
                  </LinkContainer>
                  {/* <LinkContainer to="/cart">
                    <NavDropdown.Item>Trial</NavDropdown.Item>
                  </LinkContainer> */}
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
