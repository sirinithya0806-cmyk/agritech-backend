const BuyerRequirement =
    require("../models/BuyerRequirement");


// ========================================
// CREATE BUYER REQUIREMENT
// ========================================
const createRequirement = async (req, res) => {
    try {
        const {
            crop,
            quantity,
            unit,
            quality,
            maxPrice,
            deliveryLocation,
            requiredDate
        } = req.body;

        if (
            !crop ||
            quantity === undefined ||
            !quality ||
            maxPrice === undefined ||
            !deliveryLocation ||
            !requiredDate
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Crop, quantity, quality, max price, delivery location and required date are required"
            });
        }

        const requirement =
            await BuyerRequirement.create({
                buyerId: req.user.userId,
                crop,
                quantity,
                unit,
                quality,
                maxPrice,
                deliveryLocation,
                requiredDate
            });

        res.status(201).json({
            success: true,
            message:
                "Buyer requirement created successfully",
            requirement
        });

    } catch (error) {
        console.error(
            "Create requirement error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET MY REQUIREMENTS
// ========================================
const getMyRequirements = async (req, res) => {
    try {
        const requirements =
            await BuyerRequirement.find({
                buyerId: req.user.userId
            }).sort({
                createdAt: -1
            });

        res.status(200).json({
            success: true,
            count: requirements.length,
            requirements
        });

    } catch (error) {
        console.error(
            "Get requirements error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET OPEN REQUIREMENTS
// ========================================
const getOpenRequirements = async (req, res) => {
    try {
        const requirements =
            await BuyerRequirement.find({
                status: "open"
            }).sort({
                createdAt: -1
            });

        res.status(200).json({
            success: true,
            count: requirements.length,
            requirements
        });

    } catch (error) {
        console.error(
            "Get open requirements error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// UPDATE REQUIREMENT
// ========================================
const updateRequirement = async (req, res) => {
    try {
        const requirement =
            await BuyerRequirement.findOneAndUpdate(
                {
                    _id: req.params.id,
                    buyerId: req.user.userId
                },
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!requirement) {
            return res.status(404).json({
                success: false,
                message: "Requirement not found"
            });
        }

        res.status(200).json({
            success: true,
            message:
                "Requirement updated successfully",
            requirement
        });

    } catch (error) {
        console.error(
            "Update requirement error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// DELETE REQUIREMENT
// ========================================
const deleteRequirement = async (req, res) => {
    try {
        const requirement =
            await BuyerRequirement.findOneAndDelete({
                _id: req.params.id,
                buyerId: req.user.userId
            });

        if (!requirement) {
            return res.status(404).json({
                success: false,
                message: "Requirement not found"
            });
        }

        res.status(200).json({
            success: true,
            message:
                "Requirement deleted successfully"
        });

    } catch (error) {
        console.error(
            "Delete requirement error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    createRequirement,
    getMyRequirements,
    getOpenRequirements,
    updateRequirement,
    deleteRequirement
};