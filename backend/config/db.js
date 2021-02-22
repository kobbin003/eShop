import mongoose from "mongoose";
import dotenv from "dotenv";
import color from "colors";

dotenv.config({ path: ".env.development" });
// const database = mongoose.connect(process.env.MONGO_URL);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(
      `MongoDB connected:`.blue.bgMagenta + `${conn.connection.host}`.underline
    );
  } catch (error) {
    console.error(`${error.message}`.red.bold);
    process.exit(1);
  }
};
export default connectDB;
