import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser, loginUser } from "../actions/authAction";
import AlertMessage from "../components/Alert";

const LoginScreen = ({ history, location, match }) => {
  const dispatch = useDispatch();
  const {
    alert: { alerts },
  } = useSelector((state) => state);
  const [loginInfo, setLoginInfo] = useState({ name: "", password: "" });

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      dispatch(getUser(localStorage.getItem("authToken")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** handle email input */
  const handleEmailInput = (e) => {
    setLoginInfo({ ...loginInfo, email: e.target.value });
  };

  /** handle password input */
  const handlePasswordInput = (e) => {
    setLoginInfo({ ...loginInfo, password: e.target.value });
  };

  /** handle login submit */
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    /** posts login */
    dispatch(loginUser(loginInfo, history, location, match));
    // console.log(user.error);
    console.log("location", location);
    console.log("match", match);
    /** go to "/" */
    /** Better to do this inside the action-generator. */
    // history.push("/");
  };
  return (
    <div>
      <h1>SIGN IN</h1>
      {alerts &&
        alerts.map((alert, index) => (
          <Alert variant={alert.variant} key={index}>
            {alert.msg}
          </Alert>
        ))}
      <Form onSubmit={handleLoginSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            onChange={handleEmailInput}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={handlePasswordInput}
          ></Form.Control>
        </Form.Group>
        <Button variant="dark" type="submit" className="rounded-0">
          SIGN IN
        </Button>
      </Form>
      <p>
        New Customer? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginScreen;
