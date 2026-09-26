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
      type: String, // لو حابب تستخدم أيقونة (مثل FontAwesome أو Lucide)
      default: "FaConciergeBell",
    },
    image: {
      type: String, // رابط الصورة المحفوظة على Cloudinary لتوضيح شكل الخدمة
      required: [true, "يرجى إرفاق صورة للمرفق"],
    },
    availability: {
      type: String, // مواعيد العمل أو التوافر (مثال: متاحة 24 ساعة، أو من 8 صباحاً لـ 10 مساءً)
      required: [true, "Please specify availability dates."],
    },
    isFree: {
      type: Boolean,
      default: true, // لتحديد ما إذا كانت الخدمة مجانية للنزلاء أم برسوم إضافية
    },
    isActive: {
      type: Boolean,
      default: true, // للتحكم في ظهورها للعملاء
    },
  },
  {
    timestamps: true,
  }
);

const amenityModel = mongoose.model("amenityModel", amenitySchema);

module.exports = amenityModel;