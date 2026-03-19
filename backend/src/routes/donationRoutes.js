import express from "express";
import {
    getAllDonations,
    getDonationById,
    createDonation,
    updateDonation,
    deleteDonation,
} from "../controllers/donation.controller.js";

const router = express.Router();

// Donation endpoints
router.get("/", getAllDonations);           // GET /api/donations
router.get("/:id", getDonationById);       // GET /api/donations/:id
router.post("/", createDonation);          // POST /api/donations
router.put("/:id", updateDonation);        // PUT /api/donations/:id
router.delete("/:id", deleteDonation);     // DELETE /api/donations/:id

export default router;