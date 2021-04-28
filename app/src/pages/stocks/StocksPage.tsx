import React, { useState, Fragment } from "react";
import { Button, Form, FormControl, InputGroup, Row } from "react-bootstrap";
// import axios from "axios";

// import { API_URL } from "../../constants";
// import GetResponse from "../../types/GetResponse.type";
// import Stock from "../../models/Stock.model";
// import StockData from "../../types/StockData.type";
import TDAClient from "../../clients/TDAClient";

const StocksPage : React.FC = () => {
  const [symbol, setSymbol] = useState("");
  const [quote, setQuote] = useState(0);
  const [isResultShowing, setIsResultShowing] = useState(false);
  // const [stocks, setStocks] = useState<Stock[]>([]);
  // const STOCKS_BASE_URL = `${API_URL}/invest/stocks`;
  const tdClient = new TDAClient();

  // useEffect(() => {
  //   axios.get(STOCKS_BASE_URL)
  //     .then((res: GetResponse<StockData>) => {
  //       setStocks(res.data.results.map((data: StockData) => new Stock(data)));
  //     }).catch(err => console.log(err));
  // }, [symbol, STOCKS_BASE_URL]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();

    tdClient.getQuoteAsync(symbol).then(lastQuote => {
      setQuote(lastQuote);
      setIsResultShowing(true);
    });
  };

  const updateSymbol = (event: any) => {
    setIsResultShowing(false);
    setSymbol(event.currentTarget.value);
  };

  return (
    <Fragment>
      <header>
        <h1>Stocks Page!</h1>
      </header>
      <Form className="col-md-8 mx-auto mb-5" onSubmit={handleSubmit}>
        <Row>
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
        </InputGroup>
          <Button className="col-md-4 mx-auto" type="submit" variant="primary">Submit</Button>
        </Row>
      </Form>
      <div>
        { (isResultShowing)
            ? (quote)
              ? <h2>Last price for {symbol.toUpperCase()} was {quote}</h2>
              : <h2>{symbol.toUpperCase()} does not exist.</h2>
            : ''
        }
      </div>
    </Fragment>
  );
};

export default StocksPage;
