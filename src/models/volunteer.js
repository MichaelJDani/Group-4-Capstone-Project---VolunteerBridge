const Volunteer = sequelize.define("Volunteer", {
    skills: DataTypes.STRING,
    availability: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
    },
});