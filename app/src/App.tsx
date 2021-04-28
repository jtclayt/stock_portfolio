import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import React, { useState } from "react";

import AppRouter from "./AppRouter";
import NavBar from "./components/NavBar/NavBar";
import User from "./models/User.model";
import { getUserSession } from "./auth/User";

/**
 * The main app component for rendering UI.
 * @returns
 */
function App() {
  const [user, setUser] = useState(getUserSession());

  /**
   * Update the currently logged in user.
   * @param user Logged in user or null if user logged out.
   */
  const updateUser = (user: User | null) => {
    setUser(user);
  };

  return (
    <div className="App">
      <NavBar user={ user } updateUser={ updateUser } />
      <Container>
        <BrowserRouter>
          <AppRouter user={ user } updateUser={ updateUser } />
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
