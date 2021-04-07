import express from "express";
import User from "../Models/UserModel.js";
import asyncHandler from "express-async-handler";
import { body, check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import auth from "../middleWare/authMiddleware.js";
const router = express.Router();

// @route   POST api/users/login
/// @desc   login user
// @access  Public
router.post(
  "/login",
  [
    body("email", "email is required").isEmail(),
    body("password", "password is required").notEmpty(),
  ],
  authUser
);

// @route   GET api/users/profile
/// @desc   Get user profile
// @access  Private
router.get("/profile", auth, getUserProfile);
// router.route("/profile").get(auth, getUserProfile);

// @route   POST api/users/
/// @desc   Register user
// @access  Public
router.post(
  "/",
  [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Email is required").isEmail(),
    check("password")
      .not()
      .isEmpty()
      .withMessage("password is required")
      .bail() /** bail(): to stop running validations if any of the previous ones have failed. */
      .isLength({ min: 6 })
      .withMessage("must be at least 6 chars long")
      .bail()
      //   .not()
      .matches(/\d/)
      .withMessage("must contain a number"),
  ],
  registerUser
);

// @route   POST api/users/update
/// @desc   update user profile
// @access  Private
router.put(
  "/update",
  [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Email is required").isEmail(),
    check("password")
      .not()
      .isEmpty()
      .withMessage("password is required")
      .bail() /** bail(): to stop running validations if any of the previous ones have failed. */
      .isLength({ min: 6 })
      .withMessage("must be at least 6 chars long")
      .bail()
      //   .not()
      .matches(/\d/)
      .withMessage("must contain a number"),
  ],
  auth,
  updateUserProfile
);
export default router;
