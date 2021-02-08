import React from "react";

const startFiller = (rating) => {
  let icons = [];
  /** full-star */
  for (let i = 0; i < Math.floor(rating); i++) {
    icons.push("fa fa-star");
  }
  if (rating - Math.floor(rating) >= 0.5) {
    /** half-star */
    icons.push("fas fa-star-half-alt");
    /** empty-star */
    for (let i = 0; i < 5 - (Math.floor(rating) + 1); i++) {
      icons.push("far fa-star");
    }
  } else {
    /** empty-star */
    for (let i = 0; i < 5 - Math.floor(rating); i++) {
      icons.push("far fa-star");
    }
  }
  return icons;
};

export default startFiller;
