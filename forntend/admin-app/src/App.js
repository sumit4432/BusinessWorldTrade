import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import PrivateRoute from "./components/HOC/PrivateRoute";

import { isUserLoggedIn, getInitialData } from "./actions";
import { Signin } from "./containers/Signin";
import { Signup } from "./containers/Signup";

import NewPage from "./containers/newPage";
import Category from "./containers/category";
import { Products } from "./containers/products";
import Orders from "./containers/orders";
import Home from "./containers/Home";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // Load user authentication status and initial data on app mount/update
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    } else {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/page" component={NewPage} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
      </Switch>
    </div>
  );
};

export default App;
