import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import PrivateRoute from "./components/HOC/PrivateRoute";

import { isUserLoggedIn, getInitialData } from "./actions";
import { Signup } from "./containers/Signup";

import NewPage from "./containers/newPage";
import Category from "./containers/category";
import { Products } from "./containers/products";
import Orders from "./containers/orders";
import Home from "./containers/Home";
import Signin from "./containers/Signin";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // components didMount and components DidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    } else if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [dispatch, auth.authenticate]);

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
