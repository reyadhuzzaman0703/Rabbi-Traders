const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        // Category or subcategory name
        name: {
            type: String,
            required: true,
            trim: true,
        },

        // URL-friendly name
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        // null = main category
        // ObjectId = this is a subcategory
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null,
        },

        // Optional category image
        image: {
            type: String,
            trim: true,
        },

        // Optional description
        description: {
            type: String,
            trim: true,
        },

        // Controls frontend visibility
        isActive: {
            type: Boolean,
            default: true,
        },

        // Controls display order
        sortOrder: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;