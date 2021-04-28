import IncomeData from "../types/IncomeData.type";

/** Income data model in API. */
class Income {
  id: number;
  description: string;
  annualAmount: number;
  monthlyAmount: number;
  hourlyAmount: number;
  averageHoursWeek: number;
  isTaxable: boolean;
  url: string;
  createdAt: Date;
  updatedAt: Date;

  /** Class constructor */
  constructor(data: IncomeData) {
    this.id = data.id;
    this.description = data.description;
    this.annualAmount = Number(data.annual_amount);
    this.monthlyAmount = Number(data.monthly_amount);
    this.hourlyAmount = Number(data.hourly_amount);
    this.averageHoursWeek = Number(data.average_hours_week);
    this.isTaxable = data.is_taxable;
    this.url = data.url;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
  }

  /**
   * Get the monthly total of income.
   * @returns The monthly total.
   */
  getMonthlyTotal(): number {
    const MONTHS_IN_YEAR = 12;
    const WEEKS_IN_YEAR = 52;

    return this.monthlyAmount
      + this.annualAmount / MONTHS_IN_YEAR
      + this.hourlyAmount * this.averageHoursWeek * WEEKS_IN_YEAR / MONTHS_IN_YEAR;
  }

  /**
   * Get the annual total for income.
   * @returns The annual total.
   */
  getAnnualTotal(): number {
    const MONTHS_IN_YEAR = 12;
    const WEEKS_IN_YEAR = 52;

    return this.annualAmount
      + this.monthlyAmount * MONTHS_IN_YEAR
      + this.hourlyAmount * this.averageHoursWeek * WEEKS_IN_YEAR;
  }
}

export default Income;
