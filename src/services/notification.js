import Notification from "../models/notification.model.js";

export const createNotification = async (userId, title, message) => {

    try {

        const notification = await Notification.create({
            userId,
            title,
            message
        });

        return notification;

    } catch (error) {

        throw new Error(error.message);

    }

};

export const getUserNotifications = async (userId) => {

    return await Notification.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]]
    });

};

export const markNotificationRead = async (notificationId) => {

    const notification = await Notification.findByPk(notificationId);

    if (!notification) {
        throw new Error("Notification not found");
    }

    notification.isRead = true;

    await notification.save();

    return notification;
};