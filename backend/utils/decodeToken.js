import jwt from "jsonwebtoken";

const decodeToken = (token) => {
  const jwtToken = process.env.JSWTOKEN;
  return jwt.verify(token, jwtToken);
};

export default decodeToken;
