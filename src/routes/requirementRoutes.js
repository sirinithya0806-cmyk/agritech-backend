const express = require("express");

const router = express.Router();

const {
    createRequirement,
    getMyRequirements,
    getOpenRequirements,
    updateRequirement,
    deleteRequirement
} = require("../controllers/requirementController");

const authMiddleware =
    require("../middleware/authMiddleware");


// Create buyer requirement
router.post(
    "/",
    authMiddleware,
    createRequirement
);


// Get my requirements
router.get(
    "/my",
    authMiddleware,
    getMyRequirements
);


// Get all open requirements
router.get(
    "/open",
    authMiddleware,
    getOpenRequirements
);


// Update requirement
router.put(
    "/:id",
    authMiddleware,
    updateRequirement
);


// Delete requirement
router.delete(
    "/:id",
    authMiddleware,
    deleteRequirement
);


module.exports = router;