import React, { Fragment } from "react";
import { Table } from "react-bootstrap";

import Stock from "../../models/Stock.model";
import NotFound from "../error/NotFound";

interface StockDetailProps {
  stock: Stock;
}

const StockDetail : React.FC<StockDetailProps> = ({ stock }) => {
  const gain = (stock.currentPrice - stock.averagePrice) * stock.shares;
  const overallReturn = (stock.averagePrice) ? stock.currentPrice / stock.averagePrice - 1 : 0;
  const annualReturn = (stock.averageYearsHeld) ? overallReturn / stock.averageYearsHeld : 0;

  return (
    (stock)
      ? <Fragment>
          <h2>{stock.name}</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Stat</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Average Cost</td>
                <td>${stock.averagePrice.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Current Price</td>
                <td>${stock.currentPrice.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Years Held</td>
                <td>{stock.averageYearsHeld}</td>
              </tr>
              <tr>
                <td>Unrealized Profits</td>
                <td>${gain.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Overall Return</td>
                <td>{overallReturn.toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Annualized Return</td>
                <td>{annualReturn.toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Dividends Paid</td>
                <td>${stock.dividendsPaid.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Dividend Shares</td>
                <td>{stock.dividendShares}</td>
              </tr>
            </tbody>
          </Table>
        </Fragment>
      : <NotFound />
  );
};

export default StockDetail;
