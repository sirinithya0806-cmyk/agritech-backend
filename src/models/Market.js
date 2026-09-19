const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        crop: {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        demand: {
            type: Number,
            default: 0,
            min: 0
        },

        capacity: {
            type: Number,
            default: 0,
            min: 0
        },

        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Market",
    marketSchema
);