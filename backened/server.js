// ---------------- IMPORTS ----------------

import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";

import { UserApp } from "./apis/Userapi.js";


// ---------------- CONFIG ----------------

config();

const app = express();


// ---------------- DATABASE CONNECTION ----------------

async function connectDB() {

    // Skip only if already connected
    if (mongoose.connection.readyState === 1) {
        return;
    }

    try {

        console.log("Connecting to MongoDB...");
        console.log("MONGO_URI =", process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI, {

            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 45000,
            bufferCommands: false,

        });

        console.log("Success: Connected to MongoDB Atlas");

    } catch (err) {

        console.error(
            "Critical: MongoDB connection failed:",
            err.message
        );

        throw err;
    }
}


// ---------------- MIDDLEWARE ----------------

// Ensure DB connection before every request
app.use(async (req, res, next) => {

    try {

        await connectDB();

        next();

    } catch (err) {

        console.error(
            "Path:",
            req.path,
            "Error:",
            err.message
        );

        res.status(503).json({
            message: "Database connection failed",
            error: err.message
        });
    }
});


// Parse JSON
app.use(express.json());


// ---------------- CORS ----------------

app.use(
    cors({
        origin:
            process.env.NODE_ENV === "production"
                ? (
                    process.env.FRONTEND_URL
                        ? [process.env.FRONTEND_URL]
                        : true
                )
                : true,

        credentials: true
    })
);


// ---------------- HEALTH CHECK ----------------

app.get("/", (req, res) => {

    const statusLabels = [
        "Disconnected",
        "Connected",
        "Connecting",
        "Disconnecting"
    ];

    res.json({
        message: "Backend is running",
        database:
            statusLabels[mongoose.connection.readyState] || "Unknown"
    });
});


// ---------------- ROUTES ----------------

app.use("/user-api", UserApp);


// ---------------- ERROR HANDLER ----------------

app.use((err, req, res, next) => {

    console.error(err);

    // Validation error
    if (err.name === "ValidationError") {

        return res.status(400).json({
            message: "Validation failed",
            errors: err.errors
        });
    }

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {

        return res.status(400).json({
            message: "Invalid ID format"
        });
    }

    // Duplicate key error
    if (err.code === 11000) {

        return res.status(409).json({
            message: "Duplicate field value"
        });
    }

    // Default server error
    res.status(500).json({
        message: err.message || "Internal Server Error"
    });
});


// ---------------- LOCAL DEVELOPMENT ----------------

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== "production") {

    app.listen(PORT, () => {

        console.log(`Server running on port ${PORT}`);
    });
}


// ---------------- EXPORT FOR VERCEL ----------------

export default app;