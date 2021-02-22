import express from "express";
// import products from "../data/products.js";
import Product from "../Models/ProductModel.js";
import asyncHandler from "express-async-handler";
// const products = require("./products");
const router = express.Router();

// @desc    Fetch all products
// @route   Get /api/products/
// @access  public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  })
);

// @desc    Fetch product by it's id
// @route   Get /api/products/:productId
// @access  public
router.get(
  "/:productId",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
    // console.log(res.status());
    console.log("response", res.statusCode);
  })
);
// router.get("/:productId", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.productId);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json([{ msg: "product not found" }]);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

// ?????? whta does custom error handling do???
// ????? fix scroll while navigating from HomeScreen to Product screen ??????????
// ???/ what does asyncHandler do ??
// module.exports = router;
export default router;
