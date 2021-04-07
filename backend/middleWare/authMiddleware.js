import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";
import decodeToken from "../utils/decodeToken.js";
const auth = async (req, res, next) => {
  //   const token = req.header("authtoken");
  /** headers vs header */
  //   console.log(req.headers.authtoken);
  //   console.log(req.header("authtoken"));

  /** syntax of authtoken = `Bearer ${token}` */
  /** use authorization insted of authToken, it is defaulted in Postman's Auth */
  const token = req.headers.authorization.split(" ")[1];
  //   const token = req.headers.authtoken.split(" ")[1];
  if (!token) {
    res.status(401);
    // throw new Error("User is not authorised, no token found!");
    /** in case of middlewares, pass the error in "next()", instead of "throw new Error()" */
    const error = new Error("User is not authorised, no token found!");
    next(error);
  }

  try {
    /** decode the token */
    const decoded = decodeToken(token);
    // req.userId = decoded.userId;
    const userId = decoded.userId;
    const user = await User.findById(userId).select("-password");
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404);
      next(new Error("User not found"));
    }
  } catch (error) {
    console.error(error);
    res.status(401);
    next(new Error("Not Authorized, Invalid token!"));
  }
};

export default auth;
