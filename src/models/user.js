import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM(
            "super_admin",
            "admin",
            "project_manager",
            "finance",
            "volunteer",
            "donor"
        ),
        defaultValue: "volunteer",
    },
});

export default User;