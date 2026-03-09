import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Task extends Model { }

Task.init(
    {
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "project_id",
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        dueDate: {
            type: DataTypes.DATE,
            field: "due_date",
        },
        estimatedHours: {
            type: DataTypes.INTEGER,
            field: "estimated_hours",
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "pending",
        },
        createdBy: {
            type: DataTypes.INTEGER,
            field: "created_by",
        },
        assignedTo: {
            type: DataTypes.INTEGER,
            field: "assigned_to",
        },
    },
    {
        sequelize,
        modelName: "Task",
        tableName: "tasks",
        timestamps: true, // automatically adds createdAt and updatedAt
    }
);

export default Task;