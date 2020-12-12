import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './NavBar.css';

const NavBar = () => {
  return (
    <Navbar className="NavBar" bg="dark" variant="dark">
      <Navbar.Brand className="brand" href="/products">Stock Portfolio</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link id="portfolio" className="link" href="/">
          Portfolio
        </Nav.Link>
        <Nav.Link id="stocks" className="link" href="/">
          Stocks
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
