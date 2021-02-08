import React, { Fragment, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
// import Container from "react-bootstrap/Container";
import { Image, Col, Row } from "react-bootstrap";
import Product from "../components/Product";

import products from "../products";
const HomeScreen = () => {
  const [scrolledY, setScrolled] = useState(0);
  console.log("document", document);
  const containerRef = useRef();
  // let scrolled;
  const handleScroll = (e) => {
    // console.log(e);
    const scrollY = window.scrollY;
    console.log("scrollY", scrollY); //
    // scrolled = scrollY;
    // console.log("scrolled", scrolled);
    setScrolled(scrollY);
    console.log("scrolledY", scrolledY);
  };
  useEffect(() => {
    // const list = ReactDOM.findDOMNode(containerRef);
    window.addEventListener("scroll", handleScroll);
    return () => {
      localStorage.setItem("homeScreenY", scrolledY);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolledY]);
  /** oncomponentMount */
  useEffect(() => {
    window.scrollBy(0, localStorage.getItem("homeScreenY"));
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
      <h1 ref={containerRef}>LATEST PRODUCTS</h1>
      <div className="card-grid">
        {products.map((product) => (
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
