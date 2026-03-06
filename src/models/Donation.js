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