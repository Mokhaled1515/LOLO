const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the offer title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter offer details"],
    },
    discountPercentage: {
      type: Number,
      required: [true, "Please specify the discount percentage."],
    },
    image: {
      type: String, 
      required: [true, "Please attach a photo of the display."],
    },
    validUntil: {
      type: Date,
      required: [true, "Please specify the offer expiry date."],
    },
    isActive: {
      type: Boolean,
      default: true, 
    },
  },
  {
    timestamps: true, 
  }
);

const offerModel = mongoose.model("offerModel", offerSchema);

module.exports = offerModel;