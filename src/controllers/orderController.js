const Order = require("../models/Order");
const Harvest = require("../models/Harvest");


// ========================================
// CREATE ORDER
// ========================================
const createOrder = async (req, res) => {
    try {
        const {
            farmerId,
            harvestId,
            requirementId,
            poolId,
            quantity,
            unit,
            price,
            deliveryLocation,
            deliveryDate
        } = req.body;

        if (
            !farmerId ||
            !harvestId ||
            quantity === undefined ||
            price === undefined ||
            !deliveryLocation
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Farmer, harvest, quantity, price and delivery location are required"
            });
        }

        const harvest =
            await Harvest.findById(harvestId);

        if (!harvest) {
            return res.status(404).json({
                success: false,
                message: "Harvest not found"
            });
        }

        if (harvest.farmerId.toString() !== farmerId) {
            return res.status(400).json({
                success: false,
                message:
                    "Harvest does not belong to the specified farmer"
            });
        }

        if (harvest.status !== "available") {
            return res.status(400).json({
                success: false,
                message:
                    "This harvest is not available"
            });
        }

        if (quantity > harvest.quantity) {
            return res.status(400).json({
                success: false,
                message:
                    "Order quantity exceeds available harvest quantity"
            });
        }

        const order = await Order.create({
            buyerId: req.user.userId,
            farmerId,
            harvestId,
            requirementId,
            poolId,
            quantity,
            unit,
            price,
            deliveryLocation,
            deliveryDate
        });

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order
        });

    } catch (error) {
        console.error(
            "Create order error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET MY ORDERS
// ========================================
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [
                {
                    buyerId: req.user.userId
                },
                {
                    farmerId: req.user.userId
                }
            ]
        })
            .populate(
                "buyerId",
                "name email phone"
            )
            .populate(
                "farmerId",
                "name email phone"
            )
            .populate(
                "harvestId",
                "crop quantity unit quality"
            )
            .sort({
                createdAt: -1
            });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        console.error(
            "Get orders error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET ONE ORDER
// ========================================
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            $or: [
                {
                    buyerId: req.user.userId
                },
                {
                    farmerId: req.user.userId
                }
            ]
        })
            .populate(
                "buyerId",
                "name email phone"
            )
            .populate(
                "farmerId",
                "name email phone"
            )
            .populate("harvestId");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.error(
            "Get order error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// UPDATE ORDER STATUS
// ========================================
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "pending",
            "confirmed",
            "processing",
            "shipped",
            "delivered",
            "cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status"
            });
        }

        const order = await Order.findOne({
            _id: req.params.id,
            $or: [
                {
                    buyerId: req.user.userId
                },
                {
                    farmerId: req.user.userId
                }
            ]
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        order.status = status;

        await order.save();

        res.status(200).json({
            success: true,
            message:
                "Order status updated successfully",
            order
        });

    } catch (error) {
        console.error(
            "Update order status error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus
};