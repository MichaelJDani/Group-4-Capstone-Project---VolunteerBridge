import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configuration } from "./config/env.js";
import { corsOptions } from "./config/cors.js";
import { sequelize } from "./config/database.js";

const app = express();
const PORT = configuration.PORT;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.json({ status: "ok", date: new Date() });
});

(async () => {
    try {
        await sequelize.authenticate();

        await sequelize.sync({ alter: true });

        console.log("Connection has been established successfully.");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to start the application:", error);
        process.exit(1);
    }
})();
