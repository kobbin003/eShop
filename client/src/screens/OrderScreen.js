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
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createOrder, getOrderById } from "../actions/orderAction";

const OrderScreen = ({ match: { params } }) => {
  const {
    orderGet: { orderById, loading, success },
    alert: { alerts },
  } = useSelector((state) => state);

  /** destructuring orderById */
  const {
    user,
    shippingAddress,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    orderItems,
    isPaid,
    isDelivered,
  } = orderById;
  /** destrcuring shippingAddress */
  const { address, city, postalCode, country } = shippingAddress || {
    address: "",
    city: "",
    postalCode: "",
    country: "",
  };

  /** handle place order */
  const dispatch = useDispatch();

  /** useEffect */
  useEffect(() => {
    dispatch(getOrderById(params.id));
  }, []);
  return (
    <Fragment>
      {/* {alerts &&
        alerts.map((alert, index) => (
          <Alert variant={alert.variant} key={index}>
            {alert.msg}
          </Alert>
        ))} */}
      <Row className="px-2 pt-4">
        <h3>ORDER {params.id}</h3>
      </Row>
      <Row>
        {/* loading === false ? (success ? 'somponent' : 'alert') : 'spinner' */}
        {loading === false ? (
          success ? (
            <Fragment>
              <Col sm={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>SHIPPING</h2>
                    <p>
                      Name: <span className="text-capitalize">{user.name}</span>
                    </p>
                    <p>Email: {user.email}</p>
                    <p>
                      Address: {address}, {city}, {postalCode}, {country}
                    </p>
                    {!isDelivered && (
                      <Alert variant="danger">Not Delivered</Alert>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h2>PAYMENT METHOD</h2>
                    <p>Method: {paymentMethod}</p>
                    {!isPaid && <Alert variant="danger">Not Paid</Alert>}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h2>ORDER ITEMS</h2>
                    {orderItems.length === 0 ? (
                      <Alert variant="warning">You cart is empty</Alert>
                    ) : (
                      <ListGroup variant="flush">
                        {orderItems.map((item, index) => (
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
                        <Col>
                          ${" "}
                          {orderItems.reduce(
                            (acc, value) => acc + value.price * value.qty,
                            0
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>$ {shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>$ {taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>$ {totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Fragment>
          ) : (
            alerts &&
            alerts.map((alert, index) => (
              <Alert variant={alert.variant} key={index}>
                {alert.msg}
              </Alert>
            ))
          )
        ) : (
          <div className="d-flex w-50 justify-content-center pt-3">
            <Spinner animation="border" variant="dark" />
          </div>
        )}
        {/* {success ? "component" : "loading"} */}
        {/* <div className="d-flex w-100 justify-content-center">
          <Spinner animation="border" variant="dark" className="" />
        </div> */}
      </Row>
    </Fragment>
  );
};

export default OrderScreen;
