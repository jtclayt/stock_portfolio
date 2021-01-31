import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './constants';
// import { Router } from '@reach-router';
import NavBar from './components/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

type Stock = {
  id: number;
  url: string;
  symbol: string;
  company: string;
  description: string;
  created_at: string;
  updated_at: string;
}

function App() {
  const [stocks, setStocks] = useState([]);
  const STOCKS_URL = `${API_URL}/stocks`

  useEffect(() => {
    axios.get(STOCKS_URL)
      .then(res => {
        setStocks(
          res.data.results.map((stock: Stock, i: number) => {
            return (
              <div key={ i }>
                <h1>{ stock.symbol }: { stock.company }</h1>
                <h2>{ (new Date(stock.created_at)).toLocaleDateString() }</h2>
              </div>
            );
          })
        );
      })
      .catch(err => console.log(err));
  }, [STOCKS_URL]);

  return (
    <div className="App">
      <NavBar />
      {stocks}
    </div>
  );
}

export default App;
