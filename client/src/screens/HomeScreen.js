import React, { useState, useEffect } from "react";
import Product from "../components/Product";
// import products from "../products";
import axios from "axios";

const HomeScreen = () => {
  const [scrolledY, setScrolled] = useState(0);
  // console.log("document", document);
  const [products, setProducts] = useState([]);
  const handleScroll = (e) => {
    /** scoll */
    const scrollY = window.scrollY;
    // console.log("scrollY", scrollY);
    setScrolled(scrollY);
    // console.log("scrolledY", scrolledY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      localStorage.setItem("homeScreenY", scrolledY);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolledY]);
  /** oncomponentMount */
  useEffect(() => {
    window.scrollBy(0, localStorage.getItem("homeScreenY"));
    /** using-fetch */
    // const fetchData = async () => {
    //   const response = await fetch("/api/products");
    //   const data = await response.json();
    //   setProducts(data);
    //   console.log(data);
    // };
    // fetchData();

    /** axios */
    const fetchData = async () => {
      const config = { method: "get", url: "/api/products" };
      const { data } = await axios(config);
      // setProducts(data);
      return data;
      // console.log(data);
    };
    // const updateState = async () => {
    //   const data = await fetchData();
    //   setProducts(data);
    //   console.log(data);
    // };
    // updateState();
    fetchData().then((data) => {
      setProducts(data);
      // console.log("data", data);
    });
    /** on component Unmount */
    return () => {
      //   localStorage.setItem("homeScreenY", scrolledY);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className="homeScreenContainer"

      // onScroll={handleScroll}
    >
      <h1>LATEST PRODUCTS</h1>
      <div className="card-grid">
        {products.length > 1 &&
          products.map((product) => (
            <div key={product._id}>
              <Product product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};
// sm={12} md={6} lg={4} xl={3}
export default HomeScreen;
