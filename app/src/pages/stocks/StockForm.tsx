import axios from "axios";
import { Alert, Button, Form, FormControl, InputGroup } from "react-bootstrap";
import React, { Fragment, useState } from "react";

import { API_URL } from "../../constants";
import { getAuthHeaders } from "../../auth/AuthToken";
import TDAClient from "../../clients/TDAClient";
import Stock from "../../models/Stock.model";
import StockData from "../../types/StockData.type";

interface StockFormProps {
  addStock: (newStock: Stock) => void;
  tdClient: TDAClient;
}

const StockForm : React.FC<StockFormProps> = ({ addStock, tdClient }) => {
  const STOCKS_BASE_URL = `${API_URL}/invest/stocks/`;
  const [symbol, setSymbol] = useState("");
  const [isSymbolInvalid, setIsSymbolInvalid] = useState(false);

  /**
   * Handle submitting the symbol to make request to add stock.
   * @param event The form event that is submitting.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    tdClient.getNameAsync(symbol).then(symbolName => {
      if (symbolName) {
        const data = {
          "symbol": symbol,
          "name": symbolName,
          "transactions": []
        };
        setIsSymbolInvalid(false);
        setSymbol("");

        axios.post(STOCKS_BASE_URL, data, getAuthHeaders())
          .then(res => {
            addStock(new Stock(res.data as StockData));
          })
          .catch(err => {
            console.dir(err);
            console.error(err);
          });
      } else {
        setIsSymbolInvalid(true);
      }
    });
  };

  /**
   * Update the symbol being added.
   * @param event The input event making changes.
   */
  const updateSymbol = (event: any) => {
    setSymbol(event.currentTarget.value);
  };

  return (
    <Fragment>
      <h2>Add a new symbol</h2>
      <Form className="col-md-8 mx-auto mb-5" onSubmit={handleSubmit}>
        { (isSymbolInvalid) ? <Alert variant="danger">Symbol not valid.</Alert> : "" }
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Stock Symbol</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={symbol}
            onChange={updateSymbol}
            name="symbol"
            aria-label="Stock symbol"
            maxLength={8}
            required />
          <InputGroup.Append>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </Fragment>
  );
};

export default StockForm;
