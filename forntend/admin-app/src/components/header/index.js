import React from "react";
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions/auth_actions";

export const Header = () => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signout());
  };
  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <Nav.Link href={"/signin"}>Signin</Nav.Link>
        <Nav.Link href={"/signup"}>Signup</Nav.Link>
      </Nav>
    );
  };

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <Nav.Link onClick={logout}>Signout</Nav.Link>
      </Nav>
    );
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        fixed="top"
        variant="dark"
        style={{ zIndex: "1" }}
      >
        <Container fluid>
          <Navbar.Brand to="/">Admin Dasboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>

            {auth.authenticate
              ? renderLoggedInLinks()
              : renderNonLoggedInLinks()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
