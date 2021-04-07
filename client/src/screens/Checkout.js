import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import React from "react";
import { Fragment } from "react";
import CheckoutSteps from "./CheckoutSteps";
import LoginScreen from "./LoginScreen";
import PaymentScreen from "./PaymentScreen";
import ShippingScreen from "./ShippingScreen";
import store from "../store/store";

const Checkout = ({ match: { path } }) => {
  const state = store.getState();
  return (
    <Fragment>
      <Router>
        <CheckoutSteps />
        <Switch>
          {/* <Route path="/">
            {state.authUser.user.token ? (
              <Redirect to="/checkout/shipping" />
            ) : (
              <LoginScreen />
            )}
          </Route>
          {/* <Route path="/checkout/login" component={LoginScreen} /> */}
          <Route path={`${path}/shipping`} component={ShippingScreen} />
          {/* <Route path={`${path}/login`} component={LoginScreen} /> */}
          <Route path={`${path}/payment`} component={PaymentScreen} /> */}
        </Switch>
      </Router>
    </Fragment>
  );
};

export default Checkout;
