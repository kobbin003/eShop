import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import generateToken from "../utils/generateToken.js";
import encryptPassword from "../utils/encryptPassword.js";
import { validationResult } from "express-validator";

const authUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    /** create token */
    const payload = { userId: user._id };
    const token = generateToken(payload);
    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or Password");
  }
  // res.send({ email, password });
});

const getUserProfile = asyncHandler(async (req, res) => {
  /** req.userId */
  //   const id = req.userId;
  //   const user = await User.findById(id).select("-password");
  /** req.user */
  const user = req.user;
  res.json(user);
});

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;

  // try {
  let user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
    //   .json({ errors: [{ msg: "User already exists" }] });
  }
  /** encrypt password */
  // const hash = await encryptPassword(password);
  // OR
  /** use pre-hook mongoose's schema */

  /** create the user model */
  // user = new User({ name, email, password: hash });
  // await user.save();
  // OR
  // user = await User.create({ name, email, password: hash });
  /** no need of hash if we are using pre-hook */
  /** ALSO REMEMBER that 'save' is performed along with 'create'
   * That's why we are using save in the pre-hook
   */
  user = await User.create({ name, email, password });

  /** return the jswebtoken */
  const payload = { userId: user.id };
  const token = generateToken(payload);
  if (user) {
    res.status(201);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  // return res.json({ token });
  // } catch (error) {
  //   res.status(500).send("server Error");
  // }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // /** req.user */
  // const user = req.user;
  // res.json(user);
  /** find user */
  const userId = req.user.id;
  const user = await User.findById(userId);

  if (user) {
    /** update the user */
    const { name, email, password } = req.body;
    user.name = name;
    user.email = email;
    user.password = password;
    user.save();

    /** send the response */
    res.status(200).json({
      msg: "user profile updated",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("user cannot be found!");
  }
});
export { authUser, getUserProfile, registerUser, updateUserProfile };
