import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateCart } from "../actions/cartAction";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
const CartScreen = ({ history, match: { params }, location }) => {
  const productId = params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const {
    cart: { cartItems },
  } = useSelector((state) => state);
  // console.log(cartItems);
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /** handleSelectChange */
  const handleSelectChange = (productId) => (e) => {
    //dispatch addToCart on qty change
    dispatch(updateCart(productId, Number(e.target.value)));
  };

  /** handle item remove */
  const handleItemRemove = (id) => {
    return () => dispatch(removeFromCart(id));
  };

  /** handle check out */
  const handleCheckOut = (params) => {
    // console.log("checkout");
    // ?????????
    // 1. what is this "/login?redirect=shipping".
    // ///?????????
    // history.push("/login?redirect=shipping");
    history.push("/shipping");

    // history.push("/checkout");
  };

  return (
    <Row>
      <Col md={8}>
        <h1 className="py-2">SHOPPING CART</h1>
        {cartItems.length === 0 ? (
          <Alert variant="info">
            Your cart is Empty <Link to="/">Continue Shopping</Link>
          </Alert>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item, i) => (
              <ListGroup.Item key={i}>
                <Row>
                  <Col>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col>{item.price}</Col>
                  <Col>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      custom
                      onChange={handleSelectChange(item.product)}
                    >
                      {[...Array(item.countInStock)].map((x, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    <Button
                      variant="light"
                      onClick={handleItemRemove(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4} className="py-2">
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}){" "}
                items
              </h2>
              ${" "}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <Button
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={handleCheckOut}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
