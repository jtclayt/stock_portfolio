import axios from "axios";
import React from "react";
import { Button, Form, FormControl, InputGroup, Row } from "react-bootstrap";

import { EXPENSE_BASE_URL } from "../../../constants";
import Expense from "../../../models/Expense.model";
import ExpenseData from "../../../types/ExpenseData.type";

interface ExpenseFormProps {
  addExpense: (newIncome: Expense) => void;
}

/**
 * Form for adding a new expense to the list.
 * @param props Data for adding a new expense.
 * @returns Form for requesting a new event.
 */
const ExpenseForm : React.FC<ExpenseFormProps> = ({ addExpense }) => {
  /**
   * Submit the data from the form for a new expense.
   * @param event Submit event from expense form.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      "description": event.currentTarget["description"].value,
      "annual_amount": Number(event.currentTarget["annual_amount"].value),
      "monthly_amount": Number(event.currentTarget["monthly_amount"].value)
    };

    event.currentTarget.reset();

    axios.post(EXPENSE_BASE_URL, data)
      .then(res => {
        addExpense(new Expense(res.data as ExpenseData));
      })
      .catch(err => console.log(err));
  };

  return (
    <Form className="col-md-8 mx-auto mb-5" onSubmit={handleSubmit}>
      <h2>Add new expense:</h2>

      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Description</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          name="description"
          aria-label="Description"
          maxLength={255}
          required />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Annual Amount</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          name="annual_amount"
          type="number"
          aria-label="Annual income"
          max="9999999.99"
          min="0"
          step="0.01"
          required />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Monthly Amount</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          name="monthly_amount"
          type="number"
          aria-label="Monthly income"
          max="9999999.99"
          min="0"
          step="0.01"
          required />
      </InputGroup>

      <Row>
        <Button className="col-md-4 mx-auto" type="submit" variant="primary">Submit</Button>
      </Row>
    </Form>
  );
};

export default ExpenseForm;
