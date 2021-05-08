import axios from "axios";
import React, { Fragment } from "react";
import { Button, Table } from "react-bootstrap";

import { getAuthHeaders } from "../../auth/AuthToken";
import Stock from "../../models/Stock.model";

interface StockListProps {
  stocks: Stock[];
  removeStockById: (id: number) => void;
  goToStockDetail: (stock: Stock) => void;
}

/**
 * Render the list of stocks for a given user.
 * @returns Component for displaying stock list.
 */
const StockList : React.FC<StockListProps> = ({ stocks, removeStockById, goToStockDetail }) => {
  /**
   * Delete an stock from the list.
   * @param stock The stock to be deleted.
   */
   const handleDelete = (stock: Stock) => {
    axios.delete(stock.url, getAuthHeaders())
      .then(() => removeStockById(stock.id))
      .catch(err => console.log(err));
  };

  return (
    <Fragment>
      <h2>Stock List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Shares</th>
            <th>Average Price</th>
            <th>Current Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            stocks.map((stock, i) => {
              return (
                <tr key={i}>
                  <td>{ stock.symbol }</td>
                  <td>{ stock.name }</td>
                  <td>{ stock.shares.toFixed(2) }</td>
                  <td>${ stock.averagePrice.toFixed(2) }</td>
                  <td>${ stock.currentPrice.toFixed(2) }</td>
                  <td>
                    <Button variant="primary" onClick={() => goToStockDetail(stock)}>
                      View
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(stock)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </Fragment>
  );
};

export default StockList;
