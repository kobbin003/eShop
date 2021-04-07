import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

/** adding methods on schema */
userSchema.methods.comparePassword = async function (password) {
  // console.log("user", this);
  return bcrypt.compare(password, this.password);
  /** Here this -> refers to that(queried) instance of the User Model */
};

userSchema.pre("save", async function (next) {
  /** incase password is not updated/modified, Do not encrypt password */
  if (!this.isModified("password")) {
    console.log("modified");
    next();
  }
  /** encrypt password */
  const salt = await bcrypt.genSalt(10);
  // const hash = await bcrypt.hash(this.password, salt);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
