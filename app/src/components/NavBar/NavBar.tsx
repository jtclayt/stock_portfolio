import { Button, Navbar, Nav } from "react-bootstrap";
import React, { Fragment } from "react";

import User from "../../models/User.model";
import "./NavBar.css";

interface NavBarProps {
  user: User | null;
  updateUser: (user: User | null) => void;
}

/**
 * Render the nav bar for accessing pages on site.
 * @param props User props for displaying on nav panel.
 * @returns The site nav bar component.
 */
const NavBar : React.FC<NavBarProps> = ({ user, updateUser }) => {
  /** Logout the currently logged in user. */
  const handleLogout = () => {
    sessionStorage.clear();
    updateUser(null);
  };

  return (
    <Navbar className="NavBar justify-content-between" bg="dark" variant="dark">
        <Navbar.Brand className="brand" href="/">Finance Planner</Navbar.Brand>
        { user
          ? <Fragment>
              <Nav id="site-nav">
                <Nav.Link id="portfolio" className="link" href="/portfolio">
                  Portfolio
                </Nav.Link>
                <Nav.Link id="stocks" className="link" href="/stocks">
                  Stocks
                </Nav.Link>
                <Nav.Link id="budget" className="link" href="/budget">
                  Budget
                </Nav.Link>
              </Nav>

              <Nav>
                <Nav.Link id="profile" className="link text-light" href="/profile">
                  Hi, { user?.displayName() }
                </Nav.Link>
                <Button variant="outline-warning" onClick={ handleLogout }>
                  Logout
                </Button>
              </Nav>
            </Fragment>
          : null
        }
    </Navbar>
  );
};

export default NavBar;
