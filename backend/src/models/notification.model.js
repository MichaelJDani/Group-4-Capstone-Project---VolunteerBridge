import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js"; // Make sure it's the Sequelize instance

class Notification extends Model { }

Notification.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {                                     // Use camelCase in JS, map to snake_case in DB
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: "is_read",
        },
    },
    {
        sequelize,
        modelName: "Notification",
        tableName: "notifications",
        timestamps: true,                       // adds createdAt and updatedAt automatically
    }
);

export default Notification;