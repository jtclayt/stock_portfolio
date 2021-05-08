import React, { Fragment } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";

import Income from "../../../models/Income.model";

interface IncomeListProps {
  incomes: Income[];
  removeIncomeById: (id: number) => void;
}

/**
 * List for displaying incomes for a user.
 * @param props Data for displaying incomes to the list.
 * @returns The list of incomes.
 */
const IncomeList : React.FC<IncomeListProps> = ({ incomes, removeIncomeById }) => {
  /**
   * Delete an income from the list.
   * @param income The income to be deleted.
   */
  const handleDelete = (income: Income) => {
    axios.delete(income.url)
      .then(() => removeIncomeById(income.id))
      .catch(err => console.log(err));
  };

  return (
    <Fragment>
      <h2>Income List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Monthly Amount</th>
            <th>Taxable</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            incomes.map((income, i) => {
              return (
                <tr key={i}>
                  <td>{ income.id }</td>
                  <td>{ income.description }</td>
                  <td>${ income.getMonthlyTotal().toFixed(2) }</td>
                  <td>{ (income.isTaxable) ? "Yes" : "No" }</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(income)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </Fragment>
  );
};

export default IncomeList;
