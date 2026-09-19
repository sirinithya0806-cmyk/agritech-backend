const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        message: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            enum: [
                "order",
                "farm_pool",
                "harvest",
                "market",
                "requirement",
                "selling_decision",
                "system"
            ],
            default: "system"
        },

        read: {
            type: Boolean,
            default: false
        },

        relatedId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Notification",
    notificationSchema
);