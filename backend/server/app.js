import express from "express";
import dotenv from "dotenv";
import productRouter from "./productRouter.js";
import connectDB from "../config/db.js";
const app = express();

/** selecting environment */
dotenv.config({ path: ".env.development" });

/** connect database */
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API is running..."));
// app.get("/api/products", (req, res) => res.json(products));
app.use("/api/products", productRouter);
// module.exports = app;
export default app;
