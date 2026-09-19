const express = require("express");

const router = express.Router();

const {
    sendMessage,
    getConversation,
    markMessageAsRead
} = require("../controllers/messageController");

const authMiddleware =
    require("../middleware/authMiddleware");


// Send message
router.post(
    "/",
    authMiddleware,
    sendMessage
);


// Get conversation with another user
router.get(
    "/conversation/:userId",
    authMiddleware,
    getConversation
);


// Mark message as read
router.patch(
    "/:id/read",
    authMiddleware,
    markMessageAsRead
);


module.exports = router;