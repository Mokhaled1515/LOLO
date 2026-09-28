const mongoose = require("mongoose");

const amenitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name of the service or facility."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a detailed description of the service."],
    },
    icon: {
      type: String, 
      default: "FaConciergeBell",
    },
    image: {
      type: String, 
      required: [true, "يرجى إرفاق صورة للمرفق"],
    },
    availability: {
      type: String, 
      required: [true, "Please specify availability dates."],
    },
    isFree: {
      type: Boolean,
      default: true, 
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

const amenityModel = mongoose.model("amenityModel", amenitySchema);

module.exports = amenityModel;