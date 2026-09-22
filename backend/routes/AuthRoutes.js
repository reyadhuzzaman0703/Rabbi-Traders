const express = require("express");
const { registerUser, loginUser, getMe, adminTest  } = require("../controllers/AuthController");
const authMiddleware = require("../middleware/AuthMiddleware");
const roleMiddleware = require("../middleware/RoleMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", authMiddleware, getMe);
router.get(
    "/admin-test",
    authMiddleware,
    roleMiddleware("admin"),
    adminTest
);

module.exports = router;