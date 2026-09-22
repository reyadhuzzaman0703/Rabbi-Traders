const express = require("express");

const { getMyProfile, updateMyProfile, changeMyPassword } = require("../controllers/UserController");

const authMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);
router.put("/change-password", authMiddleware, changeMyPassword);


module.exports = router;