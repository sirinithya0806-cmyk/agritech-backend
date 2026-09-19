const mongoose = require("mongoose");


const poolMemberSchema = new mongoose.Schema(
    {
        farmerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        harvestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Harvest"
        },

        quantity: {
            type: Number,
            required: true,
            min: 0
        },

        individualCost: {
            type: Number,
            default: 0
        },

        sharedCost: {
            type: Number,
            default: 0
        }
    },
    {
        _id: false
    }
);


const farmPoolSchema = new mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        members: {
            type: [poolMemberSchema],
            default: []
        },

        totalQuantity: {
            type: Number,
            default: 0
        },

        vehicleCapacity: {
            type: Number,
            required: true,
            min: 0
        },

        pickupLocations: [
            {
                farmerId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },

                location: {
                    type: String
                }
            }
        ],

        destination: {
            type: String,
            required: true,
            trim: true
        },

        deliveryDate: {
            type: Date,
            required: true
        },

        deliveryTime: {
            type: String,
            required: true
        },

        estimatedCost: {
            type: Number,
            default: 0
        },

        individualTransportCost: {
            type: Number,
            default: 0
        },

        sharedTransportCost: {
            type: Number,
            default: 0
        },

        transportSaving: {
            type: Number,
            default: 0
        },

        carbonReductionKg: {
            type: Number,
            default: 0
        },

        compatibilityScore: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: [
                "open",
                "full",
                "confirmed",
                "in_transit",
                "completed",
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
    "FarmPool",
    farmPoolSchema
);