import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/user.js";
import Volunteer from "../models/volunteer.js";
import { Op } from "sequelize";

/*
========================
REGISTER USER
========================
*/
const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });

    }
};

/*
========================
LOGIN USER
========================
*/

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user.id, user.role);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            message: "Login successful",
            token,
            user
        });

    } catch (error) {

        res.status(500).json({
            message: "Login failed",
            error: error.message
        });

    }
};

/*
========================
LOGOUT USER
========================
*/

const logout = async (req, res) => {
    try {

        res.status(200).json({
            message: "Logged out successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Logout failed",
            error: error.message
        });

    }
};


/*
========================
FORGOT PASSWORD
========================
*/

const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        const resetTokenHash = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetToken = resetTokenHash;
        user.resetTokenExpiry = Date.now() + 10 * 60 * 1000;

        await user.save();

        const resetUrl = `${req.protocol}://${req.get(
            "host"
        )}/api/auth/reset-password/${resetToken}`;

        res.status(200).json({
            message: "Password reset link generated",
            resetUrl
        });

    } catch (error) {

        res.status(500).json({
            message: "Forgot password failed",
            error: error.message
        });

    }
};


/*
========================
RESET PASSWORD
========================
*/


const resetPassword = async (req, res) => {

    try {
        const { token } = req.params;

        if (req.body.password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            where: {
                resetToken: hashedToken,
                resetTokenExpiry: { [Op.gt]: Date.now() }
            }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Set new password (Sequelize hook will hash it)
        user.password = req.body.password;

        // Clear reset token and expiry
        user.resetToken = null;
        user.resetTokenExpiry = null;

        await user.save();

        res.status(200).json({ message: "Password reset successful" });

    } catch (error) {
        res.status(500).json({
            message: "Reset password failed",
            error: error.message
        });
    }
};

export {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword
};
