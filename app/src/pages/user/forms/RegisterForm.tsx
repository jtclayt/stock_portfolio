import { Alert, Button, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";

interface RegisterFormProps {
  handleRegister: (data: {username: string, password: string}) => void;
}

/**
 * Controls the display structure for the registration form for a new user.
 * @param props Contains data for making registration request.
 * @returns The registration form component.
 */
const RegisterForm : React.FC<RegisterFormProps> = ({ handleRegister }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    setIsPasswordValid(password === confirm);
  }, [password, confirm]);

  /**
   * Update the password for validation.
   * @param event The input event changing password value.
   */
  const updatePassword = (event: any) => {
    setPassword(event.currentTarget.value);
  };

  /**
   * Update the confirm password for validation.
   * @param event The input event changing confirm password value.
   */
  const updateConfirm = (event: any) => {
    setConfirm(event.currentTarget.value);
  };

  /**
   * Handle submitting the registration form.
   * @param event The event submitting the registration form.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      "username": event.currentTarget["username"].value,
      "first_name": event.currentTarget["first_name"].value,
      "last_name": event.currentTarget["last_name"].value,
      "password": event.currentTarget["password"].value
    };

    event.currentTarget.reset();
    setPassword("");
    setConfirm("");

    handleRegister(data);
  };

  return (
    <Form className="col-md-8 mx-auto mb-5" onSubmit={ handleSubmit }>
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
          <InputGroup.Text>First Name</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          name="first_name"
          aria-label="First name"
          maxLength={50} />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Last Name</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          name="last_name"
          aria-label="Last name"
          maxLength={50} />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Password</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          name="password"
          type="password"
          aria-label="Password"
          minLength={5}
          maxLength={50}
          onChange={updatePassword}
          isValid={isPasswordValid && password.length >= 5 }
          required />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Confirm Password</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          name="confirm_password"
          type="password"
          aria-label="Confirm password"
          minLength={5}
          maxLength={50}
          onChange={updateConfirm}
          isValid={isPasswordValid && confirm.length >= 5 }
          required />
      </InputGroup>

      { !isPasswordValid ? <Alert variant="danger">Passwords do not match.</Alert> : "" }

      <Row>
        <Button className="col-md-4 mx-auto" type="submit" variant="primary">Submit</Button>
      </Row>
    </Form>
  );
};

export default RegisterForm;
