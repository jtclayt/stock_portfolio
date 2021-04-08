interface Transaction {
  sharesTraded: number,
  tradePrice: number,
  isBuy: boolean,
  tradeDate: Date,
  stock: number,
  createdAt: Date,
  updatedAt: Date
}

export default Transaction;
