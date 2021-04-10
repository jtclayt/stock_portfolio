import ExpenseData from "./ExpenseData.type";

class Expense {
  id: number;
  description: string;
  annualAmount: number;
  monthlyAmount: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: ExpenseData) {
    this.id = data.id;
    this.description = data.description;
    this.annualAmount = Number(data.annual_amount);
    this.monthlyAmount = Number(data.monthly_amount);
    this.url = data.url;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
  }

  getMonthlyTotal() {
    const MONTHS_IN_YEAR = 12;
    return this.monthlyAmount + this.annualAmount / MONTHS_IN_YEAR;
  }

  getAnnualTotal() {
    const MONTHS_IN_YEAR = 12;
    return this.monthlyAmount * MONTHS_IN_YEAR + this.annualAmount;
  }
}

export default Expense;
