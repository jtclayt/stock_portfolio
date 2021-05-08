import axios from "axios";

import { TD_MARKET_DATA_URL } from "../constants";
import TDQuoteData from "../types/TDA/TDQuoteData";


/**
 * This client is for connecting to the TD Ameritrade developer API.
 * In order to user this an API key is needed by registering an app on:
 * https://developer.tdameritrade.com/
 * That key then needs to be provided in app.env for the docker container.
 */
class TDAClient {
  private apikey: string;

  /** Class constructor */
  constructor() {
    const apikey = process.env.REACT_APP_TD_CLIENT_KEY;

    if (apikey) {
      this.apikey = apikey;
    } else {
      throw new Error("TD Ameritrade API key not configured");
    }
  }

  /**
   * Method for getting a current price quote for symbol.
   * @param {string} symbol The symbol to get a quote for.
   * @return {Promise<number>} Latest price available.
   */
  async getQuoteAsync(symbol: string): Promise<number> {
    symbol = symbol.toUpperCase();
    const url = `${TD_MARKET_DATA_URL}/${symbol}/quotes?apikey=${this.apikey}`;

    return new Promise<number>(resolve => {
      axios.get(url)
        .then(res => {
          if (symbol in res.data) {
            resolve((res.data[symbol] as TDQuoteData).lastPrice);
          }
          resolve(0);
        });
    });
  }

  /**
   * Method for getting a name for symbol.
   * @param {string} symbol The symbol to get a quote for.
   * @return {Promise<string>} Latest price available.
   */
   async getNameAsync(symbol: string): Promise<string> {
    symbol = symbol.toUpperCase();
    const url = `${TD_MARKET_DATA_URL}/${symbol}/quotes?apikey=${this.apikey}`;

    return new Promise<string>(resolve => {
      axios.get(url)
        .then(res => {
          if (symbol in res.data) {
            resolve((res.data[symbol] as TDQuoteData).description);
          }
          resolve("");
        });
    });
  }
}

export default TDAClient;
