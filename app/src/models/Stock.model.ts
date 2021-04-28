import StockData from "../types/StockData.type";

/** Stock model stored in API. */
class Stock {
  id: number;
  url: string;
  symbol: string;
  company: string;
  shares: number;
  dividendShares: number;
  dividendsPaid: number;
  averagePrice: number;
  averageYearsHeld: number;
  createdAt: Date;
  updatedAt: Date;

  /** Class constructor */
  constructor(data: StockData) {
    this.id = data.id;
    this.url = data.url;
    this.symbol = data.symbol;
    this.company = data.company;
    this.shares = Number(data.shares);
    this.dividendShares = Number(data.dividend_shares);
    this.dividendsPaid = Number(data.dividends_paid);
    this.averagePrice = Number(data.average_price);
    this.averageYearsHeld = Number(data.average_years_held);
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
  }
}

export default Stock;
