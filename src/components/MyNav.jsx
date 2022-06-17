import React from "react";
import { Navbar, Container, Nav, Tabs, Tab } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const MyNav = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <NavLink
              className="nav-link"
              to="/"
              activeclassName={"nav-link-selected"}
            >
              HOME
            </NavLink>
            <NavLink
              className="nav-link"
              to="/add"
              activeclassName={"nav-link-selected"}
            >
              A NEW BOOK
            </NavLink>
            <NavLink
              className="nav-link"
              to="/wish"
              activeclassName={"nav-link-selected"}
            >
              WISH LIST
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNav;
