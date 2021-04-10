import React, { Fragment, useState } from "react";
import { Form, FormControl, InputGroup, Table } from "react-bootstrap";

import Income from "../../models/Income.model";
import Expense from "../../models/Expense.model";
import TaxRateCalculator from "../../helpers/TaxRateCalculator";
import GetTimePeriods from "../../helpers/GetTimePeriods";

interface BudgetDetailsProps {
  incomes: Income[];
  expenses: Expense[];
}

const BudgetDetails: React.FC<BudgetDetailsProps> = ({ incomes, expenses }) => {
  let taxableIncome = 0;
  let untaxableIncome = 0;
  let effectiveTaxRate = 0;
  let taxOwed = 0;
  let netTaxableIncome = 0;
  let totalExpenses = 0;
  const [saveRate, setSaveRate] = useState(30);
  const currencyOptions = {
    style: "currency",
    currency: "USD"
  }

  incomes.forEach(income => {
    if (income.isTaxable) {
      taxableIncome += income.getAnnualTotal();
    } else {
      untaxableIncome += income.getAnnualTotal();
    }
  });

  totalExpenses = expenses.reduce((acc, expense) => {
    return acc += expense.getAnnualTotal();
  }, 0);

  effectiveTaxRate = TaxRateCalculator(taxableIncome);
  taxOwed = taxableIncome * effectiveTaxRate;
  netTaxableIncome = taxableIncome - taxOwed;

  const [semiMonthlyIncome, monthlyIncome, annualIncome] = GetTimePeriods(
    netTaxableIncome + untaxableIncome
  );
  const [semiMonthlySavings, monthlySavings, annualSavings] = GetTimePeriods(
    annualIncome * saveRate / 100
  );
  const [semiMonthlyExpenses, monthlyExpenses, annualExpenses] = GetTimePeriods(
    totalExpenses
  );
  const [semiMonthlyRemainder, monthlyRemainder, annualRemainder] = GetTimePeriods(
    annualIncome - annualSavings - annualExpenses
  );

  return (
    <Fragment>
      <h1>Budget Details</h1>

      <h2>Income Summary (Effective Tax Rate: {(effectiveTaxRate * 100).toFixed(1)}%)</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Taxable</th>
            <th>Non Taxable</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Gross</th>
            <td>{ taxableIncome.toLocaleString("en", currencyOptions) }</td>
            <td>{ untaxableIncome.toLocaleString("en", currencyOptions) }</td>
          </tr>
          <tr>
            <th>Taxes</th>
            <td>{ taxOwed.toLocaleString("en", currencyOptions) }</td>
            <td>$0.00</td>
          </tr>
          <tr>
            <th>Net</th>
            <td>{ netTaxableIncome.toLocaleString("en", currencyOptions) }</td>
            <td>{ untaxableIncome.toLocaleString("en", currencyOptions) }</td>
          </tr>
        </tbody>
      </Table>

      <h2>Projected</h2>
      <Form className="col-md-8 mx-auto">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Save Rate (%)</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Save rate"
            value={saveRate}
            onChange={(e) => setSaveRate(Number(e.currentTarget.value))}
            type="number"
            max="100"
            min="0"
            step="0.1" />
        </InputGroup>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Semi Monthly</th>
            <th>Monthly</th>
            <th>Annual</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Income</th>
            <td>{ semiMonthlyIncome.toLocaleString("en", currencyOptions) }</td>
            <td>{ monthlyIncome.toLocaleString("en", currencyOptions) }</td>
            <td>{ annualIncome.toLocaleString("en", currencyOptions) }</td>
          </tr>
          <tr>
            <th>Saving</th>
            <td>{ semiMonthlySavings.toLocaleString("en", currencyOptions) }</td>
            <td>{ monthlySavings.toLocaleString("en", currencyOptions) }</td>
            <td>{ annualSavings.toLocaleString("en", currencyOptions) }</td>
          </tr>
          <tr>
            <th>Expenses</th>
            <td>{ semiMonthlyExpenses.toLocaleString("en", currencyOptions) }</td>
            <td>{ monthlyExpenses.toLocaleString("en", currencyOptions) }</td>
            <td>{ annualExpenses.toLocaleString("en", currencyOptions) }</td>
          </tr>
          <tr>
            <th>Remaining</th>
            <td>{ semiMonthlyRemainder.toLocaleString("en", currencyOptions) }</td>
            <td>{ monthlyRemainder.toLocaleString("en", currencyOptions) }</td>
            <td>{ annualRemainder.toLocaleString("en", currencyOptions) }</td>
          </tr>
        </tbody>
      </Table>
    </Fragment>
  )
}

export default BudgetDetails;
