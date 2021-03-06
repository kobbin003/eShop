import React, { useState, useEffect } from "react";
import Product from "../components/Product";
// import products from "../products";
// import axios from "axios";
import { getProducts } from "../actions/productListAction";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Spinner } from "react-bootstrap";
import { Fragment } from "react";
const HomeScreen = () => {
  //   const [scrolledY, setScrolled] = useState(100);
  // console.log("document", document);
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector(
    (state) => state.productList
  );
  /** oncomponentMount */
  useEffect(() => {
    // window.scrollBy(0, localStorage.getItem("homeScreenY"));
    /** using-fetch */
    // const fetchData = async () => {
    //   const response = await fetch("/api/products");
    //   const data = await response.json();
    //   setProducts(data);
    //   console.log(data);
    // };
    // fetchData();

    /** axios */
    // const fetchData = async () => {
    //   const config = { method: "get", url: "/api/products" };
    //   const { data } = await axios(config);
    //   setProducts(data);
    // };
    // fetchData();

    /** on component Unmount */
    // return () => {
    //   // localStorage.setItem("homeScreenY", scrolledY);
    //   window.removeEventListener("scroll", handleScroll);
    // };
    /** actions */
    dispatch(getProducts());
    // setProducts(value.products);
  }, []);
  return (
    <div className="homeScreenContainer">
      <h1 className="py-2">LATEST PRODUCTS</h1>
      {loading ? (
        // <h2>loading...</h2>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Spinner animation="border" role="status" className="mr-3" />
          Loading...
        </div>
      ) : error ? (
        // <h2>{error.message}</h2>
        <Alert variant="danger">{error.message}</Alert>
      ) : (
        <div className="card-grid">
          {products.length > 1 &&
            products.map((product, index) => (
              <div key={index}>
                <Product product={product} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
// sm={12} md={6} lg={4} xl={3}
export default HomeScreen;
