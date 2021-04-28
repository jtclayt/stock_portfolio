import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import BudgetPage from "./pages/budget/BudgetPage";
import HomePage from "./pages/home/HomePage";
import { getAuthToken } from "./auth/AuthToken";
import LoginPage from "./pages/user/LoginPage";
import PortfolioPage from "./pages/portfolio/PortfolioPage";
import ProfilePage from "./pages/user/ProfilePage";
import StocksPage from "./pages/stocks/StocksPage";
import User from "./models/User.model";

interface AppRouterProps {
  user: User | null;
  updateUser: (user: User) => void;
}

/**
 * Router controlling site navigation.
 * @param props Needed data for router to control navigation flow.
 * @returns The router with pages that can be accessed.
 */
const AppRouter : React.FC<AppRouterProps> = ({ user, updateUser }) => {
  const authToken = getAuthToken();
  const history = useHistory();

  useEffect(() => {
    if (!authToken) {
      history.push("/login");
    }
  }, [authToken, history, user]);

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/stocks" component={StocksPage} />
      <Route path="/budget" component={BudgetPage} />
      <Route path="/login">
        <LoginPage updateUser={ updateUser } />
      </Route>
    </Switch>
  );
};

export default AppRouter;
