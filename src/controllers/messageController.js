const Message = require("../models/Message");


// ========================================
// SEND MESSAGE
// ========================================
const sendMessage = async (req, res) => {
    try {
        const {
            receiverId,
            message
        } = req.body;

        if (!receiverId || !message) {
            return res.status(400).json({
                success: false,
                message:
                    "Receiver and message are required"
            });
        }

        if (
            receiverId ===
            req.user.userId
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "You cannot send a message to yourself"
            });
        }

        const newMessage =
            await Message.create({
                senderId: req.user.userId,
                receiverId,
                message
            });

        const populatedMessage =
            await Message.findById(
                newMessage._id
            )
                .populate(
                    "senderId",
                    "name role"
                )
                .populate(
                    "receiverId",
                    "name role"
                );

        res.status(201).json({
            success: true,
            message:
                "Message sent successfully",
            data: populatedMessage
        });

    } catch (error) {
        console.error(
            "Send message error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// GET CONVERSATION
// ========================================
const getConversation = async (req, res) => {
    try {
        const otherUserId =
            req.params.userId;

        const messages =
            await Message.find({
                $or: [
                    {
                        senderId:
                            req.user.userId,
                        receiverId:
                            otherUserId
                    },
                    {
                        senderId:
                            otherUserId,
                        receiverId:
                            req.user.userId
                    }
                ]
            })
                .populate(
                    "senderId",
                    "name role"
                )
                .populate(
                    "receiverId",
                    "name role"
                )
                .sort({
                    createdAt: 1
                });

        res.status(200).json({
            success: true,
            count: messages.length,
            messages
        });

    } catch (error) {
        console.error(
            "Get conversation error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ========================================
// MARK MESSAGE AS READ
// ========================================
const markMessageAsRead = async (req, res) => {
    try {
        const message =
            await Message.findOneAndUpdate(
                {
                    _id: req.params.id,
                    receiverId:
                        req.user.userId
                },
                {
                    read: true
                },
                {
                    new: true
                }
            );

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        res.status(200).json({
            success: true,
            message:
                "Message marked as read",
            data: message
        });

    } catch (error) {
        console.error(
            "Mark message error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    sendMessage,
    getConversation,
    markMessageAsRead
};