const Market = require("../models/Market");


// ========================================
// CREATE MARKET
// ========================================
const createMarket = async (req, res) => {
    try {
        const {
            name,
            location,
            crop,
            price,
            demand,
            capacity
        } = req.body;

        if (
            !name ||
            !location ||
            !crop ||
            price === undefined
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Name, location, crop and price are required"
            });
        }

        const market = await Market.create({
            name,
            location,
            crop,
            price,
            demand: demand || 0,
            capacity: capacity || 0
        });

        res.status(201).json({
            success: true,
            message: "Market created successfully",
            market
        });

    } catch (error) {
        console.error("Create market error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET ALL MARKETS
// ========================================
const getMarkets = async (req, res) => {
    try {
        const markets = await Market.find()
            .sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            count: markets.length,
            markets
        });

    } catch (error) {
        console.error("Get markets error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET MARKET BY ID
// ========================================
const getMarketById = async (req, res) => {
    try {
        const market =
            await Market.findById(req.params.id);

        if (!market) {
            return res.status(404).json({
                success: false,
                message: "Market not found"
            });
        }

        res.status(200).json({
            success: true,
            market
        });

    } catch (error) {
        console.error("Get market error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// UPDATE MARKET
// ========================================
const updateMarket = async (req, res) => {
    try {
        const market =
            await Market.findByIdAndUpdate(
                req.params.id,
                {
                    ...req.body,
                    updatedAt: new Date()
                },
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!market) {
            return res.status(404).json({
                success: false,
                message: "Market not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Market updated successfully",
            market
        });

    } catch (error) {
        console.error("Update market error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// DELETE MARKET
// ========================================
const deleteMarket = async (req, res) => {
    try {
        const market =
            await Market.findByIdAndDelete(
                req.params.id
            );

        if (!market) {
            return res.status(404).json({
                success: false,
                message: "Market not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Market deleted successfully"
        });

    } catch (error) {
        console.error("Delete market error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    createMarket,
    getMarkets,
    getMarketById,
    updateMarket,
    deleteMarket
};