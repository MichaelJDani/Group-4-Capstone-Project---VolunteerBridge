import express from "express";
import { getAllVolunteers, updateVolunteer } from "../controllers/volunteer.controller.js";
import authMiddleware from "../middleware/auth.js";
import roleMiddleware from "../middleware/role.js";

const router = express.Router();

// Only admins or coordinators can view all volunteers
router.get("/", authMiddleware, roleMiddleware("admin", "coordinator"), getAllVolunteers);

// Volunteers can update themselves or admins can update anyone
router.put("/:id", authMiddleware, updateVolunteer);

export default router;