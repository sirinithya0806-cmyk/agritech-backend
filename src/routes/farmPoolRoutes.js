const express = require("express");

const router = express.Router();

const {
    createFarmPool,
    getFarmPools,
    getFarmPoolById,
    joinFarmPool,
    leaveFarmPool,
    updateFarmPoolStatus
} = require("../controllers/farmPoolController");

const authMiddleware =
    require("../middleware/authMiddleware");


// Create farm pool
router.post(
    "/",
    authMiddleware,
    createFarmPool
);


// Get available farm pools
router.get(
    "/",
    authMiddleware,
    getFarmPools
);


// Join a farm pool
router.post(
    "/:id/join",
    authMiddleware,
    joinFarmPool
);


// Leave a farm pool
router.post(
    "/:id/leave",
    authMiddleware,
    leaveFarmPool
);


// Update farm pool status
router.patch(
    "/:id/status",
    authMiddleware,
    updateFarmPoolStatus
);


// Get one farm pool
router.get(
    "/:id",
    authMiddleware,
    getFarmPoolById
);


module.exports = router;