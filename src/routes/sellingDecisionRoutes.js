const express = require("express");

const router = express.Router();

const {
    getSellingDecision
} = require("../controllers/sellingDecisionController");

const authMiddleware =
    require("../middleware/authMiddleware");


// Get selling decision
router.post(
    "/",
    authMiddleware,
    getSellingDecision
);


module.exports = router;