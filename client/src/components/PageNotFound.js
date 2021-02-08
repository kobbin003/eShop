import React from "react";
import image from "../Assets/images/9.svg";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="mh-100">
      <h1 className="font-responsive text-center">404 Error: Page Not Found</h1>
      <Image src={image} className="responsive-image d-block" />
      <div className="text-center text-decoration-none">
        <Link className="" to="/">
          <h5>
            <b>Go Home</b>
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
