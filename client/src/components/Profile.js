import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/authAction";

const Profile = ({ handleSubmit, componentType }) => {
  const { authUser } = useSelector((state) => state);
  const [profileInfo, setProfileInfo] = useState({
    name: authUser.user.name ? authUser.user.name : "",
    email: authUser.user.email ? authUser.user.email : "",
    // name: "",
    // email: "",
    password: "",
    confirmPassword: "",
  });

  /** destructuring profileInfo */
  const { name, email, password, confirmPassword } = profileInfo;

  /** handle input change */
  const handleInputChange = (e) => {
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: e.target.value,
    });
  };
  /** handleSubmit */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(profileInfo);
  };
  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={handleInputChange}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleInputChange}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handleInputChange}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={handleInputChange}
        ></Form.Control>
      </Form.Group>
      <Button type="submit">{componentType}</Button>
    </Form>
  );
};

export default Profile;
