import StockData from "../types/StockData.type";

/** Stock model stored in API. */
class Stock {
  id: number;
  url: string;
  symbol: string;
  name: string;
  shares: number;
  dividendShares: number;
  dividendsPaid: number;
  averagePrice: number;
  currentPrice: number;
  averageYearsHeld: number;
  createdAt: Date;
  updatedAt: Date;

  /** Class constructor */
  constructor(data: StockData) {
    this.id = data.id;
    this.url = data.url;
    this.symbol = data.symbol;
    this.name = data.name;
    this.shares = Number(data.shares);
    this.dividendShares = Number(data.dividend_shares);
    this.dividendsPaid = Number(data.dividends_paid);
    this.averagePrice = Number(data.avg_price);
    this.averageYearsHeld = Number(data.avg_years_held);
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
    this.currentPrice = 0;
  }

  /**
   * Set the current market price for the symbol.
   * @param {number} newPrice - Today market price of stock.
   */
  setPrice(newPrice: number) {
    this.currentPrice = newPrice;
  }
}

export default Stock;
