const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema(
    {
        transporterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        vehicleType: {
            type: String,
            enum: [
                "mini_truck",
                "truck",
                "tractor",
                "van",
                "other"
            ],
            required: true
        },

        capacity: {
            type: Number,
            required: true,
            min: 0
        },

        costPerKm: {
            type: Number,
            required: true,
            min: 0
        },

        currentLocation: {
            type: String,
            required: true,
            trim: true
        },

        available: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Transport",
    transportSchema
);