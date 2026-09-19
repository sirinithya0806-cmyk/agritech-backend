const express = require("express");

const router = express.Router();

const {
    createNotification,
    getMyNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead
} = require("../controllers/notificationController");

const authMiddleware =
    require("../middleware/authMiddleware");


// Create notification
router.post(
    "/",
    authMiddleware,
    createNotification
);


// Get my notifications
router.get(
    "/",
    authMiddleware,
    getMyNotifications
);


// Mark all as read
router.patch(
    "/read-all",
    authMiddleware,
    markAllNotificationsAsRead
);


// Mark one as read
router.patch(
    "/:id/read",
    authMiddleware,
    markNotificationAsRead
);


module.exports = router;