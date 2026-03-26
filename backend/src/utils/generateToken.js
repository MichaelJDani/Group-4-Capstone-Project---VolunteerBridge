import jwt from "jsonwebtoken";

const generateToken = (userId, role) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    return jwt.sign(
        { userId: userId, role: role },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );
};

export default generateToken;