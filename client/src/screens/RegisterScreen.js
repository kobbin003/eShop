import React, { useState } from "react";
import { Fragment } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../actions/alertAction";
import { registerUser } from "../actions/authAction";
import Profile from "../components/Profile";

const RegisterScreen = ({ history }) => {
  const {
    alert: { alerts },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  /** handle submit */
  /** this is how to pass multiple parameters with 'e' object */
  const handleSubmit = ({ name, email, password, confirmPassword }) => {
    // const { name, email, password } = registrationInfo;
    if (password === confirmPassword) {
      /** post registration */
      dispatch(registerUser(name, email, password, history));
      /** go to "/" */
      // history.push("/");
      // console.log({ name, email, password });
    } else {
      dispatch(setAlert("passwords does not match", "danger"));
    }
  };

  return (
    <Fragment>
      <h1>SIGN UP</h1>
      {/* {alerts &&
        alerts.map((alert,index) => (
          <Alert key={index} variant={alert.variant}>{alert.msg}</Alert>
        ))} */}
      <Profile handleSubmit={handleSubmit} componentType="REGISTER" />
      <p>
        Have an Account? <Link to="/login">Login</Link>
      </p>
    </Fragment>
  );
};

export default RegisterScreen;
