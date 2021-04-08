import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./NavBar.css";

const NavBar : React.FC = () => {
  return (
    <Navbar className="NavBar" bg="dark" variant="dark">
      <Navbar.Brand className="brand" href="/">Stock Portfolio</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link id="portfolio" className="link" href="/">
          Portfolio
        </Nav.Link>
        <Nav.Link id="stocks" className="link" href="/stocks">
          Stocks
        </Nav.Link>
        <Nav.Link id="budget" className="link" href="/budget">
          Budget
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
