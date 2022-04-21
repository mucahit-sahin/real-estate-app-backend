import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  profilePicture: { type: String },
});

export default mongoose.model("User", userSchema);
