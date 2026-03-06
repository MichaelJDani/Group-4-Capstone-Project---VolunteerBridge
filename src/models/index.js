import sequelize from "../config/database.js";
import User from "./user.model.js";
import Volunteer from "./Volunteer.js";
import Donation from "./Donation.js";
import Project from "./Project.js";
import Event from "./Event.js";
import Task from "./Task.js";

// Associations

User.hasOne(Volunteer);
Volunteer.belongsTo(User);

User.hasMany(Donation);
Donation.belongsTo(User);

Project.hasMany(Task);
Task.belongsTo(Project);

Event.belongsTo(Project);

export {
    sequelize,
    User,
    Volunteer,
    Donation,
    Project,
    Event,
    Task,
};