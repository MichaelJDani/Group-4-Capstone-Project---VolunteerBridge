import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Report from "./report.js";

const Donation = sequelize.define("Donation", {
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    paymentMethod: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM("pending", "completed", "failed"),
        defaultValue: "pending",
    },
});

//Report

Report.hasMany(Donation, { foreignKey: "report_id", as: "donations" });
Donation.belongsTo(Report, { foreignKey: "report_id", as: "report" });

export default Donation;