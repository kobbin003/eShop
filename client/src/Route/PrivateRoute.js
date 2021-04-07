import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, NavLink, Link, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useSelector((state) => state);

  // if (authUser.user.token) {
  //   return <Route component={Component} {...rest} />;
  // } else {
  //   return <Redirect to="/login" />;
  // }

  /** OR */
  /** this wont work because we cannot pass props to the component
   * Therefore use render
   */
  // return (
  //   <Route {...rest}>
  //     {authUser.user.token ? (
  //       <Component {...props} />
  //     ) : (
  //       <Redirect to="/login" />
  //     )}
  //   </Route>
  // );

  /** OR */
  return (
    <Route
      {...rest}
      /** render is required to pass the props to the component */
      render={(props) =>
        authUser.user.token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;

/** PrivateRoute should be preferred over  "inline-route-protection"
 * BECAUSE we cannot enjoy state updation in the later case.
 */
