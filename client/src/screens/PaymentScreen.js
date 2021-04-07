import React, { useState } from "react";
import { Fragment } from "react";
import { Button, Col, Form, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { savePaymentMethod } from "../actions/cartAction";
import CheckoutSteps from "./CheckoutSteps";

const PaymentScreen = () => {
  /** shipping address */
  const { shippingAddress, paymentMethod: savedPaymentMethod } = useSelector(
    (state) => state.cart
  );
  const history = useHistory();
  if (!shippingAddress) {
    history.push("/shipping");
  }

  /** payment-method */
  const [paymentMethod, setPaymentMethod] = useState(savedPaymentMethod);
  /** handle radio check select */
  const handleRadioSelect = (e) => {
    setPaymentMethod(e.target.value);
  };

  /** handle Form Submit */
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeOrder");
  };

  return (
    <Fragment>
      <CheckoutSteps step1={false} step2={false} step3={false} />
      <h1>PAYMENT METHOD</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="Paypal or credit card"
              name="paymentMethod"
              id="Paypal"
              value="Paypal"
              checked={paymentMethod === "Paypal" ? true : false}
              onChange={handleRadioSelect}
            />
            <Form.Check
              type="radio"
              label="Stripe"
              name="paymentMethod"
              id="Stripe"
              value="Stripe"
              checked={paymentMethod === "Stripe" ? true : false}
              onChange={handleRadioSelect}
            />
          </Col>
        </Form.Group>
        <Button type="submit">CONTINUE</Button>
      </Form>
    </Fragment>
  );
};

export default PaymentScreen;
