import React from "react";
import {
  Col,
  Row,
  Image,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import products from "../products";
const ProductScreen = ({ match: { params } }) => {
  const product = findProduct(params.id);
  return (
    <div>
      <Link to="/" className="btn btn-light my-3 py-3">
        <h5 className="mb-0">
          go back
        </h5>
      </Link>
      <Row>
        <Col lg={6} className="">
          <Image src={product.image} fluid />
        </Col>
        <Col lg={3} className="descript">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                reviews={product.numReviews}
                id={product._id}
              />
              {product.numReviews} reviews
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col lg={3} className="cartinfo">
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>${product.price}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>
                  {product.countInStock > 0 ? "InStock" : "Out of Stock"}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className="btn-block btn-dark"
                disabled={!product.countInStock}
              >
                Add To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};
const findProduct = (id) => {
  return products.find((product) => id === product._id);
};
export default ProductScreen;
