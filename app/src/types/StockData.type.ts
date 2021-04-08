interface StockData {
  id: number;
  url: string;
  symbol: string;
  company: string;
  shares: number;
  dividend_shares: number;
  dividends_paid: number;
  average_price: number;
  average_years_held: number;
  created_at: string;
  updated_at: string;
}

export default StockData;
