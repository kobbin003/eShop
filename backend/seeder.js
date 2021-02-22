import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./Models/UserModel.js";
import Product from "./Models/ProductModel.js";
import Order from "./Models/OrderModel.js";
import connectDB from "./config/db.js";

dotenv.config({ path: ".env.development" });
connectDB();

const importData = async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    const createdUser = await User.insertMany(users);
    console.log("createdUser", createdUser);
    const adminUser = createdUser[0]._id;
    const sampleProducts = products.map((product) => {
      product.user = adminUser;
      return product;
    });
    await Product.insertMany(sampleProducts);
    console.log("data imported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log("data destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  console.log("seeder destroy working");
  destroyData();
} else {
  console.log("seeder import working");
  importData();
}
