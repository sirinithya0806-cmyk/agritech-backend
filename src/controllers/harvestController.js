const Harvest = require("../models/Harvest");


// ========================================
// CREATE HARVEST
// ========================================
const createHarvest = async (req, res) => {
    try {
        const {
            crop,
            quantity,
            unit,
            quality,
            harvestDate,
            shelfLife,
            location
        } = req.body;

        if (
            !crop ||
            quantity === undefined ||
            !quality ||
            !harvestDate ||
            shelfLife === undefined ||
            !location
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Crop, quantity, quality, harvest date, shelf life and location are required"
            });
        }

        const harvest = await Harvest.create({
            farmerId: req.user.userId,
            crop,
            quantity,
            unit,
            quality,
            harvestDate,
            shelfLife,
            location
        });

        res.status(201).json({
            success: true,
            message: "Harvest created successfully",
            harvest
        });

    } catch (error) {
        console.error("Create harvest error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET MY HARVESTS
// ========================================
const getMyHarvests = async (req, res) => {
    try {
        const harvests = await Harvest.find({
            farmerId: req.user.userId
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: harvests.length,
            harvests
        });

    } catch (error) {
        console.error("Get harvests error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET ONE HARVEST
// ========================================
const getHarvestById = async (req, res) => {
    try {
        const harvest = await Harvest.findOne({
            _id: req.params.id,
            farmerId: req.user.userId
        });

        if (!harvest) {
            return res.status(404).json({
                success: false,
                message: "Harvest not found"
            });
        }

        res.status(200).json({
            success: true,
            harvest
        });

    } catch (error) {
        console.error("Get harvest error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// UPDATE HARVEST
// ========================================
const updateHarvest = async (req, res) => {
    try {
        const harvest = await Harvest.findOne({
            _id: req.params.id,
            farmerId: req.user.userId
        });

        if (!harvest) {
            return res.status(404).json({
                success: false,
                message: "Harvest not found"
            });
        }

        const {
            crop,
            quantity,
            unit,
            quality,
            harvestDate,
            shelfLife,
            location,
            status
        } = req.body;

        if (crop !== undefined) harvest.crop = crop;
        if (quantity !== undefined) harvest.quantity = quantity;
        if (unit !== undefined) harvest.unit = unit;
        if (quality !== undefined) harvest.quality = quality;
        if (harvestDate !== undefined) harvest.harvestDate = harvestDate;
        if (shelfLife !== undefined) harvest.shelfLife = shelfLife;
        if (location !== undefined) harvest.location = location;
        if (status !== undefined) harvest.status = status;

        await harvest.save();

        res.status(200).json({
            success: true,
            message: "Harvest updated successfully",
            harvest
        });

    } catch (error) {
        console.error("Update harvest error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// DELETE HARVEST
// ========================================
const deleteHarvest = async (req, res) => {
    try {
        const harvest = await Harvest.findOne({
            _id: req.params.id,
            farmerId: req.user.userId
        });

        if (!harvest) {
            return res.status(404).json({
                success: false,
                message: "Harvest not found"
            });
        }

        await Harvest.deleteOne({
            _id: harvest._id
        });

        res.status(200).json({
            success: true,
            message: "Harvest deleted successfully"
        });

    } catch (error) {
        console.error("Delete harvest error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    createHarvest,
    getMyHarvests,
    getHarvestById,
    updateHarvest,
    deleteHarvest
};