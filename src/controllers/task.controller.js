import { createNotification } from "../services/notification.js";

export const assignTask = async (req, res) => {

    const { userId, taskTitle } = req.body;

    try {

        // create notification
        await createNotification(
            userId,
            "New Task Assigned",
            `You have been assigned a task: ${taskTitle}`
        );

        res.json({
            success: true,
            message: "Task assigned and notification created"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};