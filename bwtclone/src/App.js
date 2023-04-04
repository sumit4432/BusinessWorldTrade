import React from "react";
import Home from "./containers/HomePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
