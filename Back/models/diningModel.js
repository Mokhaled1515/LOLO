const mongoose = require("mongoose");

const diningSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name of the restaurant or cafe."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter a detailed description of the restaurant."],
    },
    cuisineType: {
      type: String,
      required: [true, "Please specify the type of cuisine (e.g., Italian, Oriental, Seafood)"],
    },
    openingHours: {
      type: String,
      required: [true, "Please specify your working hours (e.g., from 7 am to 11 pm)"],
    },
    image: {
      type: String, 
      required: [true, "Please attach a photo of the restaurant."],
    },
    location: {
      type: String, 
      default: "Inside the hotel",
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
const diningModel = mongoose.model("diningModel", diningSchema);

module.exports = diningModel;