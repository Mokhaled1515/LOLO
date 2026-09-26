const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    nationality: { type: String, default: "" },
    address: {
      city: { type: String, default: "" },
      street: { type: String, default: "" },
      // building: { type: String, default: "" },
      // phone: { type: String, default: "" },
      // postalCode: { type: String, default: "" },
      country: { type: String, default: "" },
    },
    // صورة البروفايل (اختياري لو حابب)
    profilePic: {
      type: String,
      default: "",
    },
    resetPasswordToken: {
      type: String,
      default: "",
    },

    resetPasswordExpire: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
