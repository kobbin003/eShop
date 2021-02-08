import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const Product = ({ product }) => {
  return (
    <Card className="rounded p-3 my-3 pb-sm-4 card-height">
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body className="px-1">
        <Link to={`/product/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>
          {/* {product.rating} from {product.numReviews} reviews */}
          <Rating
            rating={product.rating}
            reviews={product.numReviews}
            id={product._id}
          />
        </Card.Text>
        <Card.Text as="h3">{product.price} $</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default Product;
