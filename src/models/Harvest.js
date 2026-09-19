const mongoose = require("mongoose");

const harvestSchema = new mongoose.Schema(
    {
        farmerId: {
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

        harvestDate: {
            type: Date,
            required: true
        },

        shelfLife: {
            type: Number,
            required: true,
            min: 0
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "available",
                "sold",
                "reserved",
                "expired"
            ],
            default: "available"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Harvest",
    harvestSchema
);