const express = require("express");

const router = express.Router();

const {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus
} = require("../controllers/orderController");

const authMiddleware =
    require("../middleware/authMiddleware");


// Create order
router.post(
    "/",
    authMiddleware,
    createOrder
);


// Get my orders
router.get(
    "/my",
    authMiddleware,
    getMyOrders
);


// Update order status
router.patch(
    "/:id/status",
    authMiddleware,
    updateOrderStatus
);


// Get one order
router.get(
    "/:id",
    authMiddleware,
    getOrderById
);


module.exports = router;