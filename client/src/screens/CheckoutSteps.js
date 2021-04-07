import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({
  step1 = true,
  step2 = true,
  step3 = true,
  step4 = true,
}) => {
  //   const { step1 };
  return (
    <Nav className="d-flex justify-content-center py-2">
      <Nav.Item>
        {/* <LinkContainer to="/login"> */}
        {/* /** ????????????????????? make steps work ????????????????????? // */}
        <Nav.Link disabled={step1} className="px-4">
          Sign In
        </Nav.Link>
        {/* </LinkContainer> */}
      </Nav.Item>
      <Nav.Item>
        {/* <LinkContainer to="/shipping"> */}
        <Nav.Link disabled={step2} className="px-4">
          Shipping
        </Nav.Link>
        {/* </LinkContainer> */}
      </Nav.Item>
      <Nav.Item>
        {/* <LinkContainer to="/payment"> */}
        <Nav.Link disabled={step3} className="px-4">
          Payment
        </Nav.Link>
        {/* </LinkContainer> */}
      </Nav.Item>
      <Nav.Item>
        {/* <LinkContainer to="/placeOrder"> */}
        <Nav.Link disabled={step4} className="px-4">
          Place Order
        </Nav.Link>
        {/* </LinkContainer> */}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
