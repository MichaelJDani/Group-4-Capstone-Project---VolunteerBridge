import Volunteer from "../models/volunteer.js";

// Get all volunteers
export const getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.findAll();
        res.json(volunteers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update volunteer
export const updateVolunteer = async (req, res) => {
    const { id } = req.params;
    const { skills, availability, status } = req.body;

    try {
        const volunteer = await Volunteer.findByPk(id);
        if (!volunteer) return res.status(404).json({ message: "Not found" });

        volunteer.skills = skills || volunteer.skills;
        volunteer.availability = availability || volunteer.availability;
        volunteer.status = status || volunteer.status;

        await volunteer.save();

        res.json(volunteer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};