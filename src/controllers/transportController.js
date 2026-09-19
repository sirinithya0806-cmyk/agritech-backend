const Transport = require("../models/Transport");


// ========================================
// CREATE TRANSPORT
// ========================================

const createTransport = async (req, res) => {
    try {

        const {
            vehicleType,
            capacity,
            costPerKm,
            currentLocation
        } = req.body;


        if (
            !vehicleType ||
            capacity === undefined ||
            costPerKm === undefined ||
            !currentLocation
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Vehicle type, capacity, cost per km and current location are required"
            });
        }


        const transport = await Transport.create({
            transporterId: req.user.userId,
            vehicleType,
            capacity,
            costPerKm,
            currentLocation
        });


        res.status(201).json({
            success: true,
            message: "Transport created successfully",
            transport
        });


    } catch (error) {

        console.error(
            "Create transport error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET AVAILABLE TRANSPORT
// ========================================

const getAvailableTransport = async (req, res) => {
    try {

        const transports = await Transport
            .find({ available: true })
            .populate(
                "transporterId",
                "name phone location"
            );


        res.status(200).json({
            success: true,
            count: transports.length,
            transports
        });


    } catch (error) {

        console.error(
            "Get available transport error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET MY TRANSPORT
// ========================================

const getMyTransport = async (req, res) => {
    try {

        const transports = await Transport.find({
            transporterId: req.user.userId
        });


        res.status(200).json({
            success: true,
            count: transports.length,
            transports
        });


    } catch (error) {

        console.error(
            "Get my transport error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// UPDATE TRANSPORT
// ========================================

const updateTransport = async (req, res) => {
    try {

        const transport =
            await Transport.findOneAndUpdate(
                {
                    _id: req.params.id,
                    transporterId: req.user.userId
                },
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );


        if (!transport) {
            return res.status(404).json({
                success: false,
                message: "Transport not found"
            });
        }


        res.status(200).json({
            success: true,
            message: "Transport updated successfully",
            transport
        });


    } catch (error) {

        console.error(
            "Update transport error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// EXPORT FUNCTIONS
// ========================================

module.exports = {
    createTransport,
    getAvailableTransport,
    getMyTransport,
    updateTransport
};