import express from "express";
import dotenv from "dotenv";
import productRoutes from "../Routes/ProductRoutes.js";
import userRoutes from "../Routes/UserRoutes.js";
import orderRoutes from "../Routes/OrderRoute.js";
import connectDB from "../config/db.js";
import { notFound, errorHandler } from "../middleWare/errorMiddleware.js";
const app = express();

/** selecting environment */
dotenv.config({ path: ".env.development" });

/** connect database */
connectDB();

// Init Middleware
/** we can access req.body */
// app.use(express.json({ extended: false }));
app.use(express.json());

/** routes */
app.get("/", (req, res) => res.send("API is running..."));
// app.get("/api/products", (req, res) => res.json(products));
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

/** throw an error: If cannot find the url */
app.use(notFound);
/** custom error handler */
app.use(errorHandler);
// module.exports = app;
export default app;
