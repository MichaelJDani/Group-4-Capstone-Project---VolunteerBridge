import Notification from "../models/notification.model.js";

/*
Create notification
*/
export const createNotification = async (userId, title, message) => {

    try {

        const notification = await Notification.create({
            user_id: userId,
            title,
            message
        });

        return notification;

    } catch (error) {

        throw new Error(error.message);

    }

};


/*Get notifications for a user*/


export const getUserNotifications = async (userId) => {

    return await Notification.findAll({
        where: { user_id: userId },
        order: [["createdAt", "DESC"]]
    });

};


/*Mark notification as read*/


export const markNotificationRead = async (notificationId) => {

    const notification = await Notification.findByPk(notificationId);

    if (!notification) {
        throw new Error("Notification not found");
    }

    notification.is_read = true;

    await notification.save();

    return notification;
};