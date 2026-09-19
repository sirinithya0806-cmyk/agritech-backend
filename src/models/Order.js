const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        farmerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        harvestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Harvest",
            required: true
        },

        requirementId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BuyerRequirement"
        },

        poolId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FarmPool"
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

        price: {
            type: Number,
            required: true,
            min: 0
        },

        deliveryLocation: {
            type: String,
            required: true,
            trim: true
        },

        deliveryDate: {
            type: Date
        },

        status: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "processing",
                "shipped",
                "delivered",
                "cancelled"
            ],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Order",
    orderSchema
);