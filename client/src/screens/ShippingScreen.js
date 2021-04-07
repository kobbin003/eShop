import React, { useState } from "react";
import { Fragment } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { saveShippingAddress } from "../actions/cartAction";
import CheckoutSteps from "./CheckoutSteps";

const ShippingScreen = () => {
  const history = useHistory();
  /** getting te saved address parameters */
  const {
    shippingAddress: {
      address: defaultAddr,
      city: defaultCity,
      postalCode: defaultPostalCode,
      country: defaultCountry,
    },
  } = useSelector((state) => state.cart);
  /** if address saved, then set the value 'or else' keep it empty */
  const [shippingAddress, setShippingAddress] = useState({
    address: defaultAddr ? defaultAddr : "",
    city: defaultCity ? defaultCity : "",
    postalCode: defaultPostalCode ? defaultPostalCode : "",
    country: defaultCountry ? defaultCountry : "",
  });
  /** destructuring of shippingAddress */
  const { address, city, postalCode, country } = shippingAddress;
  /** handle input change */
  const handleInputChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();
  /** handleSubmit */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(shippingAddress));

    /** go to payment screen */
    history.push("/payment");
    // console.log(history);
  };
  return (
    <Fragment>
      <CheckoutSteps step1={false} step2={false} />
      <h1>SHIPPING</h1>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={handleInputChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            name="city"
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={handleInputChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postal code">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            name="postalCode"
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={handleInputChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            name="country"
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={handleInputChange}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">CONTINUE</Button>
      </Form>
    </Fragment>
  );
};

export default ShippingScreen;
