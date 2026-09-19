const Notification = require("../models/Notification");

// CREATE NOTIFICATION
const createNotification = async (req, res) => {
    try {
        const {
            userId,
            title,
            message,
            type,
            relatedId
        } = req.body;

        if (!userId || !title || !message) {
            return res.status(400).json({
                success: false,
                message: "User ID, title and message are required"
            });
        }

        const notification = await Notification.create({
            userId,
            title,
            message,
            type: type || "system",
            relatedId: relatedId || null
        });

        res.status(201).json({
            success: true,
            message: "Notification created successfully",
            notification
        });

    } catch (error) {
        console.error(
            "Create notification error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// GET MY NOTIFICATIONS
const getMyNotifications = async (req, res) => {
    try {
        const notifications = await Notification
            .find({
                userId: req.user.userId
            })
            .sort({
                createdAt: -1
            });

        res.status(200).json({
            success: true,
            count: notifications.length,
            notifications
        });

    } catch (error) {
        console.error(
            "Get notifications error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// MARK ONE NOTIFICATION AS READ
const markNotificationAsRead = async (req, res) => {
    try {
        const notification =
            await Notification.findOneAndUpdate(
                {
                    _id: req.params.id,
                    userId: req.user.userId
                },
                {
                    read: true
                },
                {
                    new: true
                }
            );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification marked as read",
            notification
        });

    } catch (error) {
        console.error(
            "Mark notification error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// MARK ALL NOTIFICATIONS AS READ
const markAllNotificationsAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            {
                userId: req.user.userId,
                read: false
            },
            {
                read: true
            }
        );

        res.status(200).json({
            success: true,
            message: "All notifications marked as read"
        });

    } catch (error) {
        console.error(
            "Mark all notifications error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    createNotification,
    getMyNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead
};