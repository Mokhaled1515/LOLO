const { Router } = require("express");
const {
  getUsers,
  createUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateUserAddress,
  updateProfilePic,
  forgotPassword,
  verifyResetCode,
  resetPassword,
} = require("../controllers/userController");

const { auth } = require("../middleware/auth");

const router = Router();

router.get("/", auth, getUsers);
router.post("/", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/profile", auth, getUserProfile);
router.put("/profile", auth, updateUserProfile);
router.put("/address", auth, updateUserAddress);
router.put("/profile-pic", auth, updateProfilePic);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);

module.exports = router;
