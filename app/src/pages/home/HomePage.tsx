import React, { Fragment } from "react";
import { getUserSession } from "../../auth/User";

const HomePage : React.FC = () => {
  const user = getUserSession();

  return (
    <Fragment>
      <header>
        <h1>Home Page!</h1>
        <h2>Hi, { user?.displayName() }</h2>
      </header>
    </Fragment>
  );
};

export default HomePage;
