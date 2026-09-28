const { Router } = require("express");
// const { auth } = require("../middleware/auth");
const {
  getRomms,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

const { auth } = require("../middleware/auth");

const router = Router();

router.get("/", getRomms);

router.post("/", auth, createRoom);

router.get("/:id", getRoom);

router.put("/:id", auth, updateRoom);

router.delete("/:id", auth, deleteRoom);

module.exports = router;
