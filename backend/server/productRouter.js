import express from "express";
import products from "./products.js";
// const products = require("./products");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(products);
});

router.get("/:productId", (req, res) => {
  const product = products.find(
    (product) => req.params.productId === product._id
  );
  res.json(product);
});
// module.exports = router;
export default router;
