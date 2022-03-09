import mongoose from "mongoose";

const propertySchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  propertyType: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  address: { type: String, required: true },
  area: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  squareMeters: { type: Number, required: true },
  isDogfriendly: { type: Boolean, required: true },
  isCatfriendly: { type: Boolean, required: true },
  isSmokingfriendly: { type: Boolean, required: true },
  images: [{ type: String }],
  floorPlan: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Property", propertySchema);
