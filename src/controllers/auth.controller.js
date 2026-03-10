import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/user.js";
import Volunteer from "../models/volunteer.js";

/*
========================
REGISTER USER
========================
*/

const register = async (req, res) => {
    try {
        const { email, name, password, role, phone_number } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userRole = role || "volunteer";

        const newUser = await User.create({
            name,
            email,
            phone_number: phone_number || null,
            password: hashedPassword,
            role: userRole
        });

        if (userRole === "volunteer") {
            await Volunteer.create({
                user_id: newUser.id
            });
        }

        const token = generateToken(newUser.id, newUser.role);

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        return res.status(500).json({
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

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user.id, user.role);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
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

        user.reset_password_token = resetTokenHash;
        user.reset_password_expire = Date.now() + 10 * 60 * 1000;

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

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            where: {
                reset_password_token: hashedToken
            }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired token"
            });
        }

        if (user.reset_password_expire < Date.now()) {
            return res.status(400).json({
                message: "Reset token expired"
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            req.body.password,
            salt
        );

        user.password_hash = hashedPassword;
        user.reset_password_token = null;
        user.reset_password_expire = null;

        await user.save();

        res.status(200).json({
            message: "Password reset successful"
        });

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