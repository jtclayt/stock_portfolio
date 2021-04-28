import axios from "axios";
import React, { Fragment, useState } from "react";
import { Tab, Tabs} from "react-bootstrap";
import { useHistory } from "react-router-dom";

import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import { setAuthToken } from "../../auth/AuthToken";
import { setUserSession } from "../../auth/User";
import User from "../../models/User.model";
import UserData from "../../types/UserData.type";
import { USER_BASE_URL } from "../../constants";
import { Alert } from "react-bootstrap";

interface LoginPageProps {
  updateUser: (user: User) => void;
}

/**
 * This page controls logic for user login and registration.
 * @param props Input props for the login component.
 * @returns The login page component.
 */
const LoginPage : React.FC<LoginPageProps> = ({ updateUser }) => {
  const history = useHistory();
  const [loginError, setLoginError] = useState("");
  const [tabKey, setTabKey] = useState("login");

  /**
   * Make login request for an auth token from API.
   * @param data User credentials to login.
   */
  const handleLogin = (data: {username: string, password: string}) => {
    axios.post(`${USER_BASE_URL}token`, data)
      .then(res => {
        setAuthToken(res.data.token);
        axios.get(`${USER_BASE_URL}me`, {
          headers: {"Authorization": `Token ${res.data.token}`}
        })
          .then(res => {
            setUserSession(res.data as UserData);
            updateUser(new User(res.data as UserData));
            history.push("/");
          })
          .catch(() => {
            setLoginError("Could not retrieve token, please try again");
          });
      })
      .catch(() => {
        setLoginError("Invalid login, please try again");
      });
  };

  /**
   * Make a reauest to API to register a new user.
   * @param data User data to register.
   */
  const handleRegister = (data: {username: string, password: string}) => {
    axios.post(`${USER_BASE_URL}create`, data)
      .then(() => {
        handleLogin({username: data.username, password: data.password});
      })
      .catch(() => {
        setLoginError("Username is taken, please try a different one");
      });
  };

  return (
    <Fragment>
      <header className="col-md-8 mx-auto">
        <h1>{ tabKey === "login" ? "Login" : "Register" }</h1>
        { loginError ? <Alert variant="danger">{loginError}</Alert> : "" }
      </header>

      <Tabs
        className="col-md-8 mx-auto m-3"
        activeKey={tabKey}
        onSelect={(k) => setTabKey(String(k))}
      >
        <Tab eventKey="login" title="Login">
          <LoginForm handleLogin={ handleLogin } />
        </Tab>
        <Tab eventKey="register" title="Register">
          <RegisterForm handleRegister={ handleRegister } />
        </Tab>
      </Tabs>
    </Fragment>
  );
};

export default LoginPage;
