import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Report extends Model { }

Report.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "project_id",
        },
        taskId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "task_id",
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "draft", // draft, submitted, approved
        },
    },
    {
        sequelize,
        modelName: "Report",
        tableName: "reports",
        timestamps: true, // adds createdAt and updatedAt
    }
);

export default Report;