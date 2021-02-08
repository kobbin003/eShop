import React, { Fragment } from "react";
import startFiller from "../utils/starFiller";

const Rating = ({ rating, reviews, id }) => {
  const icons = startFiller(rating);
  return (
    <Fragment>
      {icons.map((icon, i) => (
        <i
          className={icon}
          key={i}
          style={{
            WebkitTextFillColor: "burlywood",
            WebkitTextStrokeWidth: "0.2px",
            WebkitTextStrokeColor: "brown",
            paddingRight: "0.1rem",
          }}
        ></i>
      ))}
      <span className="pl-2">{reviews} reviews</span>
    </Fragment>
  );
};

export default Rating;
