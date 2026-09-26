const { Router } = require("express");
const { auth } = require("../middleware/auth");
const {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
  getUserBookings
} = require("../controllers/bookingController");

const router = Router();

router.get("/", auth, getBookings);
router.get("/my-bookings", auth, getUserBookings);
router.get("/:id",auth, getBooking);
router.post("/", auth, createBooking);
router.put("/:id", auth, updateBooking);
router.delete("/:id", auth, deleteBooking);

module.exports = router;
