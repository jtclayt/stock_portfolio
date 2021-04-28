import ExpenseData from "../types/ExpenseData.type";

/** Model for expenses. */
class Expense {
  id: number;
  description: string;
  annualAmount: number;
  monthlyAmount: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;

  /** Class constructor */
  constructor(data: ExpenseData) {
    this.id = data.id;
    this.description = data.description;
    this.annualAmount = Number(data.annual_amount);
    this.monthlyAmount = Number(data.monthly_amount);
    this.url = data.url;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
  }

  /**
   * Get the monthly total of the expense.
   * @returns The monthly total.
   */
  getMonthlyTotal(): number {
    const MONTHS_IN_YEAR = 12;
    return this.monthlyAmount + this.annualAmount / MONTHS_IN_YEAR;
  }

  /**
   * Get the annual total of the expense.
   * @returns The annual total.
   */
  getAnnualTotal(): number {
    const MONTHS_IN_YEAR = 12;
    return this.monthlyAmount * MONTHS_IN_YEAR + this.annualAmount;
  }
}

export default Expense;
