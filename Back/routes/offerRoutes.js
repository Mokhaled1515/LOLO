const express = require("express");
const router = express.Router();
const {
  getAllOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
} = require("../controllers/offerController");
const { auth, admin } = require("../middleware/auth");
const upload = require("../middleware/uploadMiddleware");

router
  .route("/")
  .get(getAllOffers)
  .post(auth, admin, upload.single("image"), createOffer);
router
  .route("/:id")
  .get(getOfferById)
  .put(auth, admin, upload.single("image"), updateOffer)
  .delete(auth, admin, deleteOffer);

module.exports = router;
