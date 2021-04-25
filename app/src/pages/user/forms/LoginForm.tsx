import { Button, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import React from "react";

interface LoginFormProps {
  handleLogin: (data: {username: string, password: string}) => void;
}

const LoginForm : React.FC<LoginFormProps> = ({ handleLogin }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      "username": event.currentTarget["username"].value,
      "password": event.currentTarget["password"].value
    };

    event.currentTarget.reset();

    handleLogin(data);
  };

  return (
    <Form className="col-md-8 mx-auto mb-5" onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Username</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          name="username"
          aria-label="Username"
          maxLength={50}
          required />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Password</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          name="password"
          type="password"
          aria-label="Password"
          maxLength={50}
          required />
      </InputGroup>

      <Row>
        <Button className="col-md-4 mx-auto" type="submit" variant="primary">Submit</Button>
      </Row>
    </Form>
  );
}

export default LoginForm;
