const mongoose = require("mongoose");

const buyerRequirementSchema = new mongoose.Schema(
    {
        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        crop: {
            type: String,
            required: true,
            trim: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 0
        },

        unit: {
            type: String,
            enum: [
                "kg",
                "quintal",
                "ton"
            ],
            default: "kg"
        },

        quality: {
            type: String,
            enum: [
                "A",
                "B",
                "C"
            ],
            required: true
        },

        maxPrice: {
            type: Number,
            required: true,
            min: 0
        },

        deliveryLocation: {
            type: String,
            required: true,
            trim: true
        },

        requiredDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: [
                "open",
                "fulfilled",
                "cancelled"
            ],
            default: "open"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "BuyerRequirement",
    buyerRequirementSchema
);