import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, NavLink, Link, Redirect } from "react-router-dom";

export const PrivateRouteInside = ({ component, ...props }) => {
  const { authUser } = useSelector((state) => state);
  if (authUser.user.token) {
    return <Redirect to="/" />;
  } else {
    return <Route component={component} {...props} />;
  }
};

export default PrivateRouteInside;
