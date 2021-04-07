import React, { useEffect } from "react";
import { Fragment } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createOrder } from "../actions/orderAction";
import { LEAVE_ORDER_PAGE } from "../constants/type";
import CheckoutSteps from "./CheckoutSteps";

const PlaceOrderScreen = () => {
  const {
    authUser: {
      user: { id },
    },
    cart,
    cart: { cartItems, shippingAddress, paymentMethod },
    order: { order, loading, success },
    alert: { alerts },
  } = useSelector((state) => state);
  /** destrcuring shippingAddress */
  const { address, city, postalCode, country } = shippingAddress;

  /** order summary */
  cart.itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  cart.shippingCharge = cartItems.itemsTotal > 300 ? 100 : 0;

  cart.tax = Number((cart.itemsTotal * 0.15).toFixed(2));

  cart.itemsNetTotal = cart.itemsTotal + cart.shippingCharge + cart.tax;

  /** handle place order */
  const dispatch = useDispatch();
  const handlePlaceOrder = (params) => {
    dispatch(
      createOrder({
        // user: id,
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        // itemsTotal: cartItems.itemsTotal,
        totalPrice: cart.itemsNetTotal,
        taxPrice: cart.tax,
        shippingPrice: cart.shippingCharge,
        isPaid: false,
        isDelivered: false,
      })
    );
  };

  /** */
  const history = useHistory();
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: LEAVE_ORDER_PAGE });
    }
  }, [success, history, order, dispatch]);

  return (
    <Fragment>
      <CheckoutSteps step1={false} step2={false} step3={false} step4={false} />
      {alerts &&
        alerts.map((alert, index) => (
          <Alert variant={alert.variant} key={index}>
            {alert.msg}
          </Alert>
        ))}
      <Row>
        <Col sm={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>SHIPPING</h2>
              <p>
                Address: {address}, {city}, {postalCode}, {country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>PAYMENT METHOD</h2>
              <p>Method: {paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>ORDER ITEMS</h2>
              {cartItems.length === 0 ? (
                <Alert variant="warning">You cart is empty</Alert>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index} className="p-2">
                      <Row>
                        <Col sm={2}>
                          <Image
                            src={item.image}
                            height={50}
                            width={50}
                            alt={item.name}
                            fluid
                          ></Image>
                        </Col>
                        <Col sm={6}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col sm={4} className="">
                          {item.qty} x $ {item.price} = ${" "}
                          {Number((item.qty * item.price).toFixed(2))}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={4}>
          <Card>
            <Card.Body>
              <Card.Title>ORDER SUMMARY</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>$ {cart.itemsTotal}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {cart.shippingCharge}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {cart.tax}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {cart.itemsNetTotal}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default PlaceOrderScreen;
