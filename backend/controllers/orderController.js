import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import generateToken from "../utils/generateToken.js";
import encryptPassword from "../utils/encryptPassword.js";
import { validationResult } from "express-validator";
import Order from "../Models/OrderModel.js";

export const addOrderItems = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    // user,
    shippingAddress,
    paymentMethod,
    orderItems,
    totalPrice,
    taxPrice,
    shippingPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    // console.log("req.user._id", req.user._id);
    const order = new Order({
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      orderItems,
      totalPrice,
      taxPrice,
      shippingPrice,
    });
    await order.save();
    res.status(201).json(order);
  }
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.productId).populate(
    "user",
    "name email"
  );

  if (order) {
    return res.status(200).json(order);
  } else {
    res.status(400);
    throw new Error("Order is not found");
  }
});
