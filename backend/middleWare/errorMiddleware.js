const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  /**
   * error = {
   *  message:"",
   *  stack:"",
   * }
   */
  // console.log(error.message);
  res.status(404);
  next(error);
  // throw new Error(`Not Found - ${req.originalUrl}xxxxxx`);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  /** keep the error format of 'errorHandler' and 'express-validator' same */
  res.json({
    errors: [
      {
        msg: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      },
    ],
  });
  //   console.log("res", res);
};

export { notFound, errorHandler };
