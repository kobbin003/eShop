import jwt from "jsonwebtoken";
const generateToken = (payload) => {
  const jswToken = process.env.JSWTOKEN;
  return jwt.sign(payload, jswToken);
};

export default generateToken;
