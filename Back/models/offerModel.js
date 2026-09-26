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
      type: String, // رابط الصورة المحفوظة على Cloudinary
      required: [true, "Please attach a photo of the display."],
    },
    validUntil: {
      type: Date,
      required: [true, "Please specify the offer expiry date."],
    },
    isActive: {
      type: Boolean,
      default: true, // عشان لو الأدمن حابب يخفي العرض مؤقتًا من غير ما يحذفه
    },
  },
  {
    timestamps: true, // لتسجيل تاريخ إنشاء العرض وتحديثه تلقائياً
  }
);

const offerModel = mongoose.model("offerModel", offerSchema);

module.exports = offerModel;