const express = require("express");

const router = express.Router();

const {
    createHarvest,
    getMyHarvests,
    getHarvestById,
    updateHarvest,
    deleteHarvest
} = require("../controllers/harvestController");

const authMiddleware =
    require("../middleware/authMiddleware");


// Create harvest
router.post(
    "/",
    authMiddleware,
    createHarvest
);


// Get my harvests
router.get(
    "/my",
    authMiddleware,
    getMyHarvests
);


// Get one harvest
router.get(
    "/:id",
    authMiddleware,
    getHarvestById
);


// Update harvest
router.put(
    "/:id",
    authMiddleware,
    updateHarvest
);


// Delete harvest
router.delete(
    "/:id",
    authMiddleware,
    deleteHarvest
);


module.exports = router;