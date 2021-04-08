import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

import { API_URL } from "../../constants";
import Stock from "../../types/Stock.type";
import StockData from "../../types/StockData.type";
import GetResponse from "../../types/GetResponse.type";

const StocksPage : React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const STOCKS_BASE_URL = `${API_URL}/invest/stocks`

  useEffect(() => {
    axios.get(STOCKS_BASE_URL)
      .then((res: GetResponse<StockData>) => {
        setStocks(res.data.results.map((data: StockData) => new Stock(data)));
      }).catch(err => console.log(err));
  }, [STOCKS_BASE_URL]);

  return (
    <Fragment>
      <header>Stocks!</header>
    </Fragment>
  );
}

export default StocksPage;
