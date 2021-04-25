import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

import AppRouter from "./AppRouter";
import NavBar from "./components/NavBar/NavBar";
import User from "./models/User.model";
import { getUserSession } from "./auth/User";

function App() {
  const [user, setUser] = useState(getUserSession());

  const updateUser = (user: User | null) => {
    setUser(user);
  }

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
