const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        // Product basic information
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        // Product belongs to a subcategory
        // Parent category can be found through the subcategory
        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        // Brand
        brand: {
            type: String,
            trim: true,
        },

        // Pricing
        originalPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        discountPercentage: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        // Final selling price
        // Usually calculated from discount percentage,
        // but admin can manually override it.
        discountPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        // true = admin manually changed the calculated price
        isDiscountPriceOverridden: {
            type: Boolean,
            default: false,
        },

        // Inventory
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        // Product images
        images: [
            {
                type: String,
            },
        ],

        // Flexible product specifications
        specifications: {
            type: Map,
            of: String,
        },

        // Product visibility
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;