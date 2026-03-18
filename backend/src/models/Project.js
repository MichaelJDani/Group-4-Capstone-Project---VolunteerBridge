import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Project extends Model {
  static async findAllProjects() {
    return await Project.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  static async findProjectById(id) {
    return await Project.findByPk(id);
  }

  static async createProject(data) {
    return await Project.create(data);
  }

  static async updateProjectStatus(id, status) {
    const project = await Project.findByPk(id);

    if (!project) {
      return null;
    }

    project.status = status;
    await project.save();

    return project;
  }
}

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