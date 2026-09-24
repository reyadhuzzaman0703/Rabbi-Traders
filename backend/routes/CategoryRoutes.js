const express = require("express");

const {
    createCategory, getAllCategories, getSubcategories, searchCategories,
} = require("../controllers/CategoryController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Create category / subcategory
// Admin only

//category
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getAllCategories
);

router.get(
    "/search",
    authMiddleware,
    roleMiddleware("admin"),
    searchCategories
);

//subcategory
router.get(
    "/:categoryId/subcategories",
    authMiddleware,
    roleMiddleware("admin"),
    getSubcategories
);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    createCategory
);

module.exports = router;