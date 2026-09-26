const express = require("express");
const router = express.Router();
const {
  getAllDining,
  createDining,
  deleteDining,
} = require("../controllers/diningController");
const { auth, admin } = require("../middleware/auth"); // تأكد من مسار الـ middleware عندك
const upload = require("../middleware/uploadMiddleware");

router
  .route("/")
  .get(getAllDining)
  .post(auth, admin, upload.single("image"), createDining);
router.route("/:id").delete(auth, admin, deleteDining);

module.exports = router;
