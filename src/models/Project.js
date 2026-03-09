import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Project extends Model { }

Project.init(
    {
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT },
        startDate: { type: DataTypes.DATE, field: "start_date" },
        endDate: { type: DataTypes.DATE, field: "end_date" },
        status: { type: DataTypes.STRING, defaultValue: "pending" },
        createdBy: { type: DataTypes.INTEGER, field: "created_by" },
    },
    {
        sequelize,
        modelName: "Project",
        tableName: "projects",
        timestamps: true,
    }
);

export default Project;