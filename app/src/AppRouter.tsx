import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import BudgetPage from "./pages/budget/BudgetPage";
import PortfolioPage from "./pages/portfolio/PortfolioPage";
import StocksPage from "./pages/stocks/StocksPage";

const AppRouter : React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={PortfolioPage} />
        <Route path="/stocks" component={StocksPage} />
        <Route path="/budget" component={BudgetPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
