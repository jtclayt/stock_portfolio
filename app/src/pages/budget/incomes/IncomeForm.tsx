import axios from "axios";
import { Button, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import React from "react";

import { INCOME_BASE_URL } from "../../../constants";
import Income from "../../../models/Income.model";
import IncomeData from "../../../types/IncomeData.type";

interface IncomeFormProps {
  addIncome: (newIncome: Income) => void;
}

/**
 * Form for adding a new income.
 * @param props Data for adding new incomes.
 * @returns Form for adding a new income.
 */
const IncomeForm : React.FC<IncomeFormProps> = ({ addIncome }) => {
  /**
   * Submit form the make a request for a new income.
   * @param event Form submit event with data for new income.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      "description": event.currentTarget["description"].value,
      "annual_amount": Number(event.currentTarget["annual_amount"].value),
      "monthly_amount": Number(event.currentTarget["monthly_amount"].value),
      "hourly_amount": Number(event.currentTarget["hourly_amount"].value),
      "average_hours_week": Number(event.currentTarget["average_hours_week"].value),
      "is_taxable": event.currentTarget["is_taxable"].checked
    };

    event.currentTarget.reset();

    axios.post(INCOME_BASE_URL, data)
      .then(res => {
        addIncome(new Income(res.data as IncomeData));
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <Form className="col-md-8 mx-auto mb-5" onSubmit={handleSubmit}>
      <h2>Add new income:</h2>

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
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Hourly Amount</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="hourly_amount"
              type="number"
              aria-label="Hourly wage"
              max="9999999.99"
              min="0"
              step="0.01"
              required />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Average Weekly Hours</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="average_hours_week"
              type="number"
              aria-label="Average weekly work hours"
              max="9999999.99"
              min="0"
              step="0.01"
              required />
          </InputGroup>
        </Col>
      </Row>

        <InputGroup className="mb-3 mx-auto">
          <InputGroup.Prepend>
            <InputGroup.Checkbox name="is_taxable" aria-label="This income is taxable" />
          </InputGroup.Prepend>
          <InputGroup.Text>Income is taxable</InputGroup.Text>
        </InputGroup>

      <Row>
        <Button className="col-md-4 mx-auto" type="submit" variant="primary">Submit</Button>
      </Row>
    </Form>
  );
};

export default IncomeForm;
