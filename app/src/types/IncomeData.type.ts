interface IncomeData {
  id: number;
  description: string;
  annual_amount: number;
  monthly_amount: number;
  hourly_amount: number;
  average_hours_week: number;
  is_taxable: boolean;
  url: string;
  created_at: string;
  updated_at: string;
}

export default IncomeData;
