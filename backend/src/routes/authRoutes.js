import express from "express";

import {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword
} from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/auth.js";


const router = express.Router();

// Public routes

router.post("/register", register);
router.post("/login", login);


// Password reset

router.post("/forgot-password", forgotPassword);   // sends reset token (email or app)
router.post("/reset-password/:token", resetPassword);     // resets password using token

// Protected routes
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

export default router;