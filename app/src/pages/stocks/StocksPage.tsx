import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

import { API_URL } from "../../constants";
import GetResponse from "../../types/GetResponse.type";
import { getAuthHeaders } from "../../auth/AuthToken";
import Stock from "../../models/Stock.model";
import StockData from "../../types/StockData.type";
import StockForm from "./StockForm";
import StockList from "./StockList";
import TDAClient from "../../clients/TDAClient";

const StocksPage : React.FC = () => {
  const STOCKS_BASE_URL = `${API_URL}/invest/stocks/`;
  const [stocks, setStocks] = useState<Stock[]>([]);
  const tdClient = new TDAClient();

  useEffect(() => {
    axios.get(STOCKS_BASE_URL, getAuthHeaders())
      .then((res: GetResponse<StockData>) => {
        // For each stock retrieved pull up last market quote
        Promise.all(res.data.results.map(async (data: StockData) => {
          const newStock = new Stock(data);
          newStock.currentPrice = await tdClient.getQuoteAsync(newStock.symbol);
          return newStock;
        })).then(stocksWithPrice => {
          setStocks(stocksWithPrice);
        });
      }).catch(err => console.log(err));
  }, [STOCKS_BASE_URL]);

  /**
   * Add a new stock to the list.
   * @param newStock - The new stock to add.
   */
  const addStock = async (newStock: Stock) => {
    newStock.currentPrice = await tdClient.getQuoteAsync(newStock.symbol);
    setStocks([...stocks, newStock]);
  };

  /**
   * Remove an income by its ID.
   * @param id - The id of income to remove.
   */
   const removeStockById = (id: number) => {
    setStocks(stocks.filter(stock => stock.id !== id));
  };

  return (
    <Fragment>
      <header>
        <h1>Your Stock Holdings</h1>
      </header>
      <StockForm addStock={ addStock } tdClient={ tdClient } />
      <StockList stocks={ stocks } removeStockById={ removeStockById } />
    </Fragment>
  );
};

export default StocksPage;
