import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

import BudgetDetails from "./BudgetDetails";
import Income from "../../models/Income.model";
import IncomeList from "./incomes/IncomeList";
import IncomeForm from "./incomes/IncomeForm";
import IncomeData from "../../types/IncomeData.type";
import Expense from "../../models/Expense.model";
import ExpenseList from "./expenses/ExpenseList";
import ExpenseForm from "./expenses/ExpenseForm";
import ExpenseData from "../../types/ExpenseData.type";
import GetResponse from "../../types/GetResponse.type";
import { INCOME_BASE_URL } from "../../constants";
import { EXPENSE_BASE_URL } from "../../constants";

/**
 * Render the budget page for allowing a user to add expenses and incomes
 * to a budget and view related details.
 * @returns Component for rendering budget page.
 */
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
  };

  /**
   * Remove an income by its ID.
   * @param id - The id of income to remove.
   */
  const removeIncomeById = (id: number) => {
    setIncomes(incomes.filter(income => income.id !== id));
  };

  /**
   * Add an Expense to the expenses list.
   * @param newExpense - The new expense to add.
   */
  const addExpense = (newExpense: Expense) => {
    setExpenses([...expenses, newExpense]);
  };

  /**
   * Remove an expense by its ID.
   * @param id - The id of expense to remove.
   */
  const removeExpenseById = (id: number) => {
    setExpenses(expenses.filter(income => income.id !== id));
  };

  return (
    <Tabs defaultActiveKey="budget">
      <Tab eventKey="budget" title="Budget">
          <BudgetDetails incomes={ incomes } expenses={ expenses } />
      </Tab>
      <Tab eventKey="incomes" title="Incomes">
        <IncomeForm addIncome={ addIncome } />
        <IncomeList incomes={ incomes } removeIncomeById={ removeIncomeById } />
      </Tab>
      <Tab eventKey="expenses" title="Expenses">
        <ExpenseForm addExpense={ addExpense } />
        <ExpenseList
          expenses={ expenses }
          removeExpenseById={ removeExpenseById } />
      </Tab>
    </Tabs>
  );
};

export default BudgetPage;
