# Stock Portfolio Tracker

This is a Django, React, and MySQL application for tracking investments, budgets,
and other personal finance goals. This app is still early in development.


## Planned features:
- View total stock holding information based on transactions
- View overall portfolio information based on stocks, graph and summary
- Connect to live stock data for up to date returns
- Set up a desired porfolio distribution that will allow a user to put in
a total amount they would like to invest which will show what amount they need
to buy in each stock to meet distribution
- Create a budget, keeping track of monthly income and expenses
- Track net worth with monthly reports and view graph of completed reports


## To use
1. Clone the repo
2. Will need docker and docker-compose installed
3. Rename files in env folder to just api.env, app.env, and mysql.env, feel free to add
your own passwords, secret keys, etc
4. Run in terminal: docker-compose up app (If this errors may need to try a second time)
5. React app will be on http://localhost:3000 and Django api will be on
http://localhost:8000


## Other Info
- This app uses the TD Ameritrade Developer API (https://developer.tdameritrade.com/)
- To set it up locally you will need to make an account and register an app.
- Once registered place your API key in the app.env file before building docker images.


### Other other stuff
- I update this only intermittenly.
- There is no logical order to what I work on. I'm just here to have fun.
