import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Task extends Model {

    static async createTask(data) {
        return await Task.create(data);
    }

    static async findTasksByProjectId(projectId) {
        return await Task.findAll({
            where: { projectId }
        });
    }

    static async findTaskById(id) {
        return await Task.findByPk(id);
    }

    static async assignTaskToVolunteer(id, userId) {
        const task = await Task.findByPk(id);
        if (!task) return null;

        task.assignedTo = userId;
        await task.save();

        return task;
    }

    static async updateTaskStatus(id, status) {
        const task = await Task.findByPk(id);
        if (!task) return null;

        task.status = status;
        await task.save();

        return task;
    }
}

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
        timestamps: true,
    }
);

export default Task;