interface StockData {
  id: number;
  url: string;
  symbol: string;
  name: string;
  shares: number;
  dividend_shares: number;
  dividends_paid: number;
  avg_price: number;
  avg_years_held: number;
  created_at: string;
  updated_at: string;
}

export default StockData;
