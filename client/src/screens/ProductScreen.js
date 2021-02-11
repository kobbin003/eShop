import axios from "axios";
import React, { useState, useEffect } from "react";
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
import Product from "../components/Product";
import Rating from "../components/Rating";
// import products from "../products";
const ProductScreen = ({ match: { params } }) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      const config = { method: "get", url: `/api/products/${params.id}` };
      const { data } = await axios(config);
      setProduct(data);
    };
    fetchProduct();
  }, []);
  return (
    <div>
      <Link to="/" className="btn btn-light my-3 py-3">
        <h5 className="mb-0">go back</h5>
      </Link>
      <Row className="p-3">
        <Col lg={6} md={12} className="mb-md-3 mb-lg-0">
          <Image src={product.image} fluid className="w-100" />
        </Col>
        <Col lg={3} md={6} xs={12} className="descript mt-2 mt-lg-0">
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
        <Col lg={3} md={6} xs={8} className="cartinfo mt-2 mt-sm-4 mt-lg-0">
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
// const findProduct = (products, id) => {
//   return products.find((product) => id === product._id);
// };
export default ProductScreen;
