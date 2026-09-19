const FarmPool = require("../models/FarmPool");
const Harvest = require("../models/Harvest");


// ========================================
// CREATE FARM POOL
// ========================================
const createFarmPool = async (req, res) => {
    try {
        const {
            vehicleCapacity,
            destination,
            deliveryDate,
            deliveryTime,
            estimatedCost,
            individualTransportCost,
            sharedTransportCost,
            carbonReductionKg,
            compatibilityScore
        } = req.body;

        if (
            vehicleCapacity === undefined ||
            !destination ||
            !deliveryDate ||
            !deliveryTime
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Vehicle capacity, destination, delivery date and delivery time are required"
            });
        }

        const individualCost =
            Number(individualTransportCost || 0);

        const sharedCost =
            Number(sharedTransportCost || 0);

        const transportSaving =
            individualCost - sharedCost;

        const pool =
            await FarmPool.create({
                createdBy: req.user.userId,

                vehicleCapacity,

                destination,

                deliveryDate,

                deliveryTime,

                estimatedCost:
                    estimatedCost || 0,

                individualTransportCost:
                    individualCost,

                sharedTransportCost:
                    sharedCost,

                transportSaving,

                carbonReductionKg:
                    carbonReductionKg || 0,

                compatibilityScore:
                    compatibilityScore || 0
            });

        res.status(201).json({
            success: true,
            message:
                "Farm pool created successfully",
            pool
        });

    } catch (error) {
        console.error(
            "Create farm pool error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET FARM POOLS
// ========================================
const getFarmPools = async (req, res) => {
    try {
        const pools =
            await FarmPool.find({
                status: {
                    $in: [
                        "open",
                        "full",
                        "confirmed"
                    ]
                }
            })
                .populate(
                    "createdBy",
                    "name phone location"
                )
                .populate(
                    "members.farmerId",
                    "name phone location"
                );

        res.status(200).json({
            success: true,
            count: pools.length,
            pools
        });

    } catch (error) {
        console.error(
            "Get farm pools error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET ONE FARM POOL
// ========================================
const getFarmPoolById = async (req, res) => {
    try {
        const pool =
            await FarmPool.findById(
                req.params.id
            )
                .populate(
                    "createdBy",
                    "name phone location"
                )
                .populate(
                    "members.farmerId",
                    "name phone location"
                )
                .populate(
                    "members.harvestId"
                );

        if (!pool) {
            return res.status(404).json({
                success: false,
                message: "Farm pool not found"
            });
        }

        res.status(200).json({
            success: true,
            pool
        });

    } catch (error) {
        console.error(
            "Get farm pool error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// JOIN FARM POOL
// ========================================
const joinFarmPool = async (req, res) => {
    try {
        const {
            harvestId,
            quantity,
            location,
            individualCost
        } = req.body;

        if (
            !harvestId ||
            quantity === undefined ||
            !location
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Harvest, quantity and location are required"
            });
        }

        const pool =
            await FarmPool.findById(
                req.params.id
            );

        if (!pool) {
            return res.status(404).json({
                success: false,
                message: "Farm pool not found"
            });
        }

        if (pool.status !== "open") {
            return res.status(400).json({
                success: false,
                message:
                    "This farm pool is not open"
            });
        }

        const harvest =
            await Harvest.findById(
                harvestId
            );

        if (!harvest) {
            return res.status(404).json({
                success: false,
                message: "Harvest not found"
            });
        }

        if (
            harvest.farmerId.toString() !==
            req.user.userId
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You can only add your own harvest"
            });
        }

        if (harvest.status !== "available") {
            return res.status(400).json({
                success: false,
                message:
                    "Harvest is not available"
            });
        }

        if (quantity > harvest.quantity) {
            return res.status(400).json({
                success: false,
                message:
                    "Pool quantity exceeds harvest quantity"
            });
        }

        const alreadyJoined =
            pool.members.some(
                member =>
                    member.farmerId.toString() ===
                    req.user.userId
            );

        if (alreadyJoined) {
            return res.status(409).json({
                success: false,
                message:
                    "Farmer already joined this pool"
            });
        }

        if (
            pool.totalQuantity + quantity >
            pool.vehicleCapacity
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Vehicle capacity exceeded"
            });
        }

        pool.members.push({
            farmerId: req.user.userId,
            harvestId,
            quantity,
            individualCost:
                individualCost || 0
        });

        pool.totalQuantity += Number(quantity);

        if (
            pool.totalQuantity >=
            pool.vehicleCapacity
        ) {
            pool.status = "full";
        }

        await pool.save();

        res.status(200).json({
            success: true,
            message:
                "Successfully joined farm pool",
            pool
        });

    } catch (error) {
        console.error(
            "Join farm pool error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// LEAVE FARM POOL
// ========================================
const leaveFarmPool = async (req, res) => {
    try {
        const pool =
            await FarmPool.findById(
                req.params.id
            );

        if (!pool) {
            return res.status(404).json({
                success: false,
                message: "Farm pool not found"
            });
        }

        const member =
            pool.members.find(
                item =>
                    item.farmerId.toString() ===
                    req.user.userId
            );

        if (!member) {
            return res.status(404).json({
                success: false,
                message:
                    "You are not a member of this pool"
            });
        }

        pool.members =
            pool.members.filter(
                item =>
                    item.farmerId.toString() !==
                    req.user.userId
            );

        pool.totalQuantity =
            pool.members.reduce(
                (total, item) =>
                    total + item.quantity,
                0
            );

        if (
            pool.status === "full"
        ) {
            pool.status = "open";
        }

        await pool.save();

        res.status(200).json({
            success: true,
            message:
                "Successfully left farm pool",
            pool
        });

    } catch (error) {
        console.error(
            "Leave farm pool error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// UPDATE FARM POOL STATUS
// ========================================
const updateFarmPoolStatus = async (req, res) => {
    try {
        const {
            status
        } = req.body;

        const allowedStatuses = [
            "open",
            "full",
            "confirmed",
            "in_transit",
            "completed",
            "cancelled"
        ];

        if (
            !allowedStatuses.includes(status)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid pool status"
            });
        }

        const pool =
            await FarmPool.findByIdAndUpdate(
                req.params.id,
                { status },
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!pool) {
            return res.status(404).json({
                success: false,
                message:
                    "Farm pool not found"
            });
        }

        res.status(200).json({
            success: true,
            message:
                "Farm pool status updated",
            pool
        });

    } catch (error) {
        console.error(
            "Update farm pool status error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    createFarmPool,
    getFarmPools,
    getFarmPoolById,
    joinFarmPool,
    leaveFarmPool,
    updateFarmPoolStatus
};