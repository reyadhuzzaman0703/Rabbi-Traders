const Category = require("../models/Category");

// Create Category / Subcategory
const createCategory = async (req, res) => {
    try {
        const {
            name,
            slug,
            parent,
            image,
            description,
            sortOrder,
        } = req.body;

        // Name is required
        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Category name is required.",
            });
        }

        // Slug is required
        if (!slug || !slug.trim()) {
            return res.status(400).json({
                success: false,
                message: "Category slug is required.",
            });
        }

        const normalizedName = name.trim();
        const normalizedSlug = slug.toLowerCase().trim();

        // If parent is provided, make sure parent category exists
        if (parent) {
            const parentCategory = await Category.findById(parent);

            if (!parentCategory) {
                return res.status(404).json({
                    success: false,
                    message: "Parent category not found.",
                });
            }
        }

        // Check duplicate name within the same parent
        // Case-insensitive
        const existingName = await Category.findOne({
            parent: parent || null,
            name: {
                $regex: `^${normalizedName.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    "\\$&"
                )}$`,
                $options: "i",
            },
        });

        if (existingName) {
            return res.status(409).json({
                success: false,
                message: "A category with this name already exists here.",
            });
        }

        // Check duplicate slug
        const existingSlug = await Category.findOne({
            slug: normalizedSlug,
        });

        if (existingSlug) {
            return res.status(409).json({
                success: false,
                message: "Category with this slug already exists.",
            });
        }

        // Create category / subcategory
        const category = await Category.create({
            name: normalizedName,
            slug: normalizedSlug,
            parent: parent || null,
            image,
            description,
            sortOrder: sortOrder || 0,
        });

        res.status(201).json({
            success: true,
            message: parent
                ? "Subcategory created successfully."
                : "Category created successfully.",
            category,
        });

    } catch (error) {
        console.error("Create Category Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while creating category.",
        });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
            .sort({ sortOrder: 1, name: 1 })
            .lean();

        res.status(200).json({
            success: true,
            count: categories.length,
            categories,
        });

    } catch (error) {
        console.error("Get All Categories Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching categories.",
        });
    }
};

const getSubcategories = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Find all subcategories under this category
        const subcategories = await Category.find({
            parent: categoryId,
            isActive: true,
        })
            .sort({ sortOrder: 1, name: 1 })
            .lean();

        res.status(200).json({
            success: true,
            count: subcategories.length,
            subcategories,
        });

    } catch (error) {
        console.error("Get Subcategories Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching subcategories.",
        });
    }
};

const searchCategories = async (req, res) => {
    try {
        const { q, parent } = req.query;

        // Search text is required
        if (!q || !q.trim()) {
            return res.status(400).json({
                success: false,
                message: "Search query is required.",
            });
        }

        const searchText = q.trim();

        // Build search filter
        const filter = {
            isActive: true,

            // Starts-with search, case-insensitive
            name: {
                $regex: `^${searchText.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    "\\$&"
                )}`,
                $options: "i",
            },
        };

        // If parent is provided, search only inside that parent
        if (parent) {
            filter.parent = parent;
        }

        const categories = await Category.find(filter)
            .sort({ sortOrder: 1, name: 1 })
            .limit(10)
            .lean();

        res.status(200).json({
            success: true,
            count: categories.length,
            categories,
        });

    } catch (error) {
        console.error("Search Categories Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while searching categories.",
        });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getSubcategories,
    searchCategories,

};