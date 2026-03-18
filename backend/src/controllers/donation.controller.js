import Donation from "../models/Donation.js";
import Report from "../models/report.js";

// Get all donations
export const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.findAll({
            include: [{ model: Report, as: "report" }],
        });

        res.status(200).json(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch donations" });
    }
};

// Get donation by ID
export const getDonationById = async (req, res) => {
    const { id } = req.params;

    try {
        const donation = await Donation.findByPk(id, {
            include: [{ model: Report, as: "report" }],
        });

        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }

        res.status(200).json(donation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch donation" });
    }
};

// Create donation
export const createDonation = async (req, res) => {
    const { report_id, amount, status, paymentMethod } = req.body;

    try {
        if (!report_id || !amount || !paymentMethod) {
            return res.status(400).json({
                message: "report_id, amount and paymentMethod are required",
            });
        }

        // validate payment method
        if (!["card", "bank_transfer", "cash"].includes(paymentMethod)) {
            return res.status(400).json({
                message: "Invalid payment method",
            });
        }

        // special instructions depending on method
        let paymentInstruction = "";

        if (paymentMethod === "card") {
            paymentInstruction = "Please complete payment on the NGO terminal.";
        }

        if (paymentMethod === "bank_transfer") {
            paymentInstruction =
                "Transfer to NGO Account: Bank: XYZ Bank, Account No: 1234567890";
        }

        if (paymentMethod === "cash") {
            paymentInstruction = "Pay cash directly to the NGO office.";
        }

        const donation = await Donation.create({
            report_id,
            amount,
            status: status || "pending",
            paymentMethod,
        });

        res.status(201).json({
            message: "Donation created successfully",
            paymentInstruction,
            donation,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create donation",
        });
    }
};

// Update donation
export const updateDonation = async (req, res) => {
    const { id } = req.params;
    const { report_id, amount, paymentMethod, status } = req.body;

    try {
        const donation = await Donation.findByPk(id);

        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }

        donation.report_id = report_id ?? donation.report_id;
        donation.amount = amount ?? donation.amount;
        donation.paymentMethod = paymentMethod ?? donation.paymentMethod;
        donation.status = status ?? donation.status;

        await donation.save();

        res.status(200).json(donation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update donation" });
    }
};

// Delete donation
export const deleteDonation = async (req, res) => {
    const { id } = req.params;

    try {
        const donation = await Donation.findByPk(id);

        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }

        await donation.destroy();

        res.status(200).json({
            message: "Donation deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete donation",
        });
    }
};