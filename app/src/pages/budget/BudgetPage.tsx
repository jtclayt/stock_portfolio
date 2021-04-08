import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";

import Income from "../../types/Income.type";
import IncomeList from "./incomes/IncomeList";
import IncomeForm from "./incomes/IncomeForm";
import IncomeData from "../../types/IncomeData.type";
import Expense from "../../types/Expense.type";
import ExpenseList from "./expenses/ExpenseList";
import ExpenseForm from "./expenses/ExpenseForm";
import ExpenseData from "../../types/ExpenseData.type";
import GetResponse from "../../types/GetResponse.type";
import { INCOME_BASE_URL } from "../../constants";
import { EXPENSE_BASE_URL } from "../../constants";

const BudgetPage : React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    axios.get(INCOME_BASE_URL)
      .then((res: GetResponse<IncomeData>) => {
        setIncomes(
          res.data.results.map((data: IncomeData) => new Income(data))
        );
      }).catch(err => console.log(err));
    axios.get(EXPENSE_BASE_URL)
      .then((res: GetResponse<ExpenseData>) => {
        setExpenses(
          res.data.results.map((data: ExpenseData) => new Expense(data))
        );
      }).catch(err => console.log(err));
  }, []);

  /**
   * Add an income to the incomes list.
   * @param newIncome - The new income to add.
   */
  const addIncome = (newIncome: Income) => {
    setIncomes([...incomes, newIncome]);
  }

  /**
   * Remove an income by its ID.
   * @param id - The id of income to remove.
   */
  const removeIncomeById = (id: number) => {
    setIncomes(incomes.filter(income => income.id !== id));
  }

  /**
   * Add an Expense to the expenses list.
   * @param newExpense - The new expense to add.
   */
  const addExpense = (newExpense: Expense) => {
    setExpenses([...expenses, newExpense]);
  }

  /**
   * Remove an expense by its ID.
   * @param id - The id of expense to remove.
   */
  const removeExpenseById = (id: number) => {
    setExpenses(incomes.filter(income => income.id !== id));
  }

  return (
    <Tabs defaultActiveKey="budget">
      <Tab eventKey="budget" title="Budget">
          <h1>Budget Details</h1>
      </Tab>
      <Tab eventKey="incomes" title="Incomes">
        <IncomeList incomes={ incomes } removeIncomeById={ removeIncomeById } />
        <IncomeForm addIncome={ addIncome } />
      </Tab>
      <Tab eventKey="expenses" title="Expenses">
        <ExpenseList expenses={ expenses } removeExpenseById={ removeExpenseById } />
        <ExpenseForm />
      </Tab>
    </Tabs>
  );
}

export default BudgetPage;
