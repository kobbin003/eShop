import express from "express";
// import products from "../data/products.js";
import Product from "../Models/ProductModel.js";
import asyncHandler from "express-async-handler";
import { addOrderItems, getOrderById } from "../controllers/orderController.js";
import auth from "../middleWare/authMiddleware.js";
import { body } from "express-validator";
// const products = require("./products");
const router = express.Router();

// @route   POST api/orders
/// @desc   create a new order
// @access  Private
router.post(
  "/",
  [
    // body("user", "the user is required").not().isEmpty(),
    /** 'body' checks the 'req.body' whether "user" is there or not.
     * Therefore, no need to write this, because we are providing this info inside the Controller.
     */
    body("orderItems.*.qty", "ordered Item's quantity is required")
      .not()
      .isEmpty(),
    body("orderItems.*.name", "ordered Item's name is required")
      .not()
      .isEmpty(),
    body("orderItems.*.image", "ordered Item's image location is required")
      .not()
      .isEmpty(),
    body("orderItems.*.price", "ordered Item's price is required")
      .not()
      .isEmpty(),
    body("orderItems.*.product", "ordered Item's product id is required")
      .not()
      .isEmpty(),
    body("shippingAddress.address", "shipping address-address is required")
      .not()
      .isEmpty(),
    body("shippingAddress.city", "shipping address-city is required")
      .not()
      .isEmpty(),
    body(
      "shippingAddress.postalCode",
      "shipping address-postalCode is required"
    )
      .not()
      .isEmpty(),
    body("shippingAddress.country", "shipping address-country is required")
      .not()
      .isEmpty(),
    body("paymentMethod", "payment method type is required").not().isEmpty(),
    body("taxPrice", "tax price is required").not().isEmpty(),
    body("shippingPrice", "shipping price is required").not().isEmpty(),
    body("totalPrice", "total price is required").not().isEmpty(),
    body("isPaid", "is paid is required").not().isEmpty(),
    body("isDelivered", "is delivered is required").not().isEmpty(),
  ],
  auth,
  addOrderItems
);

// @route   POST api/orders/:orderId
/// @desc   Find order b ID
// @access  Private
router.get("/:productId", auth, getOrderById);

export default router;
