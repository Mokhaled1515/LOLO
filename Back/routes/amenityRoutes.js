const express = require("express");
const router = express.Router();
const {
  getAllAmenities,
  createAmenity,
  deleteAmenity,
} = require("../controllers/amenityController");
const { auth, admin } = require("../middleware/auth");

router.route("/").get(getAllAmenities).post(auth, admin, createAmenity);
router.route("/:id").delete(auth, admin, deleteAmenity);

module.exports = router;