const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // لو مش عندك نزلها: npm install multer-storage-cloudinary

// إعداد بيانات حسابك على كلاوندنيري (خدها من الداشبورد عندك وحطها في الـ .env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// إعداد التخزين بحيث يرفع الصور مباشرة على كلاوندنيري
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'hotel-dining', // اسم المجلد اللي هيتنشئ على كلاوندنيري
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage: storage });
module.exports = upload;