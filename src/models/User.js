import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  avatarUrl: { type: String },
  location: { type: String },
  social: { type: Boolean },
});

userSchema.pre("save", async function () {
  if (this.isModified("password") && this.password !== "") {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
