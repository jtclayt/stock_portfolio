import React, { Fragment } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";

import Expense from "../../../types/Expense.type";

interface ExpenseListProps {
  expenses: Expense[];
  removeExpenseById: (id: number) => void;
}

const ExpenseList : React.FC<ExpenseListProps> = ({ expenses, removeExpenseById }) => {
  const handleDelete = (expense: Expense) => {
    axios.delete(expense.url)
      .then(() => removeExpenseById(expense.id))
      .catch(err => console.log(err));
  }

  return (
    <Fragment>
      <h2>Expense List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Monthly Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense, i) => {
              return (
                <tr key={i}>
                  <td>{ expense.id }</td>
                  <td>{ expense.description }</td>
                  <td>${ expense.getMonthlyTotal().toFixed(2) }</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(expense)}>
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
}

export default ExpenseList;
