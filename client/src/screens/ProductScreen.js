// import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Col,
  Row,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  Spinner,
  Alert,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
// import Product from "../components/Product";
import Rating from "../components/Rating";
import { getProduct } from "../actions/productListAction";
import { addToCart } from "../actions/cartAction";
// import products from "../products";
const ProductScreen = ({ match: { params }, history }) => {
  // const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);
  /** destructuring product */
  // ??????????????????
  // AND make a new reducer for product.
  const {
    image,
    name,
    rating,
    numReviews,
    _id,
    price,
    description,
    countInStock,
  } = product;
  // console.log("productScreen", product, params.id);
  useEffect(() => {
    // const fetchProduct = async () => {
    //   const config = { method: "get", url: `/api/products/${params.id}` };
    //   const { data } = await axios(config);
    //   setProduct(data);
    // };
    // fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(getProduct(params.id));
    console.log("dispatch");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  /** quantity */
  const [qty, setQty] = useState(1);
  const handleSelectChange = (e) => {
    setQty(e.target.value);
  };
  /** add to cart */
  const handleAddToCart = (e) => {
    history.push(`/cart/${params.id}?qty=${qty}`);
    // ?qty=${qty} can be accessed by location.search
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3 py-3">
        <h5 className="mb-0">go back</h5>
      </Link>
      {loading ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Spinner animation="border" role="status" className="mr-3" />
          Loading...
        </div>
      ) : error ? (
        <Alert variant="danger">{error.message}</Alert>
      ) : (
        <Row className="p-3">
          <Col lg={6} md={12} className="mb-md-3 mb-lg-0">
            <Image src={image} fluid className="w-100" />
          </Col>
          <Col lg={3} md={6} xs={12} className="descript mt-2 mt-lg-0">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating rating={rating} reviews={numReviews} id={_id} />
                {numReviews} reviews
              </ListGroup.Item>
              <ListGroup.Item>Price: ${price}</ListGroup.Item>
              <ListGroupItem>Description: {description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg={3} md={6} xs={8} className="cartinfo mt-2 mt-sm-4 mt-lg-0">
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>${price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{countInStock > 0 ? "InStock" : "Out of Stock"}</Col>
                </Row>
              </ListGroup.Item>
              {countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col className="d-flex align-items-center">
                      <Form.Label>Qty:</Form.Label>
                    </Col>
                    <Col className="pr-3 pr-sm-4 pr-md-4 pr-lg-1">
                      <Form.Control
                        className="mr-5"
                        as="select"
                        onChange={handleSelectChange}
                        // id="inlineFormCustomSelectPref"
                        size="sm"
                        custom
                      >
                        {[...Array(countInStock)].map((x, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  className="btn-block btn-dark"
                  disabled={!countInStock}
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
};
// const findProduct = (products, id) => {
//   return products.find((product) => id === product._id);
// };
export default ProductScreen;
